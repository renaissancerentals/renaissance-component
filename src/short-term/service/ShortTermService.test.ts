import {beforeEach, describe, expect, it, vi} from 'vitest';
import {
    getShortTermFloorplan,
    getShortTermFloorplansByPropertyId,
    shortTermFiltersFrom,
    sortAndFilter,
    sortFloorplans
} from './ShortTermService';
import Api from '../../service/Api';
import {FloorplanShortTerm, ShortTermStyle} from '../data/ShortTerm';
import {CurrentShortTermFilters} from '../data/ShortTermFilters';

vi.mock('../../service/Api', () => ({
    default: {
        get: vi.fn()
    }
}));

const floorplan = (overrides: Partial<FloorplanShortTerm>): FloorplanShortTerm => ({
    id: 'id',
    name: 'name',
    bedroom: 1,
    style: ShortTermStyle.APARTMENT,
    ...overrides
} as FloorplanShortTerm);

describe('getShortTermFloorplansByPropertyId', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('requests floorplans by property id with a details projection and returns the response data', async () => {
        const floorplans = [floorplan({id: '1'})];
        (Api.get as ReturnType<typeof vi.fn>).mockResolvedValue({data: floorplans});

        const result = await getShortTermFloorplansByPropertyId('verona-park');

        expect(Api.get).toHaveBeenCalledWith('shortTermFloorplans/byPropertyId/verona-park?projection=details');
        expect(result).toEqual(floorplans);
    });
});

describe('getShortTermFloorplan', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('requests a single floorplan by id with a details projection and returns the response data', async () => {
        const fp = floorplan({id: '17789'});
        (Api.get as ReturnType<typeof vi.fn>).mockResolvedValue({data: fp});

        const result = await getShortTermFloorplan('17789');

        expect(Api.get).toHaveBeenCalledWith('shortTermFloorplans/17789?projection=details');
        expect(result).toEqual(fp);
    });
});

describe('shortTermFiltersFrom', () => {
    it('collects unique bedroom counts and styles across floorplans', () => {
        const floorplans = [
            floorplan({bedroom: 1, style: ShortTermStyle.APARTMENT}),
            floorplan({bedroom: 2, style: ShortTermStyle.TOWN_HOME}),
            floorplan({bedroom: 1, style: ShortTermStyle.APARTMENT}),
        ];

        const filters = shortTermFiltersFrom(floorplans);

        expect(filters.bedroom).toEqual(new Set([1, 2]));
        expect(filters.style).toEqual(new Set([ShortTermStyle.APARTMENT, ShortTermStyle.TOWN_HOME]));
    });

    it('returns empty sets for an empty array', () => {
        const filters = shortTermFiltersFrom([]);

        expect(filters.bedroom).toEqual(new Set());
        expect(filters.style).toEqual(new Set());
    });
});

describe('sortFloorplans', () => {
    it('sorts by bedroom ascending', () => {
        const floorplans = [
            floorplan({id: 'a', bedroom: 3}),
            floorplan({id: 'b', bedroom: 1}),
            floorplan({id: 'c', bedroom: 2}),
        ];

        const result = sortFloorplans(floorplans, 'bedroomsAsc');

        expect(result.map(f => f.id)).toEqual(['b', 'c', 'a']);
    });

    it('sorts by bedroom descending', () => {
        const floorplans = [
            floorplan({id: 'a', bedroom: 3}),
            floorplan({id: 'b', bedroom: 1}),
            floorplan({id: 'c', bedroom: 2}),
        ];

        const result = sortFloorplans(floorplans, 'bedroomsDesc');

        expect(result.map(f => f.id)).toEqual(['a', 'c', 'b']);
    });

    it('returns an empty array unchanged', () => {
        expect(sortFloorplans([], 'bedroomsAsc')).toEqual([]);
    });
});

describe('sortAndFilter', () => {
    const floorplans = [
        floorplan({id: 'a', bedroom: 1, style: ShortTermStyle.APARTMENT}),
        floorplan({id: 'b', bedroom: 2, style: ShortTermStyle.TOWN_HOME}),
        floorplan({id: 'c', bedroom: 2, style: ShortTermStyle.APARTMENT}),
        floorplan({id: 'd', bedroom: 3, style: ShortTermStyle.SINGLE_FAMILY}),
    ];

    const filtersWith = (overrides: Partial<CurrentShortTermFilters>): CurrentShortTermFilters => ({
        bedroomFilters: [],
        styleFilters: [],
        sortBy: 'bedroomsAsc',
        floorplanIds: [],
        ...overrides
    });

    it('returns every floorplan, sorted, when all filters are empty', () => {
        const result = sortAndFilter(floorplans, filtersWith({}));

        expect(result.map(f => f.id)).toEqual(['a', 'b', 'c', 'd']);
    });

    it('filters by bedroom count', () => {
        const result = sortAndFilter(floorplans, filtersWith({bedroomFilters: [2]}));

        expect(result.map(f => f.id).sort()).toEqual(['b', 'c']);
    });

    it('filters by style', () => {
        const result = sortAndFilter(floorplans, filtersWith({styleFilters: [ShortTermStyle.SINGLE_FAMILY]}));

        expect(result.map(f => f.id)).toEqual(['d']);
    });

    it('filters by floorplan ids', () => {
        const result = sortAndFilter(floorplans, filtersWith({floorplanIds: ['a', 'd']}));

        expect(result.map(f => f.id).sort()).toEqual(['a', 'd']);
    });

    it('combines bedroom, style, and floorplan id filters', () => {
        const result = sortAndFilter(floorplans, filtersWith({
            bedroomFilters: [2],
            styleFilters: [ShortTermStyle.APARTMENT],
            floorplanIds: ['c', 'b']
        }));

        expect(result.map(f => f.id)).toEqual(['c']);
    });

    it('returns an empty array when no floorplan matches the combined filters', () => {
        const result = sortAndFilter(floorplans, filtersWith({
            bedroomFilters: [1],
            styleFilters: [ShortTermStyle.SINGLE_FAMILY]
        }));

        expect(result).toEqual([]);
    });

    it('returns an empty array when given an empty floorplan list', () => {
        expect(sortAndFilter([], filtersWith({}))).toEqual([]);
    });

    it('sorts the filtered results by the requested sort field and order', () => {
        const result = sortAndFilter(floorplans, filtersWith({bedroomFilters: [1, 2, 3], sortBy: 'bedroomsDesc'}));

        expect(result.map(f => f.bedroom)).toEqual([3, 2, 2, 1]);
    });
});
