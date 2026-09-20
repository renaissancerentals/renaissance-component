import {beforeEach, describe, expect, it, vi} from 'vitest';
import moment from 'moment';
import {
    AVAILABLE_NOW,
    addressFromFloorplan,
    addressFromFloorplanSpotlight,
    convertToFloorplanCardData,
    convertToHttps,
    defaultAvailabilityToMonthYear,
    filtersFrom,
    getAllActiveFloorplans,
    getFeaturedFloorplans,
    getFloorplan,
    getFloorplanFaqs,
    getFloorplanSpotlight,
    getFloorplanVariations,
    getFloorplansFilterData,
    getSimilarFloorplans,
    getTestimonials,
    getWebSpecials,
    isAvailableNow,
    isDateAfterToday,
    isDateWithinTwelveMonths,
    isFloorplanAvailable,
    momentToMonthYear,
    MONTH_YEAR_FORMAT,
    notPermittedPets,
    permittedPets,
    petPolicy,
    sortAndFilter,
    sortFloorplans
} from './FloorplanService';
import {FloorplanCardData, FloorplanStyle} from '../data/Floorplan';
import {CurrentFloorplanFilters} from '../data/FloorplanFilters';
import {Pet} from '../../unit/data/Unit';
import Api from '../../service/Api';

vi.mock('../../service/Api', () => ({
    default: {
        get: vi.fn()
    }
}));

const unit = (overrides = {}) => ({
    id: 'u1',
    rent: 1000,
    squareFoot: 800,
    moveInDate: '2020-01-01',
    availabilityExtensionMonths: null,
    ...overrides
});

const floorplan = (overrides = {}): FloorplanCardData => ({
    id: 'fp1',
    name: 'The Aspen',
    bedroom: 1,
    bathroom: 1,
    coverImage: 'image.jpg',
    featured: false,
    style: FloorplanStyle.APARTMENT,
    specialRent: null as unknown as number,
    specialRentStartDate: null as unknown as string,
    specialRentEndDate: null as unknown as string,
    address: '123 Main St',
    zipcode: '47401',
    virtualTourLink: '',
    videoTourLink: '',
    photosFolderId: '',
    units: [unit()],
    webSpecials: [],
    ...overrides
} as FloorplanCardData);

const defaultFilters = (overrides: Partial<CurrentFloorplanFilters> = {}): CurrentFloorplanFilters => ({
    bedroomFilters: [],
    availabilityFilters: [],
    styleFilters: [],
    minRent: 0,
    maxRent: 10000,
    sortBy: 'featured',
    floorplanIds: [],
    ...overrides
});

describe('convertToHttps', () => {
    it('converts an http url to https', () => {
        expect(convertToHttps('http://example.com')).toBe('https://example.com');
    });

    it('leaves an https url unchanged', () => {
        expect(convertToHttps('https://example.com')).toBe('https://example.com');
    });

    it('returns an empty string for null', () => {
        expect(convertToHttps(null as unknown as string)).toBe('');
    });
});

describe('convertToFloorplanCardData', () => {
    it('maps details fields and filters webSpecials to only currently active descriptions', () => {
        const today = moment();
        const activeWebSpecial = {
            id: 'ws1',
            description: 'Active special',
            startDate: today.clone().subtract(1, 'day').format('YYYY-MM-DD'),
            endDate: today.clone().add(1, 'day').format('YYYY-MM-DD')
        };
        const expiredWebSpecial = {
            id: 'ws2',
            description: 'Expired special',
            startDate: today.clone().subtract(10, 'day').format('YYYY-MM-DD'),
            endDate: today.clone().subtract(5, 'day').format('YYYY-MM-DD')
        };

        const details: any = {
            id: 'fp1',
            name: 'The Aspen',
            bedroom: 2,
            bathroom: 2,
            coverImage: 'cover.jpg',
            featured: true,
            style: FloorplanStyle.TOWN_HOME,
            specialRent: 1200,
            specialRentStartDate: '2020-01-01',
            specialRentEndDate: '2020-02-01',
            address: '123 Main St',
            zipcode: '47401',
            virtualTourLink: 'link',
            videoTourLink: 'vlink',
            photosFolderId: 'folder1',
            units: [unit()],
            webSpecials: [activeWebSpecial, expiredWebSpecial]
        };

        const result = convertToFloorplanCardData(details);

        expect(result.id).toBe('fp1');
        expect(result.name).toBe('The Aspen');
        expect(result.webSpecials).toEqual(['Active special']);
    });

    it('returns an empty webSpecials array when none are active', () => {
        const details: any = {
            ...floorplan(),
            webSpecials: [{
                id: 'ws1',
                description: 'Old',
                startDate: '2000-01-01',
                endDate: '2000-02-01'
            }]
        };

        const result = convertToFloorplanCardData(details);

        expect(result.webSpecials).toEqual([]);
    });
});

