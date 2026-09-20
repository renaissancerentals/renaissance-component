import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Gallery} from './Gallery';
import {Asset} from '../asset/data/Asset';

const assetFrom = (id: string, name: string): Asset => ({
    id,
    name,
    description: '',
    folderId: 'folder-1',
    height: 1382,
    width: 2074,
    mimeType: 'image/jpeg'
});

const images: Asset[] = [assetFrom('1', 'One'), assetFrom('2', 'Two'), assetFrom('3', 'Three')];

describe('Gallery', () => {
    it('renders a simple image for each image in simple mode', () => {
        const {container} = render(<Gallery type="simple" images={images} isLoading={false} propertyId="verona-park"/>);

        expect(container.querySelectorAll('.gallery--image')).toHaveLength(3);
    });

    it('renders skeleton placeholders while loading in simple mode', () => {
        const {container} = render(<Gallery type="simple" images={[]} isLoading={true} propertyId="verona-park"/>);

        expect(container.querySelectorAll('.react-loading-skeleton')).toHaveLength(6);
    });

    it('renders an ImageCard for each image in grid mode', () => {
        const {container} = render(<Gallery type="grid" images={images} isLoading={false} propertyId="verona-park"/>);

        expect(container.querySelectorAll('.image-card')).toHaveLength(3);
    });

    it('renders skeleton placeholders while loading in grid mode', () => {
        const {container} = render(<Gallery type="grid" images={[]} isLoading={true} propertyId="verona-park"/>);

        expect(container.querySelectorAll('.react-loading-skeleton')).toHaveLength(20);
    });

    it('opens the modal with the clicked image when an image is clicked in simple mode', async () => {
        const user = userEvent.setup();
        render(<Gallery type="simple" images={images} isLoading={false} propertyId="verona-park"/>);

        await user.click(screen.getByAltText('One'));

        const enlarged = screen.getAllByAltText('One');
        expect(enlarged.length).toBeGreaterThan(1);
        expect(screen.getByText('One')).toBeInTheDocument();
    });

    it('does not show the image name when showName is false', async () => {
        const user = userEvent.setup();
        render(<Gallery type="simple" images={images} isLoading={false} propertyId="verona-park" showName={false}/>);

        await user.click(screen.getByAltText('One'));

        expect(screen.queryByText('One')).not.toBeInTheDocument();
    });

    it('opens the modal with the clicked image when an ImageCard is clicked in grid mode', async () => {
        const user = userEvent.setup();
        render(<Gallery type="grid" images={images} isLoading={false} propertyId="verona-park"/>);

        await user.click(screen.getAllByAltText('Two')[0]);

        expect(screen.getAllByAltText('Two').length).toBeGreaterThan(1);
    });

    it('closes the modal image when the close icon is clicked', async () => {
        const user = userEvent.setup();
        render(<Gallery type="simple" images={images} isLoading={false} propertyId="verona-park"/>);

        await user.click(screen.getByAltText('One'));
        expect(screen.getAllByAltText('One').length).toBeGreaterThan(1);

        const closeIcon = document.querySelector('.close') as Element;
        await user.click(closeIcon);

        expect(screen.getAllByAltText('One')).toHaveLength(1);
    });

    it('advances to the next image within allImages when the right arrow is clicked', async () => {
        const user = userEvent.setup();
        render(<Gallery type="simple" images={images} allImages={images} isLoading={false} propertyId="verona-park"/>);

        await user.click(screen.getByAltText('One'));
        const rightArrow = document.querySelector('.right') as Element;
        await user.click(rightArrow);

        expect(screen.getAllByAltText('Two').length).toBeGreaterThan(1);
    });

    it('wraps to the last image when the left arrow is clicked at the first image', async () => {
        const user = userEvent.setup();
        render(<Gallery type="simple" images={images} isLoading={false} propertyId="verona-park"/>);

        await user.click(screen.getByAltText('One'));
        const leftArrow = document.querySelector('.left') as Element;
        await user.click(leftArrow);

        expect(screen.getAllByAltText('Three').length).toBeGreaterThan(1);
    });
});
