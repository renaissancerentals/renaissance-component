import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

vi.mock('../../service/Api', () => ({
    default: {
        get: vi.fn()
    }
}));

import Api from '../../service/Api';
import {
    assetDomains,
    assetUrlFrom,
    getAssetsFrom,
    getAssetUrl,
    googleImageUrl,
    handleImageError,
    IMAGE_WIDTH,
    installImageFallback,
    propertyFragment,
    propertyIdToDomain,
    resetImageCdn,
    serverAssetUrl,
    setImageCdnEnabled
} from './AssetService';

describe('propertyFragment', () => {
    it('appends a trailing slash when a propertyId is given', () => {
        expect(propertyFragment('verona-park')).toBe('verona-park/');
    });

    it('returns an empty string when no propertyId is given', () => {
        expect(propertyFragment()).toBe('');
    });
});

describe('getAssetUrl', () => {
    it('returns the original url unchanged for a non-google-drive image', () => {
        expect(getAssetUrl('https://example.com/image.jpg')).toBe('https://example.com/image.jpg');
    });

    it('builds a download url from the domain and extracted id for a google drive image', () => {
        const url = getAssetUrl('https://drive.google.com/uc?id=abc123&export=view');

        expect(url).toMatch(/^https:\/\/www\.\S+\/api\/assets\/abc123\/download$/);
        expect(assetDomains.some(domain => url.startsWith(domain))).toBe(true);
    });
});

describe('assetUrlFrom', () => {
    // Note: propertyIdToDomain ignores the propertyId argument passed to it (picks a random
    // domain from assetDomains regardless of input), so the property fragment never actually
    // shows up in the resulting url despite being computed and passed in. Documenting current
    // behavior rather than silently changing it.
    it('builds a download url from a random asset domain, without the property fragment', () => {
        const url = assetUrlFrom('abc123', 'verona-park');

        expect(url).toMatch(/^https:\/\/www\.\S+\/api\/assets\/abc123\/download$/);
        expect(assetDomains.some(domain => url.startsWith(domain))).toBe(true);
    });
});

describe('propertyIdToDomain', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('returns a domain from assetDomains when random lands in range', () => {
        vi.spyOn(Math, 'random').mockReturnValue(0.5);

        expect(propertyIdToDomain()).toBe(assetDomains[2]);
    });

    it('falls back to the first domain when random resolves to -1', () => {
        vi.spyOn(Math, 'random').mockReturnValue(0);

        expect(propertyIdToDomain()).toBe(assetDomains[0]);
    });
});

describe('getAssetsFrom', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('fetches assets for a folder and sorts them numerically by name', async () => {
        (Api.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
            data: {
                items: [
                    {id: '1', name: '10'},
                    {id: '2', name: '2'}
                ]
            }
        });

        const assets = await getAssetsFrom('folder-1');

        expect(Api.get).toHaveBeenCalledWith('folders/folder-1/assets');
        expect(assets.map((a: any) => a.name)).toEqual(['2', '10']);
    });

    it('returns an empty array when the response has no items', async () => {
        (Api.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({data: {}});

        const assets = await getAssetsFrom('folder-1');

        expect(assets).toEqual([]);
    });

    it('logs and resolves undefined when the request fails', async () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {
        });
        (Api.get as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('network error'));

        const result = await getAssetsFrom('folder-1');

        expect(result).toBeUndefined();
        expect(consoleSpy).toHaveBeenCalled();
        consoleSpy.mockRestore();
    });
});

