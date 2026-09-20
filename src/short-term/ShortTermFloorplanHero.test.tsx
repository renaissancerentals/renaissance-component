import {beforeEach, describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ShortTermFloorplanHero} from './ShortTermFloorplanHero';
import {FloorplanShortTerm} from './data/ShortTerm';
import {getAssetsFrom} from '../asset/service/AssetService';

vi.mock('../asset/service/AssetService', () => ({
    getAssetsFrom: vi.fn().mockResolvedValue([]),
    assetUrlFrom: () => 'https://assets.test/image',
}));

vi.mock('../gallery/GridGallerySkeleton', () => ({
    GridGallerySkeleton: () => <div data-testid="gallery-skeleton"/>,
}));
vi.mock('../gallery/GalleryModal', () => ({GalleryModal: () => <div data-testid="gallery-modal"/>}));
vi.mock('../gallery/GridGalleryMobile', () => ({GridGalleryMobile: () => <div data-testid="gallery-mobile"/>}));
vi.mock('../gallery/GridGalleryCover', () => ({
    GridGalleryCover: () => <div data-testid="gallery-cover"/>,
    TourType: {},
}));
vi.mock('../gallery/GridGallery', () => ({GridGallery: () => <div data-testid="gallery-grid"/>}));
vi.mock('../gallery/VideoTours', () => ({VideoTours: () => <div data-testid="video-tours"/>}));
vi.mock('../gallery/VirtualTour', () => ({VirtualTour: () => <div data-testid="virtual-tour"/>}));
vi.mock('../floorplan/section/HeroBadgeStats', () => ({HeroBadgeStats: () => <div data-testid="hero-badge-stats"/>}));
vi.mock('../asset/AssetModal', () => ({AssetModal: () => <div data-testid="asset-modal"/>}));

const baseFloorplan = {
    id: '17789',
    name: '2 Bedroom Flat',
    coverImage: 'https://drive.google.com/uc?id=abc&export=download',
    photosFolderId: '',
    address: '123 Main St',
    zipcode: '47401',
    priceFor14To29Days: '119.0',
    priceFor4andMoreMonths: '81.0',
    photo: 'https://drive.google.com/uc?id=floorplan&export=download',
    property: {id: 'verona-park', busRoutes: []},
} as unknown as FloorplanShortTerm;

const renderHero = (floorplan = baseFloorplan, overrides = {}) =>
    render(<ShortTermFloorplanHero floorplan={floorplan} webSpecials={[]} contactClickHandler={vi.fn()}
                                    applyClickHandler={vi.fn()} handleRefToMap={vi.fn()} {...overrides}/>);

describe('ShortTermFloorplanHero', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        (getAssetsFrom as ReturnType<typeof vi.fn>).mockResolvedValue([]);
    });

    it('renders the floorplan name and price range heading once loaded', async () => {
        renderHero();

        expect(await screen.findByText('2 Bedroom Flat')).toBeInTheDocument();
        expect(screen.getByText('$119.0 - $81.0/Day')).toBeInTheDocument();
    });

    it('shows the address built from the floorplan and renaissance city/state', async () => {
        renderHero();

        await screen.findByText('2 Bedroom Flat');

        expect(screen.getByText(/123 Main St, Bloomington, IN 47401/)).toBeInTheDocument();
    });

    it('calls contactClickHandler when "contact us" is clicked', async () => {
        const contactClickHandler = vi.fn();
        renderHero(baseFloorplan, {contactClickHandler});
        await screen.findByText('2 Bedroom Flat');

        await userEvent.click(screen.getByText('contact us'));

        expect(contactClickHandler).toHaveBeenCalled();
    });

    it('calls applyClickHandler when "apply" is clicked', async () => {
        const applyClickHandler = vi.fn();
        renderHero(baseFloorplan, {applyClickHandler});
        await screen.findByText('2 Bedroom Flat');

        await userEvent.click(screen.getByText('apply'));

        expect(applyClickHandler).toHaveBeenCalled();
    });

    it('calls handleRefToMap when "View on Map" is clicked', async () => {
        const handleRefToMap = vi.fn();
        renderHero(baseFloorplan, {handleRefToMap});
        await screen.findByText('2 Bedroom Flat');

        await userEvent.click(screen.getByText(/View on Map/));

        expect(handleRefToMap).toHaveBeenCalled();
    });

    it('omits the bus routes line when the property has none', async () => {
        renderHero();
        await screen.findByText('2 Bedroom Flat');

        expect(screen.queryByText(/Bus Routes:/)).not.toBeInTheDocument();
    });

    it('lists bus routes with links when the property has them', async () => {
        const withRoutes = {
            ...baseFloorplan,
            property: {
                id: 'verona-park',
                busRoutes: [
                    {busRoute: 'Route 1', busRouteLink: 'https://bus.test/1'},
                    {busRoute: 'Route 2', busRouteLink: 'https://bus.test/2'},
                ],
            },
        } as unknown as FloorplanShortTerm;
        renderHero(withRoutes);
        await screen.findByText('2 Bedroom Flat');

        expect(screen.getByText(/Bus Routes:/)).toBeInTheDocument();
        expect(screen.getByText('Route 1')).toHaveAttribute('href', 'https://bus.test/1');
        expect(screen.getByText('Route 2')).toHaveAttribute('href', 'https://bus.test/2');
    });
});
