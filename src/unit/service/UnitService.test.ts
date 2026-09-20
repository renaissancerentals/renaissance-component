import {beforeEach, describe, expect, it, vi} from 'vitest';
import moment from 'moment/moment';
import {
    addressFromUnit,
    filtersFromUnits,
    getUnit,
    isUnitAvailable,
    notPermittedPets,
    permittedPets,
    sortAndFilterUnits,
    sortUnits,
    toUnits,
    unitsFromFloorplans,
    unitsFromProperties
} from './UnitService';
import {Pet, UnitCardData, UnitFloorplan} from '../data/Unit';
import {FloorplanCardData, FloorplanStyle} from '../../floorplan/data/Floorplan';
import {CurrentFloorplanFilters} from '../../floorplan/data/FloorplanFilters';
import {AVAILABLE_NOW, MONTH_YEAR_FORMAT} from '../../floorplan/service/FloorplanService';
import {PropertyFilterData} from '../../property/data/Property';
import Api from '../../service/Api';

vi.mock('../../service/Api', () => ({
    default: {
        get: vi.fn()
    }
}));

const unit = (overrides: Partial<UnitCardData> = {}): UnitCardData => ({
    id: 'u1',
    rent: 1000,
    squareFoot: 800,
    moveInDate: '2020-01-01',
    availabilityExtensionMonths: null,
    floorplanId: 'fp1',
    floorplanName: 'The Aspen',
    bedroom: 1,
    bathroom: 1,
    coverImage: 'image.jpg',
    featured: false,
    style: FloorplanStyle.APARTMENT,
    specialRent: null as unknown as number,
    specialRentStartDate: '',
    specialRentEndDate: '',
    address: '123 Main St',
    zipcode: '47401',
    virtualTourLink: '',
    videoTourLink: '',
    photosFolderId: '',
    webSpecials: [],
    ...overrides
});

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

describe('isUnitAvailable', () => {
    it('returns true when the move-in date is in the past', () => {
        expect(isUnitAvailable(unit({moveInDate: moment().subtract(1, 'day').format('YYYY-MM-DD')}))).toBe(true);
    });

    it('returns false when the move-in date is in the future', () => {
        expect(isUnitAvailable(unit({moveInDate: moment().add(1, 'day').format('YYYY-MM-DD')}))).toBe(false);
    });
});

describe('sortUnits', () => {
    it('sorts by minRate ascending', () => {
        const low = unit({id: 'low', rent: 500});
        const mid = unit({id: 'mid', rent: 1000});
        const high = unit({id: 'high', rent: 1500});

        const result = sortUnits([high, low, mid], 'priceAsc');

        expect(result.map(u => u.id)).toEqual(['low', 'mid', 'high']);
    });

    it('sorts by minRate descending', () => {
        const low = unit({id: 'low', rent: 500});
        const mid = unit({id: 'mid', rent: 1000});
        const high = unit({id: 'high', rent: 1500});

        const result = sortUnits([low, high, mid], 'priceDesc');

        expect(result.map(u => u.id)).toEqual(['high', 'mid', 'low']);
    });

    it('sorts by bedroom ascending', () => {
        const one = unit({id: 'one-bed', bedroom: 1});
        const two = unit({id: 'two-bed', bedroom: 2});
        const three = unit({id: 'three-bed', bedroom: 3});

        const result = sortUnits([three, one, two], 'bedroomsAsc');

        expect(result.map(u => u.id)).toEqual(['one-bed', 'two-bed', 'three-bed']);
    });

    it('sorts by bedroom descending', () => {
        const one = unit({id: 'one-bed', bedroom: 1});
        const two = unit({id: 'two-bed', bedroom: 2});

        const result = sortUnits([one, two], 'bedroomsDesc');

        expect(result.map(u => u.id)).toEqual(['two-bed', 'one-bed']);
    });

    it('sorts by featured descending by default', () => {
        const featured = unit({id: 'featured', featured: true});
        const notFeatured = unit({id: 'not-featured', featured: false});

        const result = sortUnits([notFeatured, featured], 'featured');

        expect(result.map(u => u.id)).toEqual(['featured', 'not-featured']);
    });

    it('sorts by availability ascending', () => {
        const soon = unit({id: 'soon', moveInDate: '2020-01-01'});
        const later = unit({id: 'later', moveInDate: '2020-06-01'});

        const result = sortUnits([later, soon], 'availabilityAsc');

        expect(result.map(u => u.id)).toEqual(['soon', 'later']);
    });

    it('returns an empty array when given an empty array', () => {
        expect(sortUnits([], 'featured')).toEqual([]);
    });
});