describe('isDateWithinTwelveMonths', () => {
    it('returns true for today', () => {
        expect(isDateWithinTwelveMonths(moment().format('YYYY-MM-DD'))).toBe(true);
    });

    it('returns true for a date exactly at the twelve month boundary', () => {
        expect(isDateWithinTwelveMonths(moment().add(12, 'months').format('YYYY-MM-DD'))).toBe(true);
    });

    it('returns false for a date beyond twelve months', () => {
        expect(isDateWithinTwelveMonths(moment().add(14, 'months').format('YYYY-MM-DD'))).toBe(false);
    });

    it('returns false for a date in the past', () => {
        expect(isDateWithinTwelveMonths(moment().subtract(1, 'months').format('YYYY-MM-DD'))).toBe(false);
    });
});

describe('isDateAfterToday', () => {
    it('returns true for a future date', () => {
        expect(isDateAfterToday(moment().add(1, 'day').format('YYYY-MM-DD'))).toBe(true);
    });

    it('returns false for a past date', () => {
        expect(isDateAfterToday(moment().subtract(1, 'day').format('YYYY-MM-DD'))).toBe(false);
    });
});

describe('isAvailableNow', () => {
    it('returns true for a date before tomorrow', () => {
        expect(isAvailableNow(moment())).toBe(true);
        expect(isAvailableNow(moment().subtract(1, 'day'))).toBe(true);
    });

    it('returns false for a date on or after tomorrow', () => {
        expect(isAvailableNow(moment().add(1, 'day'))).toBe(false);
        expect(isAvailableNow(moment().add(2, 'day'))).toBe(false);
    });
});

describe('defaultAvailabilityToMonthYear', () => {
    it('returns AVAILABLE_NOW unchanged', () => {
        expect(defaultAvailabilityToMonthYear(AVAILABLE_NOW)).toBe(AVAILABLE_NOW);
    });

    it('formats a MM-YYYY date string into month year format', () => {
        expect(defaultAvailabilityToMonthYear('03-2026')).toBe('March 2026');
    });
});

describe('momentToMonthYear', () => {
    it('formats a moment into the MONTH_YEAR_FORMAT', () => {
        const date = moment('2026-03-05');
        expect(momentToMonthYear(date)).toBe(date.format(MONTH_YEAR_FORMAT));
    });
});

