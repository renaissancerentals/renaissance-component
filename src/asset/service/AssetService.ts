import {extractIdFrom, isGoogleDriveImage} from "../../utils/Utils";
import {Asset} from "../data/Asset";
import Api from "../../service/Api";

export const propertyFragment = (propertyId?: string): string => propertyId ? propertyId + "/" : "";
/**
 * Images are served by Google's image CDN straight from Drive, so the bytes never pass through our servers and
 * Google resizes them. Google throttles bursts (HTTP 429), so this is deliberately cautious:
 *  - at most CDN_BUDGET images per CDN_WINDOW_MS use the CDN, the overflow goes straight to our own endpoint;
 *  - after CDN_ERRORS_TO_TRIP failures the CDN is switched off for CDN_COOLDOWN_MS (remembered for the tab);
 *  - a failed CDN image falls back to our own download endpoint (see installImageFallback);
 *  - the choice for an image is made once, so re-rendering never flips an image between sources.
 * Callers that pass no width get the original through our endpoint, as before.
 */
export {IMAGE_WIDTH} from "./ImageWidth";

const GOOGLE_IMAGE_CDN = "https://lh3.googleusercontent.com/d/";
const CDN_BUDGET = 20;
const CDN_WINDOW_MS = 10_000;
const CDN_ERRORS_TO_TRIP = 2;
const CDN_COOLDOWN_MS = 15 * 60_000;
const COOLDOWN_KEY = "renaissance.imageCdnOffUntil";

let imageCdnEnabled = true;
let issuedAt: number[] = [];
let errorsAt: number[] = [];
let offUntil = 0;
const chosen = new Map<string, string>();

const readCooldown = (): number => {
    try {
        return Number(window.sessionStorage.getItem(COOLDOWN_KEY)) || 0;
    } catch {
        return 0;
    }
};
const writeCooldown = (until: number): void => {
    try {
        window.sessionStorage.setItem(COOLDOWN_KEY, String(until));
    } catch {
        /* storage can be unavailable (private mode); the in-memory flag still applies */
    }
};

/** Starts a fresh state, picking up a cooldown that an earlier page of this tab recorded. */
export const resetImageCdn = (): void => {
    issuedAt = [];
    errorsAt = [];
    chosen.clear();
    offUntil = typeof window === "undefined" ? 0 : readCooldown();
};
resetImageCdn();

/** Switch the Google CDN off or on (off: every image comes through our own download endpoint). */
export const setImageCdnEnabled = (enabled: boolean): void => {
    imageCdnEnabled = enabled;
    chosen.clear();
};

export const googleImageUrl = (id: string, width: number): string =>
    GOOGLE_IMAGE_CDN + encodeURIComponent(id) + "=w" + width;

export const serverAssetUrl = (id: string, assetGatewayId?: string): string =>
    propertyIdToDomain(propertyFragment(assetGatewayId)) + "api/assets/" + id + "/download";

const cdnAvailable = (now: number): boolean => {
    if (!imageCdnEnabled || now < offUntil) {
        return false;
    }
    issuedAt = issuedAt.filter(t => now - t < CDN_WINDOW_MS);
    if (issuedAt.length >= CDN_BUDGET) {
        return false;
    }
    issuedAt.push(now);
    return true;
};

const imageUrlFor = (id: string, width?: number, assetGatewayId?: string): string => {
    if (!width || !id) {
        return serverAssetUrl(id, assetGatewayId);
    }
    const key = id + "|" + width;
    let url = chosen.get(key);
    if (!url) {
        url = cdnAvailable(Date.now()) ? googleImageUrl(id, width) : serverAssetUrl(id, assetGatewayId);
        chosen.set(key, url);
    }
    return url;
};

export const getAssetUrl = (imageUrl: string, assetGatewayId?: string, width?: number): string => {
    if (isGoogleDriveImage(imageUrl)) {
        return imageUrlFor(extractIdFrom(imageUrl), width, assetGatewayId);
    }
    return imageUrl;
};

export const assetUrlFrom = (id: string, assetGatewayId: string, width?: number): string =>
    imageUrlFor(id, width, assetGatewayId);

const idOf = (cdnUrl: string): string => decodeURIComponent(cdnUrl.substring(GOOGLE_IMAGE_CDN.length).split("=")[0]);

/** The CDN is refusing us: stop using it for a while and move images that are still waiting over to our server. */
const tripBreaker = (): void => {
    offUntil = Date.now() + CDN_COOLDOWN_MS;
    writeCooldown(offUntil);
    chosen.clear();
    document.querySelectorAll<HTMLImageElement>('img[src^="' + GOOGLE_IMAGE_CDN + '"]').forEach(img => {
        if (!img.complete) {
            img.src = serverAssetUrl(idOf(img.src));
        }
    });
};

/**
 * When an image from Google's CDN fails to load, load it from our own endpoint instead, and count the failure
 * towards the circuit breaker. One listener covers every <img> in the library, so no component needs its own
 * onError. A failure of the fallback itself is not retried.
 */
export const handleImageError = (event: Event): void => {
    const img = event.target;
    if (!(img instanceof HTMLImageElement) || !img.src.startsWith(GOOGLE_IMAGE_CDN)) {
        return;
    }
    const id = idOf(img.src);
    const now = Date.now();
    errorsAt = errorsAt.filter(t => now - t < CDN_WINDOW_MS);
    errorsAt.push(now);
    if (errorsAt.length >= CDN_ERRORS_TO_TRIP && now >= offUntil) {
        tripBreaker();
    }
    if (id) {
        img.src = serverAssetUrl(id);
    }
};

export const installImageFallback = (): void => {
    if (typeof document === "undefined") {
        return;
    }
    const marker = "__renaissanceImageFallback";
    const holder = window as unknown as Record<string, boolean>;
    if (!holder[marker]) {
        holder[marker] = true;
        document.addEventListener("error", handleImageError, true); // error events do not bubble, so capture
    }
};
installImageFallback();

// export const getAssetsFrom = async (folderId: string): Promise<Asset[]> => {
//     let response = await AssetApi.get("assets/" + folderId);
//     return await response.data._embedded ?
//         response.data._embedded.assets.filter((a: Asset) => a !== undefined)
//             .sort((a: Asset, b: Asset) => parseInt(a.name) - parseInt(b.name))
//         : [];
// }
export const getAssetsFrom = (folderId: string): Promise<Asset[]> => {
    return Api.get("folders/" + folderId + "/assets")
        .then(response => response.data.items ?
            response.data.items.sort((a: Asset, b: Asset) => parseInt(a.name) - parseInt(b.name)) : [])
        .catch(reason => {
            console.log(reason);
        });
}
export const assetDomains: string[] = process.env.REACT_APP_ASSET_BASE_URLS ? process.env.REACT_APP_ASSET_BASE_URLS.split(",") : [
    "https://www.veronaparkneighborhood.com/",
    "https://www.covenanterhill.com/",
    "https://www.highgrovebloomington.com/",
    "https://www.scholarsquad.com/",
    "https://www.summerhouseatindiana.com/",
]

export const propertyIdToDomain = (propertyId?: string): string => {

    const random = Math.ceil(Math.random() * 6) - 1;

    return random < 0 || random > assetDomains.length - 1 ? assetDomains[0] : assetDomains[random];
}
