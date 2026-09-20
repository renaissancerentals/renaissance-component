import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {UnitCard} from './UnitCard';
import {UnitCardData} from '../data/Unit';
import {FloorplanStyle} from '../../floorplan/data/Floorplan';
import {toUSD} from '../../utils/Utils';
import {getAssetsFrom} from '../../asset/service/AssetService';

vi.mock('../../asset/service/AssetService', () => ({
    getAssetsFrom: vi.fn(),
    getAssetUrl: vi.fn((url: string) => url),
    assetUrlFrom: vi.fn((id: string) => `asset-url/${id}`)
}));

const unit = (overrides: Partial<UnitCardData> = {}): UnitCardData => ({
    id: '3809-315',
    rent: 1000,
    squareFoot: 1000,
    moveInDate: '2020-01-01',
    availabilityExtensionMonths: null,
    floorplanId: 'barcelona',
    floorplanName: 'Barcelona',
    bedroom: 1,
    bathroom: 1.5,
    coverImage: 'https://drive.google.com/uc?id=abc&export=download',
    featured: false,
    style: FloorplanStyle.APARTMENT,
    specialRent: 0,
    specialRentStartDate: '',
    specialRentEndDate: '',
    address: '1100 N Walnut St',
    zipcode: '47404',
    virtualTourLink: '',
    videoTourLink: '',
    photosFolderId: '',
    webSpecials: [],
    ...overrides
});

