import {beforeEach, describe, expect, it, vi} from 'vitest';
import {getHomeHomePageSpecials} from './HomePageSpecialService';
import {HomePageSpecialData} from '../data/HomePageSpecial';
import Api from '../../service/Api';

vi.mock('../../service/Api', () => ({
    default: {
        get: vi.fn()
    }
}));

const specialData = (overrides: Partial<HomePageSpecialData> = {}): HomePageSpecialData => ({
    id: 'id',
    description: 'A great special',
    image: 'image.jpg',
    startDate: '2026-01-01',
    endDate: '2026-02-01',
    properties: 'renaissance-rentals,high-grove',
    links: [],
    ...overrides
});

describe('getHomeHomePageSpecials', () => {
    beforeEach(() => {
        vi.mocked(Api.get).mockReset();
    });

    it('calls the homePageSpecials endpoint', async () => {
        vi.mocked(Api.get).mockResolvedValueOnce({data: []} as any);

        await getHomeHomePageSpecials('renaissance-rentals');

        expect(Api.get).toHaveBeenCalledWith('homePageSpecials');
    });

    it('splits the comma-separated properties string into an array', async () => {
        vi.mocked(Api.get).mockResolvedValueOnce({data: [specialData()]} as any);

        const result = await getHomeHomePageSpecials('renaissance-rentals');

        expect(result[0].properties).toEqual(['renaissance-rentals', 'high-grove']);
    });

    it('filters results to only specials that include the given propertyId', async () => {
        const forThisProperty = specialData({id: 'a', properties: 'renaissance-rentals'});
        const forOtherProperty = specialData({id: 'b', properties: 'high-grove'});
        vi.mocked(Api.get).mockResolvedValueOnce({data: [forThisProperty, forOtherProperty]} as any);

        const result = await getHomeHomePageSpecials('renaissance-rentals');

        expect(result.map(s => s.id)).toEqual(['a']);
    });

    it('sorts results by startDate ascending', async () => {
        const later = specialData({id: 'later', properties: 'renaissance-rentals', startDate: '2026-03-01'});
        const earlier = specialData({id: 'earlier', properties: 'renaissance-rentals', startDate: '2026-01-01'});
        vi.mocked(Api.get).mockResolvedValueOnce({data: [later, earlier]} as any);

        const result = await getHomeHomePageSpecials('renaissance-rentals');

        expect(result.map(s => s.id)).toEqual(['earlier', 'later']);
    });

    it('returns an empty array when no specials match the propertyId', async () => {
        vi.mocked(Api.get).mockResolvedValueOnce({data: [specialData({properties: 'high-grove'})]} as any);

        const result = await getHomeHomePageSpecials('renaissance-rentals');

        expect(result).toEqual([]);
    });

    it('treats a null/undefined properties string as an empty properties array', async () => {
        const noProperties = specialData({properties: undefined as unknown as string});
        vi.mocked(Api.get).mockResolvedValueOnce({data: [noProperties]} as any);

        const result = await getHomeHomePageSpecials('renaissance-rentals');

        expect(result).toEqual([]);
    });
});
