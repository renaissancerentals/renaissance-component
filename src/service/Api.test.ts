import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import Api, {
    clearApiCache,
    DEFAULT_IMAGE_URL,
    GET_TIMEOUT_MS,
    get,
    getBaseUrl,
    REACT_APP_DATA_BASE_URLS,
    resetApiState,
    setApiCacheTtl
} from './Api';

const [HOST_A, HOST_B] = REACT_APP_DATA_BASE_URLS;

type Behaviour = 'ok' | 'network' | 'timeout' | number;

/** A fake network: what each host answers, and a log of every request that reached it. */
const network = (behaviour: Record<string, Behaviour>) => {
    const calls: { host: string; method: string; url: string; timeout?: number }[] = [];
    Api.defaults.adapter = async (config: InternalAxiosRequestConfig): Promise<AxiosResponse> => {
        const host = (config.baseURL ?? '').replace(/api\/$/, '');
        calls.push({host, method: (config.method ?? '').toLowerCase(), url: config.url ?? '', timeout: config.timeout});
        const what = behaviour[host] ?? 'ok';
        if (what === 'ok') {
            return {data: {host, list: [3, 1, 2]}, status: 200, statusText: 'OK', headers: {}, config};
        }
        if (what === 'network') {
            throw new AxiosError('Network Error', 'ERR_NETWORK', config);
        }
        if (what === 'timeout') {
            throw new AxiosError('timeout', 'ECONNABORTED', config);
        }
        const response = {data: {}, status: what, statusText: 'x', headers: {}, config} as AxiosResponse;
        throw new AxiosError('failed', 'ERR_BAD_RESPONSE', config, undefined, response);
    };
    return calls;
};

