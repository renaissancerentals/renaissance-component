import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {GridGalleryMobile} from './GridGalleryMobile';
import {Asset} from '../asset/data/Asset';
import {Address} from '../floorplan/service/FloorplanService';
import {WebSpecial} from '../floorplan/data/Floorplan';
import {TourType} from './GridGalleryCover';

const assetFrom = (id: string, name: string): Asset => ({
    id,
    name,
    description: '',
    folderId: 'folder-1',
    height: 1382,
    width: 2074,
    mimeType: 'image/jpeg'
});

const assets: Asset[] = [
    assetFrom('1', 'One'),
    assetFrom('2', 'Two'),
    assetFrom('3', 'Three')
];

const address: Address = {address: '1100 N Walnut St', city: 'Bloomington', state: 'IN', zipcode: '47404'};

describe('GridGalleryMobile', () => {
    it('renders every asset image in the slider', () => {
        render(
            <GridGalleryMobile
                assets={assets}
                address={address}
                toursCount={0}
                webSpecials={[]}
                setCurrentView={vi.fn()}
                imageClickedHandler={vi.fn()}
                propertyId="verona-park"
                isAvailableNow={false}
            />
        );

        expect(screen.getByAltText('One')).toBeInTheDocument();
        expect(screen.getByAltText('Two')).toBeInTheDocument();
        expect(screen.getByAltText('Three')).toBeInTheDocument();
    });

    it('shows the "Available Now" badge only alongside the first asset', () => {
        render(
            <GridGalleryMobile
                assets={assets}
                address={address}
                toursCount={0}
                webSpecials={[]}
                setCurrentView={vi.fn()}
                imageClickedHandler={vi.fn()}
                propertyId="verona-park"
                isAvailableNow={true}
            />
        );

        expect(screen.getByText('Available Now')).toBeInTheDocument();
    });

    it('does not show the "Available Now" badge when isAvailableNow is false', () => {
        render(
            <GridGalleryMobile
                assets={assets}
                address={address}
                toursCount={0}
                webSpecials={[]}
                setCurrentView={vi.fn()}
                imageClickedHandler={vi.fn()}
                propertyId="verona-park"
                isAvailableNow={false}
            />
        );

        expect(screen.queryByText('Available Now')).not.toBeInTheDocument();
    });

    it('shows a special offer button when webSpecials are given', () => {
        const webSpecials: WebSpecial[] = [{description: '$250 off first month', startDate: '', endDate: ''}];
        render(
            <GridGalleryMobile
                assets={assets}
                address={address}
                toursCount={0}
                webSpecials={webSpecials}
                setCurrentView={vi.fn()}
                imageClickedHandler={vi.fn()}
                propertyId="verona-park"
                isAvailableNow={false}
            />
        );

        expect(screen.getByText('Special Offer')).toBeInTheDocument();
    });

    it('reveals the special offer description on mouse enter and hides it on mouse leave', async () => {
        const user = userEvent.setup();
        const webSpecials: WebSpecial[] = [{description: '$250 off first month', startDate: '', endDate: ''}];
        render(
            <GridGalleryMobile
                assets={assets}
                address={address}
                toursCount={0}
                webSpecials={webSpecials}
                setCurrentView={vi.fn()}
                imageClickedHandler={vi.fn()}
                propertyId="verona-park"
                isAvailableNow={false}
            />
        );

        expect(screen.queryByText('$250 off first month')).not.toBeInTheDocument();

        await user.hover(screen.getByText('Special Offer'));
        expect(screen.getByText('$250 off first month')).toBeInTheDocument();

        await user.unhover(screen.getByText('Special Offer'));
        expect(screen.queryByText('$250 off first month')).not.toBeInTheDocument();
    });

    it('calls imageClickedHandler with the clicked asset', async () => {
        const user = userEvent.setup();
        const imageClickedHandler = vi.fn();
        render(
            <GridGalleryMobile
                assets={assets}
                address={address}
                toursCount={0}
                webSpecials={[]}
                setCurrentView={vi.fn()}
                imageClickedHandler={imageClickedHandler}
                propertyId="verona-park"
                isAvailableNow={false}
            />
        );

        await user.click(screen.getByAltText('Two'));

        expect(imageClickedHandler).toHaveBeenCalledWith(assets[1]);
    });

    it('renders a virtual tour card first when virtualTour is given, calling setCurrentView("Virtual Tour")', async () => {
        const user = userEvent.setup();
        const setCurrentView = vi.fn();
        render(
            <GridGalleryMobile
                assets={assets}
                address={address}
                toursCount={1}
                virtualTour="https://example.com/vt"
                webSpecials={[]}
                setCurrentView={setCurrentView}
                imageClickedHandler={vi.fn()}
                propertyId="verona-park"
                isAvailableNow={false}
            />
        );

        expect(screen.getByText('Virtual Tour')).toBeInTheDocument();

        await user.click(screen.getByText('Virtual Tour'));

        expect(setCurrentView).toHaveBeenCalledWith('Virtual Tour');
    });

    it('renders video tour cards for tours when there is no virtualTour, calling setCurrentView("Video Tour")', async () => {
        const user = userEvent.setup();
        const setCurrentView = vi.fn();
        render(
            <GridGalleryMobile
                assets={assets}
                address={address}
                toursCount={2}
                webSpecials={[]}
                setCurrentView={setCurrentView}
                imageClickedHandler={vi.fn()}
                propertyId="verona-park"
                isAvailableNow={false}
            />
        );

        const videoTourLabels = screen.getAllByText('Video Tour');
        expect(videoTourLabels).toHaveLength(2);

        await user.click(videoTourLabels[0]);

        expect(setCurrentView).toHaveBeenCalledWith('Video Tour');
    });

    it('renders a map section for the given address', () => {
        const {container} = render(
            <GridGalleryMobile
                assets={assets}
                address={address}
                toursCount={0}
                webSpecials={[]}
                setCurrentView={vi.fn()}
                imageClickedHandler={vi.fn()}
                propertyId="verona-park"
                isAvailableNow={false}
            />
        );

        expect(container.querySelector('.section-map')).toBeInTheDocument();
    });
});