describe('sortAndFilter', () => {
    it('returns an empty array when given an empty array', () => {
        expect(sortAndFilter([], defaultFilters())).toEqual([]);
    });

    it('applies no filters and sorts by featured by default', () => {
        const featuredFp = floorplan({id: 'fp-featured', featured: true, units: [unit({rent: 900})]});
        const plainFp = floorplan({id: 'fp-plain', featured: false, units: [unit({rent: 500})]});
        const floorplans = [plainFp, featuredFp];

        const result = sortAndFilter(floorplans, defaultFilters());

        expect(result.map(f => f.id)).toEqual(['fp-featured', 'fp-plain']);
    });

    it('combines multiple filters (bedroom + style + price range)', () => {
        const matches = floorplan({
            id: 'match',
            bedroom: 2,
            style: FloorplanStyle.APARTMENT,
            units: [unit({rent: 1200})]
        });
        const wrongBedroom = floorplan({
            id: 'wrong-bedroom',
            bedroom: 3,
            style: FloorplanStyle.APARTMENT,
            units: [unit({rent: 1200})]
        });
        const wrongStyle = floorplan({
            id: 'wrong-style',
            bedroom: 2,
            style: FloorplanStyle.STUDIO,
            units: [unit({rent: 1200})]
        });
        const wrongPrice = floorplan({
            id: 'wrong-price',
            bedroom: 2,
            style: FloorplanStyle.APARTMENT,
            units: [unit({rent: 5000})]
        });

        const filters = defaultFilters({
            bedroomFilters: [2],
            styleFilters: [FloorplanStyle.APARTMENT],
            minRent: 1000,
            maxRent: 1500
        });

        const result = sortAndFilter([matches, wrongBedroom, wrongStyle, wrongPrice], filters);

        expect(result.map(f => f.id)).toEqual(['match']);
    });

    it('filters by explicit floorplanIds', () => {
        const fp1 = floorplan({id: 'fp1'});
        const fp2 = floorplan({id: 'fp2'});

        const result = sortAndFilter([fp1, fp2], defaultFilters({floorplanIds: ['fp2']}));

        expect(result.map(f => f.id)).toEqual(['fp2']);
    });

    it('includes a floorplan whose special rent is within range even if its cheapest unit rent is not', () => {
        const fp = floorplan({
            id: 'special',
            specialRent: 900,
            units: [unit({rent: 5000})]
        });

        const result = sortAndFilter([fp], defaultFilters({minRent: 800, maxRent: 1000}));

        expect(result.map(f => f.id)).toEqual(['special']);
    });

    it('excludes a floorplan outside price range with no matching special rent', () => {
        const fp = floorplan({
            id: 'expensive',
            specialRent: null as unknown as number,
            units: [unit({rent: 5000})]
        });

        const result = sortAndFilter([fp], defaultFilters({minRent: 800, maxRent: 1000}));

        expect(result).toEqual([]);
    });

    it('matches floorplans available now when AVAILABLE_NOW is in the availability filters', () => {
        const availableFp = floorplan({id: 'available', units: [unit({moveInDate: moment().format('YYYY-MM-DD')})]});
        const unavailableFp = floorplan({
            id: 'unavailable',
            units: [unit({moveInDate: moment().add(6, 'months').format('YYYY-MM-DD')})]
        });

        const result = sortAndFilter([availableFp, unavailableFp], defaultFilters({availabilityFilters: [AVAILABLE_NOW]}));

        expect(result.map(f => f.id)).toEqual(['available']);
    });

    it('matches floorplans by a specific future month/year availability filter', () => {
        const futureDate = moment().add(3, 'months');
        const monthYear = futureDate.format(MONTH_YEAR_FORMAT);
        const matchingFp = floorplan({id: 'future-match', units: [unit({moveInDate: futureDate.format('YYYY-MM-DD')})]});
        const otherFp = floorplan({
            id: 'future-other',
            units: [unit({moveInDate: futureDate.clone().add(2, 'months').format('YYYY-MM-DD')})]
        });

        const result = sortAndFilter([matchingFp, otherFp], defaultFilters({availabilityFilters: [monthYear]}));

        expect(result.map(f => f.id)).toEqual(['future-match']);
    });

    it('returns an empty array when no floorplan matches the availability filter', () => {
        const fp = floorplan({units: [unit({moveInDate: moment().add(6, 'months').format('YYYY-MM-DD')})]});

        const result = sortAndFilter([fp], defaultFilters({availabilityFilters: ['January 2099']}));

        expect(result).toEqual([]);
    });
});

