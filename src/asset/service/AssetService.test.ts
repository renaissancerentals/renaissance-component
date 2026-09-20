import {afterEach, describe, expect, it, vi} from 'vitest';

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
    propertyFragment,
    propertyIdToDomain
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