describe('sortAndFilterUnits', () => {
    it('returns an empty array when given an empty array', () => {
        expect(sortAndFilterUnits([], defaultFilters())).toEqual([]);
    });

    it('applies no filters and sorts by featured by default', () => {
        const featuredUnit = unit({id: 'featured', featured: true, rent: 900});
        const plainUnit = unit({id: 'plain', featured: false, rent: 500});

        const result = sortAndFilterUnits([plainUnit, featuredUnit], defaultFilters());

        expect(result.map(u => u.id)).toEqual(['featured', 'plain']);
    });

    it('combines multiple filters (bedroom + style + price range)', () => {
        const matches = unit({id: 'match', bedroom: 2, style: FloorplanStyle.APARTMENT, rent: 1200});
        const wrongBedroom = unit({id: 'wrong-bedroom', bedroom: 3, style: FloorplanStyle.APARTMENT, rent: 1200});
        const wrongStyle = unit({id: 'wrong-style', bedroom: 2, style: FloorplanStyle.STUDIO, rent: 1200});
        const wrongPrice = unit({id: 'wrong-price', bedroom: 2, style: FloorplanStyle.APARTMENT, rent: 5000});

        const filters = defaultFilters({
            bedroomFilters: [2],
            styleFilters: [FloorplanStyle.APARTMENT],
            minRent: 1000,
            maxRent: 1500
        });

        const result = sortAndFilterUnits([matches, wrongBedroom, wrongStyle, wrongPrice], filters);

        expect(result.map(u => u.id)).toEqual(['match']);
    });

    it('filters by explicit floorplanIds', () => {
        const fp1Unit = unit({id: 'u-fp1', floorplanId: 'fp1'});
        const fp2Unit = unit({id: 'u-fp2', floorplanId: 'fp2'});

        const result = sortAndFilterUnits([fp1Unit, fp2Unit], defaultFilters({floorplanIds: ['fp2']}));

        expect(result.map(u => u.id)).toEqual(['u-fp2']);
    });

    it('matches a unit at the exact minimum rent boundary', () => {
        const u = unit({id: 'boundary-min', rent: 1000});

        const result = sortAndFilterUnits([u], defaultFilters({minRent: 1000, maxRent: 1500}));

        expect(result.map(unit => unit.id)).toEqual(['boundary-min']);
    });

    it('matches a unit at the exact maximum rent boundary', () => {
        const u = unit({id: 'boundary-max', rent: 1500});

        const result = sortAndFilterUnits([u], defaultFilters({minRent: 1000, maxRent: 1500}));

        expect(result.map(unit => unit.id)).toEqual(['boundary-max']);
    });

    it('excludes a unit just outside the price range', () => {
        const u = unit({id: 'too-expensive', rent: 1501});

        const result = sortAndFilterUnits([u], defaultFilters({minRent: 1000, maxRent: 1500}));

        expect(result).toEqual([]);
    });

    it('includes a unit whose special rent is within range even if its regular rent is not', () => {
        const u = unit({id: 'special', specialRent: 900, rent: 5000});

        const result = sortAndFilterUnits([u], defaultFilters({minRent: 800, maxRent: 1000}));

        expect(result.map(unit => unit.id)).toEqual(['special']);
    });

    it('excludes a unit outside price range with no matching special rent', () => {
        const u = unit({id: 'expensive', specialRent: null as unknown as number, rent: 5000});

        const result = sortAndFilterUnits([u], defaultFilters({minRent: 800, maxRent: 1000}));

        expect(result).toEqual([]);
    });

    it('matches units available now when AVAILABLE_NOW is in the availability filters', () => {
        const availableUnit = unit({id: 'available', moveInDate: moment().format('YYYY-MM-DD')});
        const unavailableUnit = unit({id: 'unavailable', moveInDate: moment().add(6, 'months').format('YYYY-MM-DD')});

        const result = sortAndFilterUnits([availableUnit, unavailableUnit], defaultFilters({availabilityFilters: [AVAILABLE_NOW]}));

        expect(result.map(u => u.id)).toEqual(['available']);
    });

    it('matches units by a specific future month/year availability filter', () => {
        const futureDate = moment().add(3, 'months');
        const monthYear = futureDate.format(MONTH_YEAR_FORMAT);
        const matchingUnit = unit({id: 'future-match', moveInDate: futureDate.format('YYYY-MM-DD')});
        const otherUnit = unit({id: 'future-other', moveInDate: futureDate.clone().add(2, 'months').format('YYYY-MM-DD')});

        const result = sortAndFilterUnits([matchingUnit, otherUnit], defaultFilters({availabilityFilters: [monthYear]}));

        expect(result.map(u => u.id)).toEqual(['future-match']);
    });

    it('matches a unit available now via an availability extension month', () => {
        const extended = unit({
            id: 'extended',
            moveInDate: moment().format('YYYY-MM-DD'),
            availabilityExtensionMonths: 2
        });
        const extensionMonth = moment().add(2, 'month').format(MONTH_YEAR_FORMAT);

        const result = sortAndFilterUnits([extended], defaultFilters({availabilityFilters: [extensionMonth]}));

        expect(result.map(u => u.id)).toEqual(['extended']);
    });

    it('returns an empty array when no unit matches the availability filter', () => {
        const u = unit({id: 'no-match', moveInDate: moment().add(6, 'months').format('YYYY-MM-DD')});

        const result = sortAndFilterUnits([u], defaultFilters({availabilityFilters: ['January 2099']}));

        expect(result).toEqual([]);
    });
});