describe('sortFloorplans', () => {
    it('sorts by minRate ascending', () => {
        const low = floorplan({id: 'low', units: [unit({rent: 500})]});
        const mid = floorplan({id: 'mid', units: [unit({rent: 1000})]});
        const high = floorplan({id: 'high', units: [unit({rent: 1500})]});

        const result = sortFloorplans([high, low, mid], 'priceAsc');

        expect(result.map(f => f.id)).toEqual(['low', 'mid', 'high']);
    });

    it('sorts by minRate descending', () => {
        const low = floorplan({id: 'low', units: [unit({rent: 500})]});
        const mid = floorplan({id: 'mid', units: [unit({rent: 1000})]});
        const high = floorplan({id: 'high', units: [unit({rent: 1500})]});

        const result = sortFloorplans([low, high, mid], 'priceDesc');

        expect(result.map(f => f.id)).toEqual(['high', 'mid', 'low']);
    });

    it('sorts by bedroom ascending', () => {
        const one = floorplan({id: 'one-bed', bedroom: 1});
        const two = floorplan({id: 'two-bed', bedroom: 2});
        const three = floorplan({id: 'three-bed', bedroom: 3});

        const result = sortFloorplans([three, one, two], 'bedroomsAsc');

        expect(result.map(f => f.id)).toEqual(['one-bed', 'two-bed', 'three-bed']);
    });

    it('sorts by featured descending (default sort)', () => {
        const featured = floorplan({id: 'featured', featured: true});
        const notFeatured = floorplan({id: 'not-featured', featured: false});

        const result = sortFloorplans([notFeatured, featured], 'featured');

        expect(result.map(f => f.id)).toEqual(['featured', 'not-featured']);
    });

    it('does not mutate the original array', () => {
        const low = floorplan({id: 'low', units: [unit({rent: 500})]});
        const high = floorplan({id: 'high', units: [unit({rent: 1500})]});
        const original = [high, low];

        const result = sortFloorplans(original, 'priceAsc');

        expect(original.map(f => f.id)).toEqual(['high', 'low']);
        expect(result).not.toBe(original);
    });

    it('returns an empty array when given an empty array', () => {
        expect(sortFloorplans([], 'featured')).toEqual([]);
    });
});

describe('filtersFrom', () => {
    it('returns empty bedroom/style sets but includes AVAILABLE_NOW by default when given no floorplans', () => {
        const result = filtersFrom([]);

        expect(result.bedroom.size).toBe(0);
        expect(result.style.size).toBe(0);
        expect(result.availability.has(AVAILABLE_NOW)).toBe(true);
    });

    it('collects distinct bedroom counts and styles across floorplans', () => {
        const fp1 = floorplan({id: 'fp1', bedroom: 1, style: FloorplanStyle.STUDIO});
        const fp2 = floorplan({id: 'fp2', bedroom: 2, style: FloorplanStyle.TOWN_HOME});
        const fp3 = floorplan({id: 'fp3', bedroom: 1, style: FloorplanStyle.STUDIO});

        const result = filtersFrom([fp1, fp2, fp3]);

        expect(result.bedroom).toEqual(new Set([1, 2]));
        expect(result.style).toEqual(new Set([FloorplanStyle.STUDIO, FloorplanStyle.TOWN_HOME]));
    });

    it('adds a month/year availability entry for units within the next twelve months', () => {
        const futureDate = moment().add(2, 'months');
        const fp = floorplan({units: [unit({moveInDate: futureDate.format('YYYY-MM-DD')})]});

        const result = filtersFrom([fp]);

        expect(result.availability.has(futureDate.format(MONTH_YEAR_FORMAT))).toBe(true);
    });
});

describe('isFloorplanAvailable', () => {
    it('returns true when at least one unit has a move-in date in the past', () => {
        const fp = floorplan({units: [unit({moveInDate: moment().subtract(1, 'day').format('YYYY-MM-DD')})]});
        expect(isFloorplanAvailable(fp)).toBe(true);
    });

    it('returns false when all units have future move-in dates', () => {
        const fp = floorplan({units: [unit({moveInDate: moment().add(1, 'day').format('YYYY-MM-DD')})]});
        expect(isFloorplanAvailable(fp)).toBe(false);
    });

    it('returns false for an empty units array', () => {
        const fp = floorplan({units: []});
        expect(isFloorplanAvailable(fp)).toBe(false);
    });
});

