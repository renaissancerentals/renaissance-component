import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {UnitHero} from './UnitHero';
import {UnitFloorplan} from '../data/Unit';
import {FloorplanStyle} from '../../floorplan/data/Floorplan';
import {LeaseType} from '../../property/data/Property';
import {toUSD} from '../../utils/Utils';

vi.mock('../../asset/service/AssetService', () => ({
    getAssetsFrom: vi.fn().mockResolvedValue([]),
    getAssetUrl: vi.fn((url: string) => url),
    assetUrlFrom: vi.fn((id: string) => `asset-url/${id}`)
}));

const unitFloorplan = (overrides: Partial<UnitFloorplan> = {}): UnitFloorplan => ({
    id: 'u1',
    squareFoot: 1000,
    allowedPet: undefined as any,
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
        allowedPet: undefined as any,
        petPolicy: '',
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
        description: '',
        vanityLink: '',
        specialRent: 0,
        specialRentStartDate: '',
        specialRentEndDate: '',
        htmlTitle: '',
        metaDescription: '',
        conversionTrackingId1: '',
        conversionTrackingId2: '',
        customCode: '',
        utilities: [],
        amenities: [],
        property: {
            name: 'Verona Park',
            id: 'verona-park',
            email: '',
            phone: '',
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

describe('UnitHero', () => {
    it('renders the floorplan name', () => {
        render(<UnitHero unit={unitFloorplan()} webSpecials={[]} contactClickHandler={vi.fn()}
                          applyClickHandler={vi.fn()} handleRefToMap={vi.fn()}/>);

        expect(screen.getByText('The Barcelona')).toBeInTheDocument();
    });

    it('renders the unit rent price', () => {
        render(<UnitHero unit={unitFloorplan({rent: 1500})} webSpecials={[]} contactClickHandler={vi.fn()}
                          applyClickHandler={vi.fn()} handleRefToMap={vi.fn()}/>);

        expect(screen.getByText(toUSD(1500))).toBeInTheDocument();
    });

    it('prints the unit address with city, state and zipcode', () => {
        render(<UnitHero unit={unitFloorplan({address: '1100 N Walnut St', zipcode: '47404'})} webSpecials={[]}
                          contactClickHandler={vi.fn()} applyClickHandler={vi.fn()} handleRefToMap={vi.fn()}/>);

        expect(screen.getByText('1100 N Walnut St, Bloomington, IN 47404')).toBeInTheDocument();
    });

    it('calls contactClickHandler when the contact us button is clicked', async () => {
        const contactClickHandler = vi.fn();
        const user = userEvent.setup();
        render(<UnitHero unit={unitFloorplan()} webSpecials={[]} contactClickHandler={contactClickHandler}
                          applyClickHandler={vi.fn()} handleRefToMap={vi.fn()}/>);

        await user.click(screen.getByText('contact us'));

        expect(contactClickHandler).toHaveBeenCalled();
    });

    it('calls applyClickHandler when the apply button is clicked', async () => {
        const applyClickHandler = vi.fn();
        const user = userEvent.setup();
        render(<UnitHero unit={unitFloorplan()} webSpecials={[]} contactClickHandler={vi.fn()}
                          applyClickHandler={applyClickHandler} handleRefToMap={vi.fn()}/>);

        await user.click(screen.getByText('apply'));

        expect(applyClickHandler).toHaveBeenCalled();
    });

    it('calls handleRefToMap when the "View on Map" button is clicked', async () => {
        const handleRefToMap = vi.fn();
        const user = userEvent.setup();
        render(<UnitHero unit={unitFloorplan()} webSpecials={[]} contactClickHandler={vi.fn()}
                          applyClickHandler={vi.fn()} handleRefToMap={handleRefToMap}/>);

        await user.click(screen.getByText('View on Map'));

        expect(handleRefToMap).toHaveBeenCalled();
    });

    it('opens the floorplan image modal when "ViewFloorplan" is clicked', async () => {
        const user = userEvent.setup();
        const {container} = render(<UnitHero
            unit={unitFloorplan({floorplanImage: 'https://example.com/floorplan.jpg'})} webSpecials={[]}
            contactClickHandler={vi.fn()} applyClickHandler={vi.fn()} handleRefToMap={vi.fn()}/>);

        await user.click(screen.getByText('ViewFloorplan'));

        expect(screen.getByAltText('Floorplan image')).toBeInTheDocument();
        const img = screen.getByAltText('Floorplan image') as HTMLImageElement;
        expect(img.src).toBe('https://example.com/floorplan.jpg');
    });

    it('renders bus routes when the property has them', () => {
        render(<UnitHero unit={unitFloorplan({
            floorplan: {
                ...unitFloorplan().floorplan,
                property: {
                    ...unitFloorplan().floorplan.property,
                    busRoutes: [{busRoute: 'Route 5', busRouteLink: 'https://example.com/route5'}]
                }
            }
        })} webSpecials={[]} contactClickHandler={vi.fn()} applyClickHandler={vi.fn()} handleRefToMap={vi.fn()}/>);

        expect(screen.getByText('Route 5')).toBeInTheDocument();
        expect(screen.getByText(/Bus Routes:/)).toBeInTheDocument();
    });

    it('does not render bus routes text when the property has none', () => {
        render(<UnitHero unit={unitFloorplan()} webSpecials={[]} contactClickHandler={vi.fn()}
                          applyClickHandler={vi.fn()} handleRefToMap={vi.fn()}/>);

        expect(screen.queryByText(/Bus Routes:/)).not.toBeInTheDocument();
    });
});
