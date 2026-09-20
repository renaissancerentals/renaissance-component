import {describe, expect, it, vi} from 'vitest';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import moment from 'moment/moment';
import {FloorplanCard} from './FloorplanCard';
import {FloorplanCardData, FloorplanStyle} from '../data/Floorplan';
import {Video} from '../../asset/data/Asset';
import {momentToDate} from '../../utils/Utils';

vi.mock('../../asset/service/AssetService', async (importOriginal) => {
    const actual = await importOriginal<typeof import('../../asset/service/AssetService')>();
    return {
        ...actual,
        getAssetsFrom: vi.fn()
    };
});

import {getAssetsFrom} from '../../asset/service/AssetService';

const baseFloorplan: FloorplanCardData = {
    id: 'barcelona',
    name: 'Barcelona',
    bedroom: 1,
    bathroom: 1,
    coverImage: 'https://drive.google.com/uc?id=abc123&export=download',
    featured: false,
    style: FloorplanStyle.APARTMENT,
    specialRent: 0,
    specialRentStartDate: '',
    specialRentEndDate: '',
    address: '1100 N Walnut St',
    zipcode: '47404',
    virtualTourLink: 'https://www.paneek.net/#/tour/view/3712',
    videoTourLink: 'https://youtu.be/UioR0vCXkUo',
    photosFolderId: 'folder-1',
    units: [
        {id: '1', rent: 1195, squareFoot: 710, moveInDate: momentToDate(moment().add(10, 'days')), availabilityExtensionMonths: null},
        {id: '2', rent: 1165, squareFoot: 710, moveInDate: momentToDate(moment().add(20, 'days')), availabilityExtensionMonths: null}
    ],
    webSpecials: []
};