describe('permittedPets / notPermittedPets / petPolicy', () => {
    const floorplanWithPet = (allowedPet: Pet | null, petPolicyText = 'policy text'): any => ({
        allowedPet,
        petPolicy: petPolicyText,
        units: []
    });

    it('returns all pets and empty not-permitted list when floorplan allows LARGE_DOG_SMALL_DOG_CAT', () => {
        const fp = floorplanWithPet(Pet.LARGE_DOG_SMALL_DOG_CAT);
        expect(permittedPets(fp)).toEqual(['Large Dog', 'Small Dog', 'Cat']);
        expect(notPermittedPets(fp)).toEqual([]);
    });

    it('returns only cat permitted and large/small dog not permitted for CAT', () => {
        const fp = floorplanWithPet(Pet.CAT);
        expect(permittedPets(fp)).toEqual(['Cat']);
        expect(notPermittedPets(fp)).toEqual(['Large Dog', 'Small Dog']);
    });

    it('returns None permitted and all pets not-permitted for NO_PET', () => {
        const fp = floorplanWithPet(Pet.NO_PET);
        expect(permittedPets(fp)).toEqual(['None']);
        expect(notPermittedPets(fp)).toEqual(['Large Dog', 'Small Dog', 'Cat']);
    });

    it('returns floorplan petPolicy when allowedPet is set on the floorplan', () => {
        const fp = floorplanWithPet(Pet.CAT, 'floorplan policy');
        expect(petPolicy(fp)).toBe('floorplan policy');
    });

    // NOTE: unitWithMostAllowedPet's comparator sorts descending by pet
    // ordinal and then pops the last element, so it actually returns the
    // LEAST permissive unit (not the "most allowed" the name implies).
    // This test documents the current (likely buggy) behavior rather than
    // the function's apparent intent.
    it('falls back to the unit with the least permissive allowedPet when the floorplan has none (current pop-based behavior)', () => {
        const fp: any = {
            allowedPet: null,
            units: [
                {allowedPet: Pet.CAT, petPolicy: 'cat policy'},
                {allowedPet: Pet.LARGE_DOG_SMALL_DOG_CAT, petPolicy: 'big policy'},
                {allowedPet: Pet.NO_PET, petPolicy: 'no pet policy'}
            ]
        };

        expect(permittedPets(fp)).toEqual(['None']);
        expect(petPolicy(fp)).toBe('no pet policy');
    });
});

describe('addressFromFloorplanSpotlight / addressFromFloorplan', () => {
    it('uses the single unit address when there is exactly one unit', () => {
        const fp: any = {
            units: [{address: '456 Elm St', zipcode: '47403'}],
            property: {address: 'Property Address', zipcode: '00000'}
        };

        const result = addressFromFloorplanSpotlight(fp);

        expect(result.address).toBe('456 Elm St');
        expect(result.zipcode).toBe('47403');
    });

    it('uses the property address when there are multiple units', () => {
        const fp: any = {
            units: [{address: 'a', zipcode: '1'}, {address: 'b', zipcode: '2'}],
            property: {address: 'Property Address', zipcode: '00000'}
        };

        const result = addressFromFloorplanSpotlight(fp);

        expect(result.address).toBe('Property Address');
        expect(result.zipcode).toBe('00000');
    });

    it('uses the property address when there are no units', () => {
        const fp: any = {
            units: [],
            property: {address: 'Property Address', zipcode: '00000'}
        };

        const result = addressFromFloorplanSpotlight(fp);

        expect(result.address).toBe('Property Address');
    });

    it('addressFromFloorplan delegates to addressFromFloorplanSpotlight', () => {
        const fp: any = {
            units: [{address: '456 Elm St', zipcode: '47403'}],
            property: {address: 'Property Address', zipcode: '00000'}
        };

        const result = addressFromFloorplan(fp);

        expect(result.address).toBe('456 Elm St');
    });
});

