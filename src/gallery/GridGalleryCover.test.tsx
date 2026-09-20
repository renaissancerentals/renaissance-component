import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {GridGalleryCover} from './GridGalleryCover';
import {Asset} from '../asset/data/Asset';
import {Address} from '../floorplan/service/FloorplanService';
import {WebSpecial} from '../floorplan/data/Floorplan';

const assetFrom = (id: string, name: string): Asset => ({
    id,
    name,
    description: '',
    folderId: 'folder-1',
    height: 1382,
    width: 2074,
    mimeType: 'image/jpeg'
});

const assets: Asset[] = [assetFrom('2', 'Two'), assetFrom('3', 'Three')];
const heroImage: Asset = assetFrom('1', 'One');
const address: Address = {address: '1100 N Walnut St', city: 'Bloomington', state: 'IN', zipcode: '47404'};

describe('GridGalleryCover', () => {
    it('renders the hero image and additional assets when showOnlyHeroImage is not set', () => {
        render(
            <GridGalleryCover
                assets={assets}
                heroImage={heroImage}
                webSpecials={[]}
                isAvailableNow={false}
                address={address}
                propertyId="verona-park"
                imageClickedHandler={vi.fn()}
                setCurrentView={vi.fn()}
            />
        );

        expect(screen.getByAltText('One')).toBeInTheDocument();
        expect(screen.getByAltText('Two')).toBeInTheDocument();
        expect(screen.getByAltText('Three')).toBeInTheDocument();
    });

    it('renders only the hero image when showOnlyHeroImage is true', () => {
        render(
            <GridGalleryCover
                assets={assets}
                heroImage={heroImage}
                webSpecials={[]}
                isAvailableNow={false}
                address={address}
                propertyId="verona-park"
                imageClickedHandler={vi.fn()}
                setCurrentView={vi.fn()}
                showOnlyHeroImage={true}
            />
        );

        expect(screen.getByAltText('One')).toBeInTheDocument();
        expect(screen.queryByAltText('Two')).not.toBeInTheDocument();
        expect(screen.queryByAltText('Three')).not.toBeInTheDocument();
    });

    it('shows the "Available Now" badge when isAvailableNow is true', () => {
        render(
            <GridGalleryCover
                assets={assets}
                heroImage={heroImage}
                webSpecials={[]}
                isAvailableNow={true}
                address={address}
                propertyId="verona-park"
                imageClickedHandler={vi.fn()}
                setCurrentView={vi.fn()}
            />
        );

        expect(screen.getByText('Available Now')).toBeInTheDocument();
    });

    it('does not show the "Available Now" badge when isAvailableNow is false', () => {
        render(
            <GridGalleryCover
                assets={assets}
                heroImage={heroImage}
                webSpecials={[]}
                isAvailableNow={false}
                address={address}
                propertyId="verona-park"
                imageClickedHandler={vi.fn()}
                setCurrentView={vi.fn()}
            />
        );

        expect(screen.queryByText('Available Now')).not.toBeInTheDocument();
    });

    it('shows the special offer description when webSpecials are given', () => {
        const webSpecials: WebSpecial[] = [{description: '$250 off first month', startDate: '', endDate: ''}];
        render(
            <GridGalleryCover
                assets={assets}
                heroImage={heroImage}
                webSpecials={webSpecials}
                isAvailableNow={false}
                address={address}
                propertyId="verona-park"
                imageClickedHandler={vi.fn()}
                setCurrentView={vi.fn()}
            />
        );

        expect(screen.getByText('$250 off first month')).toBeInTheDocument();
    });

    it('renders a virtual tour card when virtualTourImageBackground is given', () => {
        render(
            <GridGalleryCover
                assets={assets}
                heroImage={heroImage}
                webSpecials={[]}
                isAvailableNow={false}
                address={address}
                propertyId="verona-park"
                imageClickedHandler={vi.fn()}
                setCurrentView={vi.fn()}
                virtualTourImageBackground="https://example.com/vt.jpg"
            />
        );

        expect(screen.getByText('Virtual Tour')).toBeInTheDocument();
    });

    it('renders a video tour card when videoTourImageBackground is given', () => {
        render(
            <GridGalleryCover
                assets={assets}
                heroImage={heroImage}
                webSpecials={[]}
                isAvailableNow={false}
                address={address}
                propertyId="verona-park"
                imageClickedHandler={vi.fn()}
                setCurrentView={vi.fn()}
                videoTourImageBackground="https://example.com/video.jpg"
            />
        );

        expect(screen.getByText('Video Tour')).toBeInTheDocument();
    });

    it('calls imageClickedHandler with the hero image when the hero image is clicked', async () => {
        const user = userEvent.setup();
        const imageClickedHandler = vi.fn();
        render(
            <GridGalleryCover
                assets={assets}
                heroImage={heroImage}
                webSpecials={[]}
                isAvailableNow={false}
                address={address}
                propertyId="verona-park"
                imageClickedHandler={imageClickedHandler}
                setCurrentView={vi.fn()}
            />
        );

        await user.click(screen.getByAltText('One'));

        expect(imageClickedHandler).toHaveBeenCalledWith(heroImage);
    });

    it('calls setCurrentView with "Virtual Tour" when the virtual tour card is clicked', async () => {
        const user = userEvent.setup();
        const setCurrentView = vi.fn();
        render(
            <GridGalleryCover
                assets={assets}
                heroImage={heroImage}
                webSpecials={[]}
                isAvailableNow={false}
                address={address}
                propertyId="verona-park"
                imageClickedHandler={vi.fn()}
                setCurrentView={setCurrentView}
                virtualTourImageBackground="https://example.com/vt.jpg"
            />
        );

        await user.click(screen.getByText('Virtual Tour'));

        expect(setCurrentView).toHaveBeenCalledWith('Virtual Tour');
    });

    it('calls setCurrentView with "Video Tour" when the video tour card is clicked', async () => {
        const user = userEvent.setup();
        const setCurrentView = vi.fn();
        render(
            <GridGalleryCover
                assets={assets}
                heroImage={heroImage}
                webSpecials={[]}
                isAvailableNow={false}
                address={address}
                propertyId="verona-park"
                imageClickedHandler={vi.fn()}
                setCurrentView={setCurrentView}
                videoTourImageBackground="https://example.com/video.jpg"
            />
        );

        await user.click(screen.getByText('Video Tour'));

        expect(setCurrentView).toHaveBeenCalledWith('Video Tour');
    });
});
