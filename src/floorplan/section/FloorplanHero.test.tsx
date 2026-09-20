import {describe, expect, it, vi} from 'vitest';
import {render, screen, waitFor} from '@testing-library/react';
import {FloorplanHero} from './FloorplanHero';
import {Floorplan, FloorplanStyle} from '../data/Floorplan';
import {LeaseType} from '../../property/data/Property';
import {Pet} from '../../unit/data/Unit';
import {getAssetsFrom} from '../../asset/service/AssetService';

vi.mock('../../asset/service/AssetService', async () => {
    const actual = await vi.importActual<typeof import('../../asset/service/AssetService')>('../../asset/service/AssetService');
    return {
        ...actual,
        getAssetsFrom: vi.fn()
    };
});

const baseFloorplan = (overrides: Partial<Floorplan> = {}): Floorplan => ({
    id: 'aberdeen',
    name: 'Aberdeen',
    bedroom: 1,
    bathroom: 1,
    style: FloorplanStyle.STUDIO,
    allowedPet: Pet.NO_PET,
    petPolicy: '',
    featured: false,
    patioIncluded: false,
    greenCertified: false,
    videoTourLink: '',
    threeSixtyVideoTourLink: '',
    virtualTourLink: '',
    photo: null,
    coverImage: null,
    floorPlanFolderId: '',
    photosFolderId: '',
    address: '123 Main St',
    zipcode: '47401',
    description: 'A cozy studio',
    vanityLink: '',
    specialRent: null as unknown as number,
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
        name: 'Aberdeen Property',
        id: 'aberdeen-property',
        email: '',
        phone: '',
        address: '123 Main St',
        zipcode: '47401',
        busRoutes: [],
        leaseType: LeaseType.YEARLY
    },
    units: [],
    webSpecials: [],
    ...overrides
} as Floorplan);

describe('FloorplanHero', () => {
    it('renders the floorplan name, description and address once assets are resolved', async () => {
        render(
            <FloorplanHero floorplan={baseFloorplan()} webSpecials={[]} contactClickHandler={vi.fn()}
                            applyClickHandler={vi.fn()} handleRefToMap={vi.fn()}/>
        );

        expect(await screen.findByText('Aberdeen')).toBeInTheDocument();
        expect(screen.getByText('123 Main St, Bloomington, IN 47401')).toBeInTheDocument();
    });

    it('shows the gallery skeleton while assets are still loading from a photos folder', async () => {
        let resolveAssets: (value: unknown) => void = () => {
        };
        vi.mocked(getAssetsFrom).mockReturnValue(new Promise((resolve) => {
            resolveAssets = resolve;
        }));

        const {container} = render(
            <FloorplanHero floorplan={baseFloorplan({photosFolderId: 'folder-1'})} webSpecials={[]}
                            contactClickHandler={vi.fn()} applyClickHandler={vi.fn()} handleRefToMap={vi.fn()}/>
        );

        expect(container.querySelector('.grid-gallery')).toBeInTheDocument();

        resolveAssets([]);
        await waitFor(() => expect(container.querySelector('.gallery-hero')).toBeInTheDocument());
    });

    it('calls contactClickHandler and applyClickHandler when their buttons are clicked', async () => {
        const contactClickHandler = vi.fn();
        const applyClickHandler = vi.fn();
        render(
            <FloorplanHero floorplan={baseFloorplan()} webSpecials={[]} contactClickHandler={contactClickHandler}
                            applyClickHandler={applyClickHandler} handleRefToMap={vi.fn()}/>
        );

        await screen.findByText('Aberdeen');
        screen.getByRole('button', {name: /contact us/i}).click();
        screen.getByRole('button', {name: /^apply$/i}).click();

        expect(contactClickHandler).toHaveBeenCalled();
        expect(applyClickHandler).toHaveBeenCalled();
    });

    it('renders bus routes when the property has any', async () => {
        render(
            <FloorplanHero
                floorplan={baseFloorplan({
                    property: {
                        name: 'Aberdeen Property', id: 'aberdeen-property', email: '', phone: '',
                        address: '123 Main St', zipcode: '47401', leaseType: LeaseType.YEARLY,
                        busRoutes: [{busRoute: 'Route 1', busRouteLink: 'https://bus.example.com/1'}]
                    }
                })}
                webSpecials={[]} contactClickHandler={vi.fn()} applyClickHandler={vi.fn()} handleRefToMap={vi.fn()}/>
        );

        expect(await screen.findByText('Route 1')).toBeInTheDocument();
        expect(screen.getByText('Route 1').closest('a')).toHaveAttribute('href', 'https://bus.example.com/1');
    });
});
