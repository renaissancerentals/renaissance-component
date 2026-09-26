import {beforeEach, describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import {UnitSection} from './UnitSection';
import {UnitFloorplan, Pet} from '../data/Unit';
import {FloorplanStyle, AmenityType, UtilityType} from '../../floorplan/data/Floorplan';
import {LeaseType} from '../../property/data/Property';
import {getUnit} from '../service/UnitService';
import {
    getFloorplanFaqs,
    getFloorplanVariations,
    getSimilarFloorplans,
    getTestimonials,
    getWebSpecials
} from '../../floorplan/service/FloorplanService';
import {getShortTermFloorplan} from '../../short-term/service/ShortTermService';

vi.mock('../service/UnitService', async () => {
    const actual = await vi.importActual<typeof import('../service/UnitService')>('../service/UnitService');
    return {...actual, getUnit: vi.fn()};
});

vi.mock('../../floorplan/service/FloorplanService', async () => {
    const actual = await vi.importActual<typeof import('../../floorplan/service/FloorplanService')>('../../floorplan/service/FloorplanService');
    return {
        ...actual,
        getFloorplanVariations: vi.fn().mockResolvedValue([]),
        getSimilarFloorplans: vi.fn().mockResolvedValue([]),
        getTestimonials: vi.fn().mockResolvedValue([]),
        getWebSpecials: vi.fn().mockResolvedValue([]),
        getFloorplanFaqs: vi.fn().mockResolvedValue([])
    };
});

vi.mock('../../short-term/service/ShortTermService', () => ({
    getShortTermFloorplan: vi.fn().mockResolvedValue({
        id: 'st1',
        name: 'Short Term Suite',
        property: {busRoutes: []},
        amenities: [],
        units: []
    })
}));

vi.mock('../../asset/service/AssetService', () => ({
    getAssetsFrom: vi.fn().mockResolvedValue([]),
    getAssetUrl: vi.fn((url: string) => url),
    assetUrlFrom: vi.fn((id: string) => `asset-url/${id}`)
}));

const unitFloorplan = (overrides: Partial<UnitFloorplan> = {}): UnitFloorplan => ({
    id: 'u1',
    squareFoot: 1000,
    allowedPet: Pet.CAT,
    petPolicy: '',
    rent: 1200,
    discountedRent: null as unknown as number,
    discountedRentStartDate: '',
    discountedRentEndDate: '',
    discountedRentDescription: '',
    deposit: 500,
    endUnit: false,
    furnished: false,
    murphyBedProvided: false,
    affordableHousing: false,
    level: undefined as any,
    garages: 0,
    turnoverRate: undefined as any,
    features: '',
    patioIncluded: false,
    address: '1100 N Walnut St',
    zipcode: '47404',
    billingLink: '',
    moveInDate: '2020-01-01',
    availabilityExtensionMonths: null,
    unitFolderId: '',
    photosFolderId: '',
    photosCount: 0,
    coverImage: 'https://example.com/cover.jpg',
    floorplanImage: 'https://example.com/floorplan.jpg',
    photosLink: '',
    videoTourLink: '',
    threeSixtyVideoTourLink: '',
    virtualTourLink: '',
    lastModifiedBy: '',
    lastModifiedDate: '',
    floorplan: {
        id: 'fp1',
        name: 'The Barcelona',
        bedroom: 1,
        bathroom: 1.5,
        style: FloorplanStyle.APARTMENT,
        allowedPet: Pet.CAT,
        petPolicy: 'floorplan pet policy',
        featured: false,
        patioIncluded: false,
        greenCertified: false,
        videoTourLink: '',
        threeSixtyVideoTourLink: '',
        virtualTourLink: '',
        photo: 'https://example.com/photo.jpg',
        coverImage: '',
        floorPlanFolderId: '',
        photosFolderId: '',
        address: '1100 N Walnut St',
        zipcode: '47404',
        description: 'A lovely apartment with great views.',
        vanityLink: '',
        specialRent: 0,
        specialRentStartDate: '',
        specialRentEndDate: '',
        htmlTitle: 'The Barcelona | Verona Park',
        metaDescription: '',
        conversionTrackingId1: '',
        conversionTrackingId2: '',
        customCode: '',
        utilities: [
            {id: 1, name: 'trash', type: UtilityType.INCLUDED_UTILITY, averageMonthlyBill: 0} as any,
            {id: 2, name: 'electric', type: UtilityType.RESIDENT_UTILITY, averageMonthlyBill: 45} as any
        ],
        amenities: [
            {id: 'a1', name: 'Pool', featured: true, type: AmenityType.OUTDOOR} as any,
            {id: 'a2', name: 'Dishwasher', featured: false, type: AmenityType.KITCHEN} as any
        ],
        property: {
            name: 'Verona Park',
            id: 'verona-park',
            email: '',
            phone: '3175551234',
            address: '',
            zipcode: '',
            busRoutes: [],
            leaseType: LeaseType.YEARLY
        },
        units: [],
        webSpecials: []
    },
    ...overrides
} as UnitFloorplan);

describe('UnitSection', () => {
    beforeEach(() => {
        vi.mocked(getUnit).mockReset();
        vi.mocked(getFloorplanVariations).mockClear().mockResolvedValue([]);
        vi.mocked(getSimilarFloorplans).mockClear().mockResolvedValue([]);
        vi.mocked(getTestimonials).mockClear().mockResolvedValue([]);
        vi.mocked(getWebSpecials).mockClear().mockResolvedValue([]);
        vi.mocked(getFloorplanFaqs).mockClear().mockResolvedValue([]);
    });

    it('shows a loading skeleton before the unit has loaded', () => {
        vi.mocked(getUnit).mockReturnValue(new Promise(() => {
        }));

        const {container} = render(<UnitSection contactClickHandler={vi.fn()} applyClickHandler={vi.fn()}
                                                  unitId="u1"/>);

        expect(container.querySelector('.grid-gallery')).toBeInTheDocument();
        expect(screen.queryByText('The Barcelona')).not.toBeInTheDocument();
    });

    it('renders unit details once loaded', async () => {
        vi.mocked(getUnit).mockResolvedValueOnce(unitFloorplan());

        render(<UnitSection contactClickHandler={vi.fn()} applyClickHandler={vi.fn()} unitId="u1"/>);

        expect(await screen.findByText('The Barcelona')).toBeInTheDocument();
        expect(screen.getByText('A lovely apartment with great views.')).toBeInTheDocument();
        expect(screen.getByText(/Security Deposit/)).toBeInTheDocument();
    });

    it('renders featured and non-featured amenities', async () => {
        vi.mocked(getUnit).mockResolvedValueOnce(unitFloorplan());

        render(<UnitSection contactClickHandler={vi.fn()} applyClickHandler={vi.fn()} unitId="u1"/>);

        expect(await screen.findByText('Pool')).toBeInTheDocument();
        expect(screen.getByText('Dishwasher')).toBeInTheDocument();
    });

    it('renders permitted and not-permitted pets based on the allowed pet', async () => {
        vi.mocked(getUnit).mockResolvedValueOnce(unitFloorplan({allowedPet: Pet.CAT}));

        render(<UnitSection contactClickHandler={vi.fn()} applyClickHandler={vi.fn()} unitId="u1"/>);

        await screen.findByText('The Barcelona');
        expect(screen.getByText('Cat')).toBeInTheDocument();
        expect(screen.getByText('Large Dog')).toBeInTheDocument();
        expect(screen.getByText('Small Dog')).toBeInTheDocument();
    });

    it('renders utilities split into paid-by-landlord and paid-by-resident sections', async () => {
        vi.mocked(getUnit).mockResolvedValueOnce(unitFloorplan());

        render(<UnitSection contactClickHandler={vi.fn()} applyClickHandler={vi.fn()} unitId="u1"/>);

        expect(await screen.findByText('Paid By Landlord')).toBeInTheDocument();
        expect(screen.getByText('Trash')).toBeInTheDocument();
        expect(screen.getByText('Paid By Resident')).toBeInTheDocument();
        expect(screen.getByText(/Electric - Avg\/Mo/)).toBeInTheDocument();
    });

    it('renders the property phone number in the contact card', async () => {
        vi.mocked(getUnit).mockResolvedValueOnce(unitFloorplan());

        render(<UnitSection contactClickHandler={vi.fn()} applyClickHandler={vi.fn()} unitId="u1"/>);

        await screen.findByText('The Barcelona');
        expect(screen.getByText('(317)-555-1234')).toBeInTheDocument();
    });

    it('shows an error message when loading the unit fails', async () => {
        vi.mocked(getUnit).mockRejectedValueOnce(new Error('not found'));

        render(<UnitSection contactClickHandler={vi.fn()} applyClickHandler={vi.fn()} unitId="bad-id"/>);

        expect(await screen.findByText('Uh-oh, this is a 404')).toBeInTheDocument();
    });

    it('adds a noindex robots meta tag when loading the unit fails', async () => {
        vi.mocked(getUnit).mockRejectedValueOnce(new Error('not found'));

        render(<UnitSection contactClickHandler={vi.fn()} applyClickHandler={vi.fn()} unitId="bad-id"/>);

        await screen.findByText('Uh-oh, this is a 404');
        expect(document.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
    });

    it('does not add a noindex robots meta tag when the unit loads successfully', async () => {
        vi.mocked(getUnit).mockResolvedValueOnce(unitFloorplan());

        render(<UnitSection contactClickHandler={vi.fn()} applyClickHandler={vi.fn()} unitId="u1"/>);

        await screen.findByText('The Barcelona');
        expect(document.querySelector('meta[name="robots"]')).not.toBeInTheDocument();
    });

    it('calls handleHtmlTitleUpdate with the floorplan html title once loaded', async () => {
        vi.mocked(getUnit).mockResolvedValueOnce(unitFloorplan());
        const handleHtmlTitleUpdate = vi.fn();

        render(<UnitSection contactClickHandler={vi.fn()} applyClickHandler={vi.fn()} unitId="u1"
                             handleHtmlTitleUpdate={handleHtmlTitleUpdate}/>);

        await screen.findByText('The Barcelona');
        expect(handleHtmlTitleUpdate).toHaveBeenCalledWith('The Barcelona | Verona Park');
    });

    it('renders the short-term section instead when the property lease type is SHORT_TERM', async () => {
        vi.mocked(getUnit).mockResolvedValueOnce(unitFloorplan({
            floorplan: {
                ...unitFloorplan().floorplan,
                property: {...unitFloorplan().floorplan.property, leaseType: LeaseType.SHORT_TERM}
            }
        }));

        render(<UnitSection contactClickHandler={vi.fn()} applyClickHandler={vi.fn()} unitId="u1"/>);

        expect(await screen.findByText('Short Term Suite')).toBeInTheDocument();
        expect(getShortTermFloorplan).toHaveBeenCalled();
        expect(screen.queryByText('The Barcelona')).not.toBeInTheDocument();
    });
});