describe('filtersFromUnits', () => {
    it('returns empty bedroom/style sets but includes AVAILABLE_NOW by default when given no units', () => {
        const result = filtersFromUnits([]);

        expect(result.bedroom.size).toBe(0);
        expect(result.style.size).toBe(0);
        expect(result.availability.has(AVAILABLE_NOW)).toBe(true);
    });

    it('collects distinct bedroom counts and styles across units', () => {
        const u1 = unit({id: 'u1', bedroom: 1, style: FloorplanStyle.STUDIO});
        const u2 = unit({id: 'u2', bedroom: 2, style: FloorplanStyle.TOWN_HOME});
        const u3 = unit({id: 'u3', bedroom: 1, style: FloorplanStyle.STUDIO});

        const result = filtersFromUnits([u1, u2, u3]);

        expect(result.bedroom).toEqual(new Set([1, 2]));
        expect(result.style).toEqual(new Set([FloorplanStyle.STUDIO, FloorplanStyle.TOWN_HOME]));
    });

    it('adds a month/year availability entry for units within the next twelve months', () => {
        const futureDate = moment().add(2, 'months');
        const u = unit({moveInDate: futureDate.format('YYYY-MM-DD')});

        const result = filtersFromUnits([u]);

        expect(result.availability.has(futureDate.format(MONTH_YEAR_FORMAT))).toBe(true);
    });
});

describe('unitsFromFloorplans / toUnits', () => {
    const floorplan = (overrides: Partial<FloorplanCardData> = {}): FloorplanCardData => ({
        id: 'fp1',
        name: 'The Aspen',
        bedroom: 2,
        bathroom: 1.5,
        coverImage: 'cover.jpg',
        featured: true,
        style: FloorplanStyle.APARTMENT,
        specialRent: 900,
        specialRentStartDate: '2020-01-01',
        specialRentEndDate: '2020-02-01',
        address: '123 Main St',
        zipcode: '47401',
        virtualTourLink: 'virtual-link',
        videoTourLink: 'video-link',
        photosFolderId: 'folder1',
        units: [
            {
                id: 'u1',
                rent: 1200,
                squareFoot: 900,
                moveInDate: '2020-01-01',
                availabilityExtensionMonths: null
            } as any
        ],
        webSpecials: ['10% off'],
        ...overrides
    } as FloorplanCardData);

    it('maps every unit to UnitCardData with fields pulled from the floorplan and the unit', () => {
        const result = toUnits(floorplan());

        expect(result).toHaveLength(1);
        expect(result[0]).toMatchObject({
            id: 'u1',
            rent: 1200,
            squareFoot: 900,
            moveInDate: '2020-01-01',
            floorplanId: 'fp1',
            floorplanName: 'The Aspen',
            bedroom: 2,
            bathroom: 1.5,
            coverImage: 'cover.jpg',
            featured: true,
            style: FloorplanStyle.APARTMENT,
            specialRent: 900,
            address: '123 Main St',
            zipcode: '47401',
            virtualTourLink: 'virtual-link',
            videoTourLink: 'video-link',
            photosFolderId: 'folder1',
            webSpecials: ['10% off']
        });
    });

    it('returns an empty array for a floorplan with no units', () => {
        expect(toUnits(floorplan({units: []}))).toEqual([]);
    });

    it('unitsFromFloorplans flattens units across multiple floorplans', () => {
        const fp1 = floorplan({id: 'fp1', units: [{id: 'u1'} as any]});
        const fp2 = floorplan({id: 'fp2', units: [{id: 'u2'} as any, {id: 'u3'} as any]});

        const result = unitsFromFloorplans([fp1, fp2]);

        expect(result.map(u => u.id)).toEqual(['u1', 'u2', 'u3']);
    });

    it('returns an empty array when given no floorplans', () => {
        expect(unitsFromFloorplans([])).toEqual([]);
    });
});