describe('API-backed functions', () => {
    beforeEach(() => {
        vi.mocked(Api.get).mockReset();
    });

    it('getFloorplansFilterData calls the filter projection endpoint for a property', async () => {
        const data = [floorplan()];
        vi.mocked(Api.get).mockResolvedValueOnce({data} as any);

        const result = await getFloorplansFilterData('renaissance-rentals' as any);

        expect(Api.get).toHaveBeenCalledWith('properties/renaissance-rentals/floorplans?projection=filter');
        expect(result).toEqual(data);
    });

    it('getFeaturedFloorplans calls the featured spotlight endpoint', async () => {
        const data = [{id: 'fp1'}];
        vi.mocked(Api.get).mockResolvedValueOnce({data} as any);

        const result = await getFeaturedFloorplans();

        expect(Api.get).toHaveBeenCalledWith('floorplans?filterBy=featured&projection=spotlight');
        expect(result).toEqual(data);
    });

    it('getAllActiveFloorplans calls the details projection endpoint', async () => {
        const data = [{id: 'fp1'}];
        vi.mocked(Api.get).mockResolvedValueOnce({data} as any);

        const result = await getAllActiveFloorplans();

        expect(Api.get).toHaveBeenCalledWith('floorplans?projection=details');
        expect(result).toEqual(data);
    });

    it('getFloorplanSpotlight calls the spotlight endpoint for a specific floorplan', async () => {
        const data = {id: 'fp1'};
        vi.mocked(Api.get).mockResolvedValueOnce({data} as any);

        const result = await getFloorplanSpotlight('fp1');

        expect(Api.get).toHaveBeenCalledWith('floorplans/fp1?projection=spotlight');
        expect(result).toEqual(data);
    });

    it('getFloorplan calls the enriched endpoint for a specific floorplan', async () => {
        const data = {id: 'fp1'};
        vi.mocked(Api.get).mockResolvedValueOnce({data} as any);

        const result = await getFloorplan('fp1');

        expect(Api.get).toHaveBeenCalledWith('floorplans/fp1?projection=enriched');
        expect(result).toEqual(data);
    });

    it('getSimilarFloorplans calls the similar endpoint', async () => {
        const data = [{similarFloorplanId: 'fp2'}];
        vi.mocked(Api.get).mockResolvedValueOnce({data} as any);

        const result = await getSimilarFloorplans('fp1');

        expect(Api.get).toHaveBeenCalledWith('floorplans/fp1/similar');
        expect(result).toEqual(data);
    });

    it('getFloorplanVariations calls the variations endpoint', async () => {
        const data = [{variation: 'A'}];
        vi.mocked(Api.get).mockResolvedValueOnce({data} as any);

        const result = await getFloorplanVariations('fp1');

        expect(Api.get).toHaveBeenCalledWith('floorplans/fp1/variations');
        expect(result).toEqual(data);
    });

    it('getTestimonials calls the testimonials endpoint', async () => {
        const data = [{testimonial: 'Great!', tenant: 'Jane'}];
        vi.mocked(Api.get).mockResolvedValueOnce({data} as any);

        const result = await getTestimonials('fp1');

        expect(Api.get).toHaveBeenCalledWith('floorplans/fp1/testimonials');
        expect(result).toEqual(data);
    });

    it('getWebSpecials calls the webSpecials endpoint', async () => {
        const data = [{description: 'special', startDate: '2020-01-01', endDate: '2020-02-01'}];
        vi.mocked(Api.get).mockResolvedValueOnce({data} as any);

        const result = await getWebSpecials('fp1');

        expect(Api.get).toHaveBeenCalledWith('floorplans/fp1/webSpecials');
        expect(result).toEqual(data);
    });

    it('getFloorplanFaqs calls the faqs endpoint', async () => {
        const data = [{id: 'faq1', question: 'Q', answer: 'A', sortOrder: 1}];
        vi.mocked(Api.get).mockResolvedValueOnce({data} as any);

        const result = await getFloorplanFaqs('fp1');

        expect(Api.get).toHaveBeenCalledWith('floorplans/fp1/faqs');
        expect(result).toEqual(data);
    });
});
