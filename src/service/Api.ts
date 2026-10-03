import axios, {AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from 'axios';

/**
 * The sites read their data from one or more hosts that serve the same API (REACT_APP_DATA_BASE_URLS, comma
 * separated). The client is built to survive one of them being down:
 *  - a tab sticks to one host (a random one to start with, so load spreads across visitors), which keeps the
 *    connection warm; it does not alternate per request;
 *  - a GET that fails on the host (network error, timeout, 429 or 5xx) is retried once on the next host;
 *  - a host that fails twice in a row is skipped for a minute (circuit breaker), remembered for the tab;
 *  - POST/PUT/PATCH/DELETE are never replayed on another host: a failed contact or application request may have
 *    reached the server, and replaying it could send the message twice;
 *  - identical GETs for listing data are answered once: concurrent callers share one request and the answer is
 *    kept for a short time (see the cache below).
 */
export const REACT_APP_DATA_BASE_URLS: string[] = (process.env.REACT_APP_DATA_BASE_URLS
    ? process.env.REACT_APP_DATA_BASE_URLS.split(",")
    : [
        "https://www.scholarsrooftop.com/",
        "https://www.renaissancerentals.com/",
    ]).map(url => url.trim()).filter(url => url.length > 0);

export const GET_TIMEOUT_MS = 8000;
const FAILURES_TO_OPEN = 2;
const COOLDOWN_MS = 60_000;
const PRIMARY_KEY = "renaissance.apiPrimary";
const OPEN_KEY = "renaissance.apiOpenUntil";

// --- GET cache state (see the cache section below); declared first because resetApiState() uses it
const CACHEABLE = ["properties", "floorplans", "units", "shortTermFloorplans", "leasingOffices", "teamMembers",
    "faqs", "homePageSpecials", "jobVacancies", "folders", "videos"];
const MAX_CACHE_ENTRIES = 200;
let cacheTtlMs = 30_000;
const cache = new Map<string, { expiresAt: number; response: Promise<AxiosResponse> }>();

export const clearApiCache = (): void => cache.clear();

let failures: Record<string, number> = {};
let openUntil: Record<string, number> = {};
let primary = 0;

const readStorage = (key: string): string | null => {
    try {
        return sessionStorage.getItem(key);
    } catch {
        return null; // storage can be unavailable (private mode); the in-memory state still applies
    }
};
const writeStorage = (key: string, value: string): void => {
    try {
        sessionStorage.setItem(key, value);
    } catch {
        /* see readStorage */
    }
};

/** Starts from the state this tab remembers (or a random primary host). Mainly for tests and first load. */
export const resetApiState = (): void => {
    failures = {};
    clearApiCache();
    const remembered = readStorage(PRIMARY_KEY);
    primary = remembered !== null && Number(remembered) < REACT_APP_DATA_BASE_URLS.length
        ? Number(remembered)
        : Math.floor(Math.random() * REACT_APP_DATA_BASE_URLS.length);
    writeStorage(PRIMARY_KEY, String(primary));
    try {
        openUntil = JSON.parse(readStorage(OPEN_KEY) ?? "{}");
    } catch {
        openUntil = {};
    }
};
resetApiState();

const isOpen = (host: string, now: number): boolean => (openUntil[host] ?? 0) > now;

/** Hosts in the order to try them: the primary first, hosts with an open breaker last. */
const hostsInOrder = (now: number = Date.now()): string[] => {
    const all = REACT_APP_DATA_BASE_URLS.map((_, i) => REACT_APP_DATA_BASE_URLS[(primary + i) % REACT_APP_DATA_BASE_URLS.length]);
    return [...all.filter(h => !isOpen(h, now)), ...all.filter(h => isOpen(h, now))];
};

/** The host to use now. Reading it never changes anything, so calling it twice gives the same answer. */
export const getBaseUrl = (): string => hostsInOrder()[0];

const reportSuccess = (host: string): void => {
    failures[host] = 0;
    if (openUntil[host]) {
        delete openUntil[host];
        writeStorage(OPEN_KEY, JSON.stringify(openUntil));
    }
};

const reportFailure = (host: string): void => {
    failures[host] = (failures[host] ?? 0) + 1;
    if (failures[host] >= FAILURES_TO_OPEN) {
        failures[host] = 0;
        openUntil[host] = Date.now() + COOLDOWN_MS;
        writeStorage(OPEN_KEY, JSON.stringify(openUntil));
    }
};

/** The host is at fault (as opposed to the request being wrong): no answer, rate limited or a server error. */
const isHostFailure = (error: AxiosError): boolean =>
    !error.response || error.response.status === 429 || error.response.status >= 500;

type Tracked = InternalAxiosRequestConfig & { __host?: string; __tried?: string[] };

export const DEFAULT_IMAGE_URL = getBaseUrl() + "img/default.png";

const Api = axios.create();

Api.interceptors.request.use((config: Tracked) => {
    if (config.__host === undefined) {
        const host = getBaseUrl();
        config.__host = host;
        config.baseURL = host + "api/";
    }
    if (!config.timeout && (config.method ?? "get").toLowerCase() === "get") {
        config.timeout = GET_TIMEOUT_MS; // uploads and other writes keep axios' default of no timeout
    }
    return config;
});

Api.interceptors.response.use(
    (response: AxiosResponse) => {
        const host = (response.config as Tracked).__host;
        if (host) {
            reportSuccess(host);
        }
        if ((response.config.method ?? "get").toLowerCase() !== "get") {
            clearApiCache(); // a write may have changed what the cached listings say
        }
        return response;
    },
    async (error: AxiosError) => {
        const config = error.config as Tracked | undefined;
        if (!config || !config.__host || !isHostFailure(error)) {
            return Promise.reject(error);
        }
        reportFailure(config.__host);
        const tried = [...(config.__tried ?? []), config.__host];
        const next = hostsInOrder().find(host => !tried.includes(host));
        if ((config.method ?? "get").toLowerCase() !== "get" || next === undefined) {
            return Promise.reject(error);
        }
        return Api.request({...config, __host: next, __tried: tried, baseURL: next + "api/"} as Tracked);
    }
);

/**
 * Response cache for GETs. Several components ask for the same listing (a property, its floorplans, its FAQs) while
 * a page is built, and visitors move back and forth between pages; the answer rarely changes within seconds.
 *  - only paths that carry listing data are cached (see CACHEABLE); sublets, which change as people post, are not;
 *  - the key is the path, not the host, because all hosts serve the same data;
 *  - concurrent identical requests share one request, failures are never kept;
 *  - every caller gets its own copy of the data, because components sort and edit the arrays they receive;
 *  - any successful write empties the cache;
 *  - a request with "Cache-Control: no-cache" skips the cache and refreshes it.
 */
/** How long a GET answer is reused, in milliseconds. 0 switches the cache off. */
export const setApiCacheTtl = (ms: number): void => {
    cacheTtlMs = ms;
    cache.clear();
};

const isCacheable = (url: string): boolean => {
    const path = url.replace(/^\/+/, "");
    return CACHEABLE.some(prefix => path === prefix || path.startsWith(prefix + "/") || path.startsWith(prefix + "?"));
};

const copyOf = (response: AxiosResponse): AxiosResponse =>
    ({...response, data: response.data === undefined ? undefined : JSON.parse(JSON.stringify(response.data))});

const requestGet = Api.get.bind(Api) as typeof Api.get;

Api.get = (<T = unknown, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> => {
    const bypass = String(config?.headers?.["Cache-Control"] ?? "").includes("no-cache");
    if (cacheTtlMs <= 0 || !isCacheable(url) || config?.signal) {
        return requestGet<T, R>(url, config) as Promise<R>;
    }
    const key = url + "|" + JSON.stringify(config?.params ?? null);
    const now = Date.now();
    const hit = cache.get(key);
    if (hit && hit.expiresAt > now && !bypass) {
        return hit.response.then(copyOf) as Promise<R>;
    }
    if (cache.size >= MAX_CACHE_ENTRIES) {
        cache.delete(cache.keys().next().value as string); // the oldest entry
    }
    const entry = {expiresAt: now + cacheTtlMs, response: requestGet<T, AxiosResponse>(url, config) as Promise<AxiosResponse>};
    cache.set(key, entry);
    entry.response.catch(() => {
        if (cache.get(key) === entry) {
            cache.delete(key); // never keep a failure
        }
    });
    return entry.response.then(copyOf) as Promise<R>;
}) as typeof Api.get;

export default Api;

export const get = (url: string): Promise<AxiosResponse> => Api.get(url);
