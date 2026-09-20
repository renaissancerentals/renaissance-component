import {beforeEach, describe, expect, it, vi} from 'vitest';
import {
    generatePropertyVideoUrl,
    getAllPropertyFilterData,
    getProperty,
    getPropertyFaqs
} from './PropertyService';
import Api from '../../service/Api';

vi.mock('../../service/Api', () => ({
    default: {
        get: vi.fn()
    }
}));

describe('generatePropertyVideoUrl', () => {
    it('builds a googleapis download url from the id query param', () => {
        const url = generatePropertyVideoUrl('https://drive.google.com/uc?id=abc123&export=download');

        expect(url).toBe(
            'https://www.googleapis.com/drive/v3/files/abc123?alt=media&key=AIzaSyAdG4u5YD2CZvQTv_hRtaKrmSNWZkY30oU'
        );
    });

    it('returns null when the url has no id parameter', () => {
        expect(generatePropertyVideoUrl('https://example.com/video.mp4')).toBeNull();
    });
});

describe('API-backed functions', () => {
    beforeEach(() => {
        vi.mocked(Api.get).mockReset();
    });

    it('getProperty calls the details projection endpoint for the given propertyId', async () => {
        const data = {id: 'high-grove', name: 'HighGrove'};
        vi.mocked(Api.get).mockResolvedValueOnce({data} as any);

        const result = await getProperty('high-grove');

        expect(Api.get).toHaveBeenCalledWith('properties/high-grove?projection=details');
        expect(result).toEqual(data);
    });

    it('getPropertyFaqs calls the faqs endpoint for the given propertyId', async () => {
        const data = [{id: 'faq1', question: 'Q', answer: 'A', sortOrder: 1}];
        vi.mocked(Api.get).mockResolvedValueOnce({data} as any);

        const result = await getPropertyFaqs('high-grove');

        expect(Api.get).toHaveBeenCalledWith('properties/high-grove/faqs');
        expect(result).toEqual(data);
    });

    it('getAllPropertyFilterData calls the filter projection endpoint and excludes garage properties', async () => {
        const data = [
            {id: 'p1', name: 'HighGrove', floorplans: []},
            {id: 'p2', name: 'SH Garages', floorplans: []}
        ];
        vi.mocked(Api.get).mockResolvedValueOnce({data} as any);

        const result = await getAllPropertyFilterData();

        expect(Api.get).toHaveBeenCalledWith('properties?projection=filter');
        expect(result).toEqual([{id: 'p1', name: 'HighGrove', floorplans: []}]);
    });
});