describe('images from the Google CDN', () => {
    afterEach(() => {
        setImageCdnEnabled(true);
    });

    it('offers the three widths the components use', () => {
        expect(IMAGE_WIDTH).toEqual({thumb: 400, card: 800, large: 1600});
    });

    it('builds a resized CDN url when a width is given', () => {
        expect(googleImageUrl('abc123', 800)).toBe('https://lh3.googleusercontent.com/d/abc123=w800');
        expect(assetUrlFrom('abc123', 'verona-park', IMAGE_WIDTH.card)).toBe('https://lh3.googleusercontent.com/d/abc123=w800');
        expect(getAssetUrl('https://drive.google.com/uc?id=abc123&export=view', undefined, IMAGE_WIDTH.large))
            .toBe('https://lh3.googleusercontent.com/d/abc123=w1600');
    });

    it('escapes the id so it cannot change the url', () => {
        expect(googleImageUrl('a/b?c=d', 400)).toBe('https://lh3.googleusercontent.com/d/a%2Fb%3Fc%3Dd=w400');
    });

    it('keeps using our own endpoint when no width is asked for', () => {
        expect(assetUrlFrom('abc123', 'verona-park')).toMatch(/\/api\/assets\/abc123\/download$/);
        expect(getAssetUrl('https://drive.google.com/uc?id=abc123')).toMatch(/\/api\/assets\/abc123\/download$/);
    });

    it('can be switched off, which sends every image through our own endpoint', () => {
        setImageCdnEnabled(false);

        expect(assetUrlFrom('abc123', 'verona-park', IMAGE_WIDTH.card)).toMatch(/\/api\/assets\/abc123\/download$/);
    });

    it('never touches images that are not on Google Drive', () => {
        expect(getAssetUrl('https://example.com/a.jpg', undefined, IMAGE_WIDTH.card)).toBe('https://example.com/a.jpg');
    });
});

describe('fallback when the Google CDN cannot serve an image', () => {
    const imageWith = (src: string) => {
        const img = document.createElement('img');
        document.body.appendChild(img);
        img.setAttribute('src', src);
        return img;
    };
    const fail = (img: HTMLImageElement) => img.dispatchEvent(new Event('error'));

    it('loads the image from our own endpoint instead', () => {
        installImageFallback();
        const img = imageWith(googleImageUrl('abc123', 800));

        fail(img);

        expect(img.getAttribute('src')).toMatch(/^https:\/\/www\.\S+\/api\/assets\/abc123\/download$/);
        expect(assetDomains.some(domain => img.src.startsWith(domain))).toBe(true);
    });

    it('does not retry when our own endpoint fails too', () => {
        installImageFallback();
        const img = imageWith(googleImageUrl('abc123', 800));
        fail(img);
        const fallbackSrc = img.getAttribute('src');

        fail(img);

        expect(img.getAttribute('src')).toBe(fallbackSrc);
    });

    it('works again when the same image element is given a new CDN url', () => {
        installImageFallback();
        const img = imageWith(googleImageUrl('first', 800));
        fail(img);
        img.setAttribute('src', googleImageUrl('second', 800));

        fail(img);

        expect(img.getAttribute('src')).toMatch(/\/api\/assets\/second\/download$/);
    });

    it('leaves other images alone', () => {
        installImageFallback();
        const img = imageWith('https://example.com/a.jpg');

        fail(img);

        expect(img.getAttribute('src')).toBe('https://example.com/a.jpg');
    });

    it('handles the id exactly as it was encoded', () => {
        const img = imageWith(googleImageUrl('a/b?c=d', 400));
        handleImageError({target: img} as unknown as Event);

        expect(img.getAttribute('src')).toMatch(/\/api\/assets\/a\/b\?c=d\/download$/);
        expect(serverAssetUrl('x')).toMatch(/\/api\/assets\/x\/download$/);
    });

    it('installs only one listener however often it is called', () => {
        const spy = vi.spyOn(document, 'addEventListener');
        installImageFallback();
        installImageFallback();

        expect(spy.mock.calls.filter(([type]) => type === 'error')).toHaveLength(0);
        spy.mockRestore();
    });
});