describe('Api', () => {
    beforeEach(() => {
        sessionStorage.clear();
        sessionStorage.setItem('renaissance.apiPrimary', '0');
        resetApiState();
    });

    afterEach(() => {
        vi.useRealTimers();
        sessionStorage.clear();
    });

    it('is configured with two data hosts', () => {
        expect(REACT_APP_DATA_BASE_URLS).toHaveLength(2);
    });

    describe('choosing a host', () => {
        it('sticks to one host for the whole tab instead of alternating', async () => {
            const calls = network({});

            await Api.get('one');
            await Api.get('two');
            await Api.get('three');

            expect(calls.map(c => c.host)).toEqual([HOST_A, HOST_A, HOST_A]);
        });

        it('getBaseUrl does not change anything, so calling it twice gives the same answer', () => {
            expect(getBaseUrl()).toBe(getBaseUrl());
            expect(getBaseUrl()).toBe(HOST_A);
        });

        it('remembers the chosen primary for the tab', () => {
            sessionStorage.setItem('renaissance.apiPrimary', '1');
            resetApiState();

            expect(getBaseUrl()).toBe(HOST_B);
        });

        it('picks a random primary when the tab has none and stores it', () => {
            sessionStorage.clear();
            vi.spyOn(Math, 'random').mockReturnValue(0.99);

            resetApiState();

            expect(getBaseUrl()).toBe(HOST_B);
            expect(sessionStorage.getItem('renaissance.apiPrimary')).toBe('1');
            vi.restoreAllMocks();
        });

        it('exposes a default image url on the current host', () => {
            expect(DEFAULT_IMAGE_URL).toMatch(/img\/default\.png$/);
            expect(REACT_APP_DATA_BASE_URLS.some(h => DEFAULT_IMAGE_URL === h + 'img/default.png')).toBe(true);
        });
    });

    describe('failing over for GET requests', () => {
        it.each<[string, Behaviour]>([
            ['a network error', 'network'],
            ['a timeout', 'timeout'],
            ['a server error', 500],
            ['a bad gateway', 502],
            ['rate limiting', 429]
        ])('retries once on the other host after %s', async (_label, failure) => {
            const calls = network({[HOST_A]: failure});

            const response = await Api.get('properties?projection=filter');

            expect(response.data).toMatchObject({host: HOST_B});
            expect(calls.map(c => c.host)).toEqual([HOST_A, HOST_B]);
        });

        it('does not retry when the request itself was wrong (4xx)', async () => {
            const calls = network({[HOST_A]: 404});

            await expect(Api.get('floorplans/nope')).rejects.toMatchObject({response: {status: 404}});

            expect(calls).toHaveLength(1);
        });

        it('gives up after trying every host once', async () => {
            const calls = network({[HOST_A]: 'network', [HOST_B]: 500});

            await expect(Api.get('anything')).rejects.toBeDefined();

            expect(calls.map(c => c.host)).toEqual([HOST_A, HOST_B]);
        });

        it('works through the exported get helper too', async () => {
            network({[HOST_A]: 'network'});

            expect((await get('faqs/resident')).data).toMatchObject({host: HOST_B});
        });
    });

    describe('never replaying writes on another host', () => {
        it.each(['post', 'put', 'patch', 'delete'] as const)('does not retry a failed %s', async method => {
            const calls = network({[HOST_A]: 'network'});

            await expect(Api[method]('contact', method === 'delete' ? undefined : {a: 1})).rejects.toBeDefined();

            expect(calls).toHaveLength(1);
            expect(calls[0].host).toBe(HOST_A);
        });

        it('still sends writes to a healthy host', async () => {
            network({[HOST_A]: 'network'});
            await Api.get('warm-up-fails-over').catch(() => undefined);
            await Api.get('second-failure').catch(() => undefined); // host A is now skipped

            const calls = network({});
            await Api.post('contact', {a: 1});

            expect(calls[0].host).toBe(HOST_B);
        });
    });

    describe('circuit breaker', () => {
        it('skips a host after two failures in a row', async () => {
            network({[HOST_A]: 'network'});
            await Api.get('one');
            await Api.get('two');

            const calls = network({[HOST_A]: 'network'});
            await Api.get('three');

            expect(calls.map(c => c.host)).toEqual([HOST_B]);
            expect(getBaseUrl()).toBe(HOST_B);
        });

        it('does not open after a single failure', async () => {
            network({[HOST_A]: 'network'});
            await Api.get('one');

            expect(getBaseUrl()).toBe(HOST_A);
        });

        it('a success in between resets the count', async () => {
            network({[HOST_A]: 'network'});
            await Api.get('fails');
            network({});
            await Api.get('works');
            network({[HOST_A]: 'network'});
            await Api.get('fails-again');

            expect(getBaseUrl()).toBe(HOST_A);
        });

        it('tries the host again after the one minute cooldown, and closes on success', async () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date('2026-10-03T12:00:00Z'));
            network({[HOST_A]: 'network'});
            await Api.get('one');
            await Api.get('two');
            expect(getBaseUrl()).toBe(HOST_B);

            vi.advanceTimersByTime(60_001);
            const calls = network({});
            await Api.get('after-cooldown');

            expect(calls.map(c => c.host)).toEqual([HOST_A]);
            expect(getBaseUrl()).toBe(HOST_A);
        });

        it('remembers an open breaker across page loads in the same tab', async () => {
            network({[HOST_A]: 'network'});
            await Api.get('one');
            await Api.get('two');

            resetApiState(); // what loading the next page of the tab does

            expect(getBaseUrl()).toBe(HOST_B);
        });

        it('still answers when every host is open, trying the primary first', async () => {
            network({[HOST_A]: 'network', [HOST_B]: 'network'});
            await Api.get('a').catch(() => undefined);
            await Api.get('b').catch(() => undefined);

            const calls = network({});
            const response = await Api.get('c');

            expect(response.status).toBe(200);
            expect(calls).toHaveLength(1);
        });

        it('keeps working when session storage is unavailable', async () => {
            const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
                throw new Error('denied');
            });
            network({[HOST_A]: 'network'});

            await expect(Api.get('one')).resolves.toBeDefined();
            await expect(Api.get('two')).resolves.toBeDefined();

            expect(getBaseUrl()).toBe(HOST_B);
            spy.mockRestore();
        });
    });

    describe('timeouts', () => {
        it('gives GET requests a timeout so a hung host cannot block the page', async () => {
            const calls = network({});

            await Api.get('one');

            expect(calls[0].timeout).toBe(GET_TIMEOUT_MS);
        });

        it('leaves writes without a timeout, so large photo uploads can finish', async () => {
            const calls = network({});

            await Api.post('sublets/k/assets', new FormData());

            expect(calls[0].timeout).toBeFalsy();
        });
    });

    describe('GET cache', () => {
        beforeEach(() => {
            setApiCacheTtl(30_000);
            clearApiCache();
        });

        afterEach(() => {
            setApiCacheTtl(30_000);
        });

        it('answers an identical GET from memory within the time to live', async () => {
            const calls = network({});

            const first = await Api.get('properties/high-grove?projection=details');
            const second = await Api.get('properties/high-grove?projection=details');

            expect(calls).toHaveLength(1);
            expect(second.data).toEqual(first.data);
        });

        it('lets concurrent identical requests share one request', async () => {
            const calls = network({});

            const all = await Promise.all(Array.from({length: 5}, () => Api.get('floorplans/dorset?projection=enriched')));

            expect(calls).toHaveLength(1);
            expect(all.every(r => r.status === 200)).toBe(true);
        });

        it('gives every caller its own copy, so one component sorting its list cannot change another\'s', async () => {
            network({});

            const first = await Api.get('properties?projection=filter');
            first.data.list.sort();
            first.data.list.push(99);
            const second = await Api.get('properties?projection=filter');

            expect(second.data.list).toEqual([3, 1, 2]);
        });

        it('asks again once the time to live has passed', async () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date('2026-10-03T12:00:00Z'));
            const calls = network({});
            await Api.get('units/u1?projection=unit-floorplan');

            vi.advanceTimersByTime(30_001);
            await Api.get('units/u1?projection=unit-floorplan');

            expect(calls).toHaveLength(2);
        });

        it('treats different urls and different params as different requests', async () => {
            const calls = network({});

            await Api.get('properties/a');
            await Api.get('properties/b');
            await Api.get('properties/a', {params: {x: 1}});
            await Api.get('properties/a', {params: {x: 2}});

            expect(calls).toHaveLength(4);
        });

        it('never keeps a failure: the next call asks again', async () => {
            network({[HOST_A]: 404});
            await expect(Api.get('floorplans/nope')).rejects.toBeDefined();

            const calls = network({});
            const response = await Api.get('floorplans/nope');

            expect(response.status).toBe(200);
            expect(calls).toHaveLength(1);
        });

        it('shares the failover: a request that failed over is cached once, not twice', async () => {
            const calls = network({[HOST_A]: 'network'});

            await Api.get('properties/failing-over');
            await Api.get('properties/failing-over');

            expect(calls.map(c => c.host)).toEqual([HOST_A, HOST_B]);
        });

        it('does not cache sublets, which change as people post and delete', async () => {
            const calls = network({});

            await Api.get('sublets');
            await Api.get('sublets');
            await Api.get('sublets/key-1');
            await Api.get('sublets/key-1');

            expect(calls).toHaveLength(4);
        });

        it('does not cache paths that only look like a cacheable prefix', async () => {
            const calls = network({});

            await Api.get('propertiesX');
            await Api.get('propertiesX');

            expect(calls).toHaveLength(2);
        });

        it('empties the cache when something is written', async () => {
            const calls = network({});
            await Api.get('properties/high-grove');
            await Api.post('contact', {a: 1});

            await Api.get('properties/high-grove');

            expect(calls.filter(c => c.method === 'get')).toHaveLength(2);
        });

        it('keeps the cache when a write fails', async () => {
            const calls = network({});
            await Api.get('properties/high-grove');
            network({[HOST_A]: 'network'});
            await Api.post('contact', {a: 1}).catch(() => undefined);

            const after = network({});
            await Api.get('properties/high-grove');

            expect(after).toHaveLength(0);
            expect(calls).toHaveLength(1);
        });

        it('skips the cache and refreshes it when asked with Cache-Control: no-cache', async () => {
            const calls = network({});
            await Api.get('properties/high-grove');

            await Api.get('properties/high-grove', {headers: {'Cache-Control': 'no-cache'}});
            await Api.get('properties/high-grove');

            expect(calls).toHaveLength(2);
        });

        it('can be switched off by setting the time to live to 0', async () => {
            setApiCacheTtl(0);
            const calls = network({});

            await Api.get('properties/high-grove');
            await Api.get('properties/high-grove');

            expect(calls).toHaveLength(2);
        });

        it('stays bounded: the oldest entry is dropped after 200 different requests', async () => {
            const calls = network({});
            await Api.get('properties/first');
            for (let i = 0; i < 200; i++) {
                await Api.get('properties/other-' + i);
            }

            await Api.get('properties/first');

            expect(calls.filter(c => c.url === 'properties/first')).toHaveLength(2);
        });
    });
});
