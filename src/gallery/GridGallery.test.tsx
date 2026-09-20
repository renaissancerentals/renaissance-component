import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {GridGallery} from './GridGallery';
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

describe('GridGallery', () => {
    it('renders an image for each asset', () => {
        const assets = [assetFrom('1', 'One'), assetFrom('2', 'Two'), assetFrom('3', 'Three')];
        render(<GridGallery assets={assets} propertyId="verona-park" imageClickedHandler={vi.fn()}/>);

        expect(screen.getByAltText('One')).toBeInTheDocument();
        expect(screen.getByAltText('Two')).toBeInTheDocument();
        expect(screen.getByAltText('Three')).toBeInTheDocument();
    });

    it('uses the fixed image class when there are 3 or fewer assets', () => {
        const assets = [assetFrom('1', 'One'), assetFrom('2', 'Two')];
        const {container} = render(<GridGallery assets={assets} propertyId="verona-park" imageClickedHandler={vi.fn()}/>);

        expect(container.querySelectorAll('.gallery-hero--image-fixed')).toHaveLength(2);
        expect(container.querySelectorAll('.gallery-hero--image')).toHaveLength(0);
    });

    it('uses the standard image class when there are more than 3 assets', () => {
        const assets = [assetFrom('1', 'One'), assetFrom('2', 'Two'), assetFrom('3', 'Three'), assetFrom('4', 'Four')];
        const {container} = render(<GridGallery assets={assets} propertyId="verona-park" imageClickedHandler={vi.fn()}/>);

        expect(container.querySelectorAll('.gallery-hero--image')).toHaveLength(4);
    });

    it('calls imageClickedHandler with the clicked asset', async () => {
        const user = userEvent.setup();
        const imageClickedHandler = vi.fn();
        const asset = assetFrom('1', 'One');
        render(<GridGallery assets={[asset]} propertyId="verona-park" imageClickedHandler={imageClickedHandler}/>);

        await user.click(screen.getByAltText('One'));

        expect(imageClickedHandler).toHaveBeenCalledWith(asset);
    });
});