describe('FloorplanCard', () => {
    it('renders the floorplan name and links to the floorplan page', () => {
        render(<FloorplanCard floorplan={baseFloorplan} propertyId="verona-park" videoClickHandler={vi.fn()}/>);

        expect(screen.getByText('Barcelona')).toBeInTheDocument();
        const link = screen.getByTitle('Barcelona');
        expect(link).toHaveAttribute('href', '/floorplans/barcelona');
    });

    it('renders the bedroom/bathroom and square footage range', () => {
        render(<FloorplanCard floorplan={baseFloorplan} propertyId="verona-park" videoClickHandler={vi.fn()}/>);

        expect(screen.getByText('1 bed, 1 bath')).toBeInTheDocument();
        expect(screen.getByText(/710 sq\.\s*ft\./)).toBeInTheDocument();
    });

    it('applies the small size modifier class', () => {
        const {container} = render(
            <FloorplanCard floorplan={baseFloorplan} propertyId="verona-park" videoClickHandler={vi.fn()} size="small"/>
        );

        expect(container.querySelector('.floorplan-card--small')).toBeInTheDocument();
    });

    it('does not apply the small size modifier class by default', () => {
        const {container} = render(
            <FloorplanCard floorplan={baseFloorplan} propertyId="verona-park" videoClickHandler={vi.fn()}/>
        );

        expect(container.querySelector('.floorplan-card--small')).not.toBeInTheDocument();
    });

    it('renders the cover image when assets have not been loaded', () => {
        render(<FloorplanCard floorplan={baseFloorplan} propertyId="verona-park" videoClickHandler={vi.fn()}/>);

        const img = screen.getByAltText('cover');
        expect(img).toHaveAttribute('src', expect.stringContaining('/api/assets/abc123/download'));
    });

    it('renders a default image when there is no cover image', () => {
        render(
            <FloorplanCard floorplan={{...baseFloorplan, coverImage: ''}} propertyId="verona-park"
                           videoClickHandler={vi.fn()}/>
        );

        const img = screen.getByAltText('cover');
        expect(img.getAttribute('src')).toContain('img/default.png');
    });

    it('shows the "Available Now" badge when a unit has already moved in', () => {
        const floorplan = {
            ...baseFloorplan,
            units: [{id: '1', rent: 1195, squareFoot: 710, moveInDate: momentToDate(moment().subtract(5, 'days')), availabilityExtensionMonths: null}]
        };
        render(<FloorplanCard floorplan={floorplan} propertyId="verona-park" videoClickHandler={vi.fn()}/>);

        expect(screen.getByText('Available Now')).toBeInTheDocument();
    });

    it('shows the "Featured & Available Now" badge when featured and available', () => {
        const floorplan = {
            ...baseFloorplan,
            featured: true,
            units: [{id: '1', rent: 1195, squareFoot: 710, moveInDate: momentToDate(moment().subtract(5, 'days')), availabilityExtensionMonths: null}]
        };
        render(<FloorplanCard floorplan={floorplan} propertyId="verona-park" videoClickHandler={vi.fn()}/>);

        expect(screen.getByText('Featured & Available Now')).toBeInTheDocument();
    });

    it('shows only the "Featured" badge when featured but not yet available', () => {
        const floorplan = {...baseFloorplan, featured: true};
        render(<FloorplanCard floorplan={floorplan} propertyId="verona-park" videoClickHandler={vi.fn()}/>);

        expect(screen.getByText('Featured')).toBeInTheDocument();
        expect(screen.queryByText('Featured & Available Now')).not.toBeInTheDocument();
    });

    it('renders the 360 tour and video icons and fires the video click handler', async () => {
        const user = userEvent.setup();
        const videoClickHandler = vi.fn();
        render(<FloorplanCard floorplan={baseFloorplan} propertyId="verona-park" videoClickHandler={videoClickHandler}/>);

        await user.click(screen.getByTitle('tour icon'));
        expect(videoClickHandler).toHaveBeenCalledWith({url: baseFloorplan.virtualTourLink, type: 'virtual'});

        await user.click(screen.getByTitle('video icon'));
        expect(videoClickHandler).toHaveBeenCalledWith({url: baseFloorplan.videoTourLink, type: 'video'});
    });

    it('omits the tour/video icons when the links are missing', () => {
        render(
            <FloorplanCard
                floorplan={{...baseFloorplan, virtualTourLink: '', videoTourLink: ''}}
                propertyId="verona-park"
                videoClickHandler={vi.fn()}
            />
        );

        expect(screen.queryByTitle('tour icon')).not.toBeInTheDocument();
        expect(screen.queryByTitle('video icon')).not.toBeInTheDocument();
    });

    it('shows the special offer button when there are web specials, and reveals the offer text on hover', async () => {
        const user = userEvent.setup();
        const floorplan = {...baseFloorplan, webSpecials: ['$250 off your first month']};
        render(<FloorplanCard floorplan={floorplan} propertyId="verona-park" videoClickHandler={vi.fn()}/>);

        expect(screen.getByText('Special Offer')).toBeInTheDocument();
        expect(screen.queryByText('$250 off your first month')).not.toBeInTheDocument();

        const specialOfferButton = screen.getByText('Special Offer').closest('button') as HTMLElement;
        await user.hover(specialOfferButton);
        expect(screen.getByText('$250 off your first month')).toBeInTheDocument();

        await user.unhover(specialOfferButton);
        expect(screen.queryByText('$250 off your first month')).not.toBeInTheDocument();
    });

    it('does not show the special offer button when there are no web specials', () => {
        render(<FloorplanCard floorplan={baseFloorplan} propertyId="verona-park" videoClickHandler={vi.fn()}/>);

        expect(screen.queryByText('Special Offer')).not.toBeInTheDocument();
    });

    it('renders the address as a google maps link when address and zipcode are present', () => {
        render(<FloorplanCard floorplan={baseFloorplan} propertyId="verona-park" videoClickHandler={vi.fn()}/>);

        const addressLink = screen.getByText(/1100 N Walnut St/) as HTMLElement;
        expect(addressLink.closest('a')).toHaveAttribute('href', expect.stringContaining('maps.google.com'));
    });

    it('renders the featured layout with a "Featured Floorplan" label and no address', () => {
        render(<FloorplanCard floorplan={baseFloorplan} propertyId="verona-park" videoClickHandler={vi.fn()} variant="featured"/>);

        expect(screen.getByText('Featured Floorplan')).toBeInTheDocument();
        expect(screen.queryByText(/1100 N Walnut St/)).not.toBeInTheDocument();
    });

    it('loads assets and shows a slider when the load-more button is clicked', async () => {
        const user = userEvent.setup();
        vi.mocked(getAssetsFrom).mockResolvedValueOnce([
            {id: 'asset-1', name: '1', description: '', folderId: 'folder-1', height: 100, width: 100, mimeType: 'image/jpeg'}
        ]);

        render(<FloorplanCard floorplan={baseFloorplan} propertyId="verona-park" videoClickHandler={vi.fn()}/>);

        const loadMoreButton = screen.getByTitle('Navigate Right');
        await user.click(loadMoreButton);

        expect(getAssetsFrom).toHaveBeenCalledWith('folder-1');

        await waitFor(() => {
            expect(screen.getAllByAltText('card').length).toBeGreaterThan(0);
        });
    });

    it('keeps showing the cover image when the floorplan has no photosFolderId', async () => {
        const user = userEvent.setup();
        render(
            <FloorplanCard floorplan={{...baseFloorplan, photosFolderId: ''}} propertyId="verona-park"
                           videoClickHandler={vi.fn()}/>
        );

        const loadMoreButton = screen.getByTitle('Navigate Right');
        await user.click(loadMoreButton);

        expect(getAssetsFrom).not.toHaveBeenCalled();
        await waitFor(() => {
            expect(screen.queryByTitle('Navigate Right')).not.toBeInTheDocument();
        });
        expect(screen.getByAltText('cover')).toBeInTheDocument();
    });
});