describe('unitsFromProperties', () => {
    it('flattens units across all floorplans of all properties', () => {
        const property1: PropertyFilterData = {
            id: 'p1',
            name: 'Property One',
            floorplans: [{
                id: 'fp1',
                name: 'The Aspen',
                bedroom: 1,
                bathroom: 1,
                coverImage: '',
                featured: false,
                style: FloorplanStyle.APARTMENT,
                specialRent: null as unknown as number,
                specialRentStartDate: '',
                specialRentEndDate: '',
                address: '',
                zipcode: '',
                virtualTourLink: '',
                videoTourLink: '',
                photosFolderId: '',
                units: [{id: 'u1'} as any],
                webSpecials: []
            } as FloorplanCardData]
        };
        const property2: PropertyFilterData = {
            id: 'p2',
            name: 'Property Two',
            floorplans: [{
                id: 'fp2',
                name: 'The Birch',
                bedroom: 2,
                bathroom: 2,
                coverImage: '',
                featured: false,
                style: FloorplanStyle.APARTMENT,
                specialRent: null as unknown as number,
                specialRentStartDate: '',
                specialRentEndDate: '',
                address: '',
                zipcode: '',
                virtualTourLink: '',
                videoTourLink: '',
                photosFolderId: '',
                units: [{id: 'u2'} as any],
                webSpecials: []
            } as FloorplanCardData]
        };

        const result = unitsFromProperties([property1, property2]);

        expect(result.map(u => u.id)).toEqual(['u1', 'u2']);
    });

    it('returns an empty array when given no properties', () => {
        expect(unitsFromProperties([])).toEqual([]);
    });
});

describe('addressFromUnit', () => {
    it('uses the unit address and zipcode when present', () => {
        const unitFloorplan = {
            address: 'Unit Address',
            zipcode: 'Unit Zip',
            floorplan: {address: 'Floorplan Address', zipcode: 'Floorplan Zip'}
        } as UnitFloorplan;

        const result = addressFromUnit(unitFloorplan);

        expect(result.address).toBe('Unit Address');
        expect(result.zipcode).toBe('Unit Zip');
        expect(result.city).toBe('Bloomington');
        expect(result.state).toBe('IN');
    });

    it('falls back to the floorplan address and zipcode when the unit has none', () => {
        const unitFloorplan = {
            address: '',
            zipcode: '',
            floorplan: {address: 'Floorplan Address', zipcode: 'Floorplan Zip'}
        } as UnitFloorplan;

        const result = addressFromUnit(unitFloorplan);

        expect(result.address).toBe('Floorplan Address');
        expect(result.zipcode).toBe('Floorplan Zip');
    });
});

describe('permittedPets / notPermittedPets', () => {
    it('returns all pets permitted and none excluded for LARGE_DOG_SMALL_DOG_CAT', () => {
        const unitFloorplan = {allowedPet: Pet.LARGE_DOG_SMALL_DOG_CAT} as UnitFloorplan;

        expect(permittedPets(unitFloorplan)).toEqual(['Large Dog', 'Small Dog', 'Cat']);
        expect(notPermittedPets(unitFloorplan)).toEqual([]);
    });

    it('returns small dog and cat permitted, large dog excluded for SMALL_DOG_CAT', () => {
        const unitFloorplan = {allowedPet: Pet.SMALL_DOG_CAT} as UnitFloorplan;

        expect(permittedPets(unitFloorplan)).toEqual(['Small Dog', 'Cat']);
        expect(notPermittedPets(unitFloorplan)).toEqual(['Large Dog']);
    });

    it('returns only cat permitted and both dogs excluded for CAT', () => {
        const unitFloorplan = {allowedPet: Pet.CAT} as UnitFloorplan;

        expect(permittedPets(unitFloorplan)).toEqual(['Cat']);
        expect(notPermittedPets(unitFloorplan)).toEqual(['Large Dog', 'Small Dog']);
    });

    it('returns None permitted and all pets excluded for NO_PET', () => {
        const unitFloorplan = {allowedPet: Pet.NO_PET} as UnitFloorplan;

        expect(permittedPets(unitFloorplan)).toEqual(['None']);
        expect(notPermittedPets(unitFloorplan)).toEqual(['Large Dog', 'Small Dog', 'Cat']);
    });

    it('returns None permitted and no exclusions for an unrecognized/undefined pet value', () => {
        const unitFloorplan = {allowedPet: undefined} as unknown as UnitFloorplan;

        expect(permittedPets(unitFloorplan)).toEqual(['None']);
        expect(notPermittedPets(unitFloorplan)).toEqual([]);
    });
});

describe('getUnit', () => {
    beforeEach(() => {
        vi.mocked(Api.get).mockReset();
    });

    it('calls the unit-floorplan projection endpoint for the given unit id', async () => {
        const data = {id: 'unit-1'};
        vi.mocked(Api.get).mockResolvedValueOnce({data} as any);

        const result = await getUnit('unit-1');

        expect(Api.get).toHaveBeenCalledWith('units/unit-1?projection=unit-floorplan');
        expect(result).toEqual(data);
    });
});