describe('UnitCard', () => {
    it('renders the floorplan name, id, bed/bath and square footage', () => {
        render(<UnitCard unit={unit()} propertyId="verona-park" videoClickHandler={vi.fn()}/>);

        expect(screen.getByText('Barcelona')).toBeInTheDocument();
        expect(screen.getByText('(3809-315)')).toBeInTheDocument();
        expect(screen.getByText('1 bed, 1.5 bath')).toBeInTheDocument();
        expect(screen.getByText('1000 sq.')).toBeInTheDocument();
    });

    it('renders the rent price', () => {
        render(<UnitCard unit={unit({rent: 1500})} propertyId="verona-park" videoClickHandler={vi.fn()}/>);

        expect(screen.getByText(toUSD(1500))).toBeInTheDocument();
    });

    it('applies the small size modifier class when size is small', () => {
        const {container} = render(<UnitCard unit={unit()} size="small" propertyId="verona-park"
                                               videoClickHandler={vi.fn()}/>);

        expect(container.querySelector('.unit-card--small')).toBeInTheDocument();
    });

    it('does not apply the small size modifier class by default', () => {
        const {container} = render(<UnitCard unit={unit()} propertyId="verona-park" videoClickHandler={vi.fn()}/>);

        expect(container.querySelector('.unit-card--small')).not.toBeInTheDocument();
    });

    it('links to the unit detail page', () => {
        const {container} = render(<UnitCard unit={unit()} propertyId="verona-park" videoClickHandler={vi.fn()}/>);

        const link = container.querySelector('a[href="/units/3809-315"]');
        expect(link).toBeInTheDocument();
    });

    it('shows both featured and available badges when the unit is featured and available', () => {
        render(<UnitCard unit={unit({featured: true, moveInDate: '2000-01-01'})} propertyId="verona-park"
                          videoClickHandler={vi.fn()}/>);

        expect(screen.getByText('Featured & Available Now')).toBeInTheDocument();
    });

    it('shows only the featured badge when featured but not yet available', () => {
        render(<UnitCard unit={unit({featured: true, moveInDate: '2099-01-01'})} propertyId="verona-park"
                          videoClickHandler={vi.fn()}/>);

        expect(screen.getByText('Featured')).toBeInTheDocument();
        expect(screen.queryByText('Featured & Available Now')).not.toBeInTheDocument();
    });

    it('shows only the available badge when available but not featured', () => {
        render(<UnitCard unit={unit({featured: false, moveInDate: '2000-01-01'})} propertyId="verona-park"
                          videoClickHandler={vi.fn()}/>);

        expect(screen.getByText('Available Now')).toBeInTheDocument();
    });

    it('shows no badge when neither featured nor available', () => {
        render(<UnitCard unit={unit({featured: false, moveInDate: '2099-01-01'})} propertyId="verona-park"
                          videoClickHandler={vi.fn()}/>);

        expect(screen.queryByText('Featured')).not.toBeInTheDocument();
        expect(screen.queryByText('Available Now')).not.toBeInTheDocument();
    });

    it('renders the special offer button when web specials are present', () => {
        const {container} = render(<UnitCard unit={unit({webSpecials: ['$250 off']})} propertyId="verona-park"
                                               videoClickHandler={vi.fn()}/>);

        expect(screen.getByText('Special Offer')).toBeInTheDocument();
        expect(container.querySelector('.special-offer-button')).toBeInTheDocument();
    });

    it('does not render the special offer button when there are no web specials', () => {
        render(<UnitCard unit={unit({webSpecials: []})} propertyId="verona-park" videoClickHandler={vi.fn()}/>);

        expect(screen.queryByText('Special Offer')).not.toBeInTheDocument();
    });

    it('shows the special offer text on hover and hides it on mouse leave', async () => {
        const user = userEvent.setup();
        render(<UnitCard unit={unit({webSpecials: ['$250 off your first month']})} propertyId="verona-park"
                          videoClickHandler={vi.fn()}/>);

        const specialOfferButton = screen.getByText('Special Offer');
        await user.hover(specialOfferButton);
        expect(screen.getByText('$250 off your first month')).toBeInTheDocument();

        await user.unhover(specialOfferButton);
        expect(screen.queryByText('$250 off your first month')).not.toBeInTheDocument();
    });

    it('renders a virtual tour icon and calls videoClickHandler with the virtual tour link when clicked', async () => {
        const videoClickHandler = vi.fn();
        const user = userEvent.setup();
        render(<UnitCard unit={unit({virtualTourLink: 'https://tour.example.com'})} propertyId="verona-park"
                          videoClickHandler={videoClickHandler}/>);

        await user.click(screen.getByTitle('tour icon'));

        expect(videoClickHandler).toHaveBeenCalledWith({url: 'https://tour.example.com', type: 'virtual'});
    });

    it('does not render a virtual tour icon when there is no virtual tour link', () => {
        render(<UnitCard unit={unit({virtualTourLink: ''})} propertyId="verona-park" videoClickHandler={vi.fn()}/>);

        expect(screen.queryByTitle('tour icon')).not.toBeInTheDocument();
    });

    it('renders a video tour icon and calls videoClickHandler with the video tour link when clicked', async () => {
        const videoClickHandler = vi.fn();
        const user = userEvent.setup();
        render(<UnitCard unit={unit({videoTourLink: 'https://video.example.com'})} propertyId="verona-park"
                          videoClickHandler={videoClickHandler}/>);

        await user.click(screen.getByTitle('video icon'));

        expect(videoClickHandler).toHaveBeenCalledWith({url: 'https://video.example.com', type: 'video'});
    });

    it('does not render a video tour icon when there is no video tour link', () => {
        render(<UnitCard unit={unit({videoTourLink: ''})} propertyId="verona-park" videoClickHandler={vi.fn()}/>);

        expect(screen.queryByTitle('video icon')).not.toBeInTheDocument();
    });

    it('renders a map link when address and zipcode are present', () => {
        const {container} = render(<UnitCard unit={unit({address: '1100 N Walnut St', zipcode: '47404'})}
                                               propertyId="verona-park" videoClickHandler={vi.fn()}/>);

        expect(container.querySelector('.icon-map a')).toBeInTheDocument();
    });

    it('does not render a map link when address is missing', () => {
        const {container} = render(<UnitCard unit={unit({address: '', zipcode: '47404'})} propertyId="verona-park"
                                               videoClickHandler={vi.fn()}/>);

        expect(container.querySelector('.icon-map')).not.toBeInTheDocument();
    });

    it('loads and renders assets from the photos folder when the navigate button is clicked', async () => {
        vi.mocked(getAssetsFrom).mockResolvedValueOnce([
            {id: 'asset-1', name: '1'} as any,
            {id: 'asset-2', name: '2'} as any
        ]);
        const user = userEvent.setup();
        const {container} = render(<UnitCard unit={unit({photosFolderId: 'folder-1'})} propertyId="verona-park"
                                               videoClickHandler={vi.fn()}/>);

        const navigateButton = container.querySelector('button');
        expect(navigateButton).toBeInTheDocument();
        await user.click(navigateButton!);

        expect(getAssetsFrom).toHaveBeenCalledWith('folder-1');
        const images = await screen.findAllByAltText('card');
        expect(images).toHaveLength(2);
    });

    it('renders the default cover image when there is no cover image and no photos folder', () => {
        render(<UnitCard unit={unit({coverImage: '', photosFolderId: ''})} propertyId="verona-park"
                          videoClickHandler={vi.fn()}/>);

        expect(screen.getByAltText('cover')).toBeInTheDocument();
    });
});