describe('being careful with Google, which answers bursts with HTTP 429', () => {
    const CDN = 'https://lh3.googleusercontent.com/d/';
    const onCdn = (url: string) => url.startsWith(CDN);
    const failImage = (id: string) => {
        const img = document.createElement('img');
        document.body.appendChild(img);
        img.setAttribute('src', googleImageUrl(id, 800));
        img.dispatchEvent(new Event('error'));
        return img;
    };

    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2026-10-03T12:00:00Z'));
        window.sessionStorage.clear();
        installImageFallback();
        resetImageCdn();
        setImageCdnEnabled(true);
    });

    afterEach(() => {
        vi.useRealTimers();
        window.sessionStorage.clear();
        resetImageCdn();
        document.body.innerHTML = '';
    });

    it('uses the CDN for the first 20 images and our own endpoint for the overflow', () => {
        const urls = Array.from({length: 30}, (_, i) => assetUrlFrom('img' + i, 'p', IMAGE_WIDTH.card));

        expect(urls.filter(onCdn)).toHaveLength(20);
        expect(urls.slice(20).every(u => /\/api\/assets\/img\d+\/download$/.test(u))).toBe(true);
    });

    it('allows another 20 once the 10 second window has passed', () => {
        Array.from({length: 20}, (_, i) => assetUrlFrom('a' + i, 'p', IMAGE_WIDTH.card));
        expect(onCdn(assetUrlFrom('late', 'p', IMAGE_WIDTH.card))).toBe(false);

        vi.advanceTimersByTime(10_001);

        expect(onCdn(assetUrlFrom('later', 'p', IMAGE_WIDTH.card))).toBe(true);
    });

    it('gives the same image the same url on every render, and does not spend budget again', () => {
        const first = assetUrlFrom('same', 'p', IMAGE_WIDTH.card);
        const again = Array.from({length: 50}, () => assetUrlFrom('same', 'p', IMAGE_WIDTH.card));

        expect(again.every(u => u === first)).toBe(true);
        expect(onCdn(assetUrlFrom('other', 'p', IMAGE_WIDTH.card))).toBe(true);
    });

    it('treats the same image at another width as a different image', () => {
        expect(assetUrlFrom('x', 'p', IMAGE_WIDTH.card)).toBe(googleImageUrl('x', 800));
        expect(assetUrlFrom('x', 'p', IMAGE_WIDTH.thumb)).toBe(googleImageUrl('x', 400));
    });

    it('stops using the CDN after two failures and moves waiting images to our endpoint', () => {
        const waiting = document.createElement('img');
        document.body.appendChild(waiting);
        waiting.setAttribute('src', googleImageUrl('waiting', 800));
        Object.defineProperty(waiting, 'complete', {value: false});

        failImage('one');
        expect(onCdn(assetUrlFrom('fresh1', 'p', IMAGE_WIDTH.card))).toBe(true);
        failImage('two');

        expect(onCdn(assetUrlFrom('fresh2', 'p', IMAGE_WIDTH.card))).toBe(false);
        expect(waiting.getAttribute('src')).toMatch(/\/api\/assets\/waiting\/download$/);
    });

    it('a single failure does not switch the CDN off', () => {
        failImage('one');

        expect(onCdn(assetUrlFrom('fresh', 'p', IMAGE_WIDTH.card))).toBe(true);
    });

    it('failures spread over more than 10 seconds do not add up', () => {
        failImage('one');
        vi.advanceTimersByTime(11_000);
        failImage('two');

        expect(onCdn(assetUrlFrom('fresh', 'p', IMAGE_WIDTH.card))).toBe(true);
    });

    it('tries the CDN again after the 15 minute cooldown', () => {
        failImage('one');
        failImage('two');
        expect(onCdn(assetUrlFrom('during', 'p', IMAGE_WIDTH.card))).toBe(false);

        vi.advanceTimersByTime(15 * 60_000 + 1);

        expect(onCdn(assetUrlFrom('after', 'p', IMAGE_WIDTH.card))).toBe(true);
    });

    it('remembers the cooldown for the rest of the tab, so the next page does not start by hitting Google', () => {
        failImage('one');
        failImage('two');

        resetImageCdn(); // what loading the next page of the tab does

        expect(onCdn(assetUrlFrom('next-page', 'p', IMAGE_WIDTH.card))).toBe(false);
    });

    it('still works when session storage is unavailable', () => {
        const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
            throw new Error('denied');
        });

        expect(() => {
            failImage('one');
            failImage('two');
        }).not.toThrow();
        expect(onCdn(assetUrlFrom('fresh', 'p', IMAGE_WIDTH.card))).toBe(false);
        spy.mockRestore();
    });
});
