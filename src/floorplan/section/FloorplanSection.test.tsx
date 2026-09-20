import {describe, expect, it, vi} from 'vitest';
import {render, screen, waitFor} from '@testing-library/react';
import {FloorplanSection} from './FloorplanSection';
import {Floorplan, FloorplanStyle} from '../data/Floorplan';
import {LeaseType} from '../../property/data/Property';
import {Pet} from '../../unit/data/Unit';
import * as FloorplanService from '../service/FloorplanService';

vi.mock('../service/FloorplanService', async () => {
    const actual = await vi.importActual<typeof import('../service/FloorplanService')>('../service/FloorplanService');
    return {
        ...actual,
        getFloorplan: vi.fn(),
        getFloorplanVariations: vi.fn(),
        getSimilarFloorplans: vi.fn(),
        getTestimonials: vi.fn(),
        getWebSpecials: vi.fn(),
        getFloorplanFaqs: vi.fn()
    };
});

vi.mock('../../short-term/ShortTermFloorplanSection', () => ({
    ShortTermFloorplanSection: ({floorplanId}: { floorplanId: string }) =>
        <div data-testid="short-term-section">{floorplanId}</div>
}));

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
    htmlTitle: 'Aberdeen | Floorplans',
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
        phone: '3175551234',
        address: '123 Main St',
        zipcode: '47401',
        busRoutes: [],
        leaseType: LeaseType.YEARLY
    },
    units: [],
    webSpecials: [],
    ...overrides
} as Floorplan);

const mockDependentCalls = () => {
    vi.mocked(FloorplanService.getFloorplanVariations).mockResolvedValue([]);
    vi.mocked(FloorplanService.getSimilarFloorplans).mockResolvedValue([]);
    vi.mocked(FloorplanService.getTestimonials).mockResolvedValue([]);
    vi.mocked(FloorplanService.getWebSpecials).mockResolvedValue([]);
    vi.mocked(FloorplanService.getFloorplanFaqs).mockResolvedValue([]);
};

describe('FloorplanSection', () => {
    it('shows the gallery skeleton while the floorplan is loading', () => {
        vi.mocked(FloorplanService.getFloorplan).mockReturnValue(new Promise(() => {
        }));

        const {container} = render(<FloorplanSection contactClickHandler={vi.fn()} applyClickHandler={vi.fn()}
                                                       floorplanId="aberdeen"/>);

        expect(container.querySelector('.grid-gallery')).toBeInTheDocument();
    });

    it('renders the floorplan details once loaded', async () => {
        vi.mocked(FloorplanService.getFloorplan).mockResolvedValue(baseFloorplan());
        mockDependentCalls();

        render(<FloorplanSection contactClickHandler={vi.fn()} applyClickHandler={vi.fn()} floorplanId="aberdeen"/>);

        expect(await screen.findByText('Aberdeen')).toBeInTheDocument();
        expect(screen.getByText('A cozy studio')).toBeInTheDocument();
    });

    it('calls handleHtmlTitleUpdate with the floorplan html title once loaded', async () => {
        vi.mocked(FloorplanService.getFloorplan).mockResolvedValue(baseFloorplan());
        mockDependentCalls();
        const handleHtmlTitleUpdate = vi.fn();

        render(<FloorplanSection contactClickHandler={vi.fn()} applyClickHandler={vi.fn()} floorplanId="aberdeen"
                                  handleHtmlTitleUpdate={handleHtmlTitleUpdate}/>);

        await waitFor(() => expect(handleHtmlTitleUpdate).toHaveBeenCalledWith('Aberdeen | Floorplans'));
    });

    it('shows a 404 message when the floorplan fails to load', async () => {
        vi.mocked(FloorplanService.getFloorplan).mockRejectedValue(new Error('not found'));

        render(<FloorplanSection contactClickHandler={vi.fn()} applyClickHandler={vi.fn()}
                                  floorplanId="everhart-not-found"/>);

        expect(await screen.findByText('Uh-oh, this is a 404')).toBeInTheDocument();
    });

    it('renders the short-term section instead when the property lease type is SHORT_TERM', async () => {
        vi.mocked(FloorplanService.getFloorplan).mockResolvedValue(baseFloorplan({
            property: {
                name: 'Flat Property', id: 'flat-property', email: '', phone: '', address: '1 Flat Rd',
                zipcode: '10001', busRoutes: [], leaseType: LeaseType.SHORT_TERM
            }
        }));

        render(<FloorplanSection contactClickHandler={vi.fn()} applyClickHandler={vi.fn()}
                                  floorplanId="1-bedroom-flat"/>);

        expect(await screen.findByTestId('short-term-section')).toHaveTextContent('1-bedroom-flat');
    });
});
