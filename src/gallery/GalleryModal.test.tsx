import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {GalleryModal} from './GalleryModal';
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

const assets: Asset[] = [assetFrom('1', 'One'), assetFrom('2', 'Two'), assetFrom('3', 'Three')];

describe('GalleryModal', () => {
    it('renders nothing visible when the modal is closed', () => {
        render(
            <GalleryModal
                assets={assets}
                assetIndex={0}
                setAssetIndex={vi.fn()}
                assetInFocus={assets[0]}
                setAssetInFocus={vi.fn()}
                showModal={false}
                modalCloseHandler={vi.fn()}
                propertyId="verona-park"
            />
        );

        expect(screen.queryByAltText('One')).not.toBeInTheDocument();
    });

    it('renders the focused image when the modal is open', () => {
        render(
            <GalleryModal
                assets={assets}
                assetIndex={0}
                setAssetIndex={vi.fn()}
                assetInFocus={assets[0]}
                setAssetInFocus={vi.fn()}
                showModal={true}
                modalCloseHandler={vi.fn()}
                propertyId="verona-park"
            />
        );

        const img = screen.getByAltText('One') as HTMLImageElement;
        expect(img).toBeInTheDocument();
        expect(img.src).toContain('api/assets/1/download');
    });

    it('shows left/right navigation arrows when there is more than one asset', () => {
        const {container} = render(
            <GalleryModal
                assets={assets}
                assetIndex={0}
                setAssetIndex={vi.fn()}
                assetInFocus={assets[0]}
                setAssetInFocus={vi.fn()}
                showModal={true}
                modalCloseHandler={vi.fn()}
                propertyId="verona-park"
            />
        );

        expect(container.querySelector('.left')).toBeInTheDocument();
        expect(container.querySelector('.right')).toBeInTheDocument();
    });

    it('hides navigation arrows when there is only one asset', () => {
        const {container} = render(
            <GalleryModal
                assets={[assets[0]]}
                assetIndex={0}
                setAssetIndex={vi.fn()}
                assetInFocus={assets[0]}
                setAssetInFocus={vi.fn()}
                showModal={true}
                modalCloseHandler={vi.fn()}
                propertyId="verona-park"
            />
        );

        expect(container.querySelector('.left')).not.toBeInTheDocument();
        expect(container.querySelector('.right')).not.toBeInTheDocument();
    });

    it('advances to the next asset when the right arrow is clicked', async () => {
        const user = userEvent.setup();
        const setAssetIndex = vi.fn();
        const setAssetInFocus = vi.fn();
        const {container} = render(
            <GalleryModal
                assets={assets}
                assetIndex={0}
                setAssetIndex={setAssetIndex}
                assetInFocus={assets[0]}
                setAssetInFocus={setAssetInFocus}
                showModal={true}
                modalCloseHandler={vi.fn()}
                propertyId="verona-park"
            />
        );

        await user.click(container.querySelector('.right') as Element);

        expect(setAssetIndex).toHaveBeenCalledWith(1);
        expect(setAssetInFocus).toHaveBeenCalledWith(assets[1]);
    });

    it('wraps to the last asset when the left arrow is clicked at index 0', async () => {
        const user = userEvent.setup();
        const setAssetIndex = vi.fn();
        const setAssetInFocus = vi.fn();
        const {container} = render(
            <GalleryModal
                assets={assets}
                assetIndex={0}
                setAssetIndex={setAssetIndex}
                assetInFocus={assets[0]}
                setAssetInFocus={setAssetInFocus}
                showModal={true}
                modalCloseHandler={vi.fn()}
                propertyId="verona-park"
            />
        );

        await user.click(container.querySelector('.left') as Element);

        expect(setAssetIndex).toHaveBeenCalledWith(2);
        expect(setAssetInFocus).toHaveBeenCalledWith(assets[2]);
    });

    it('wraps to the first asset when the right arrow is clicked at the last index', async () => {
        const user = userEvent.setup();
        const setAssetIndex = vi.fn();
        const setAssetInFocus = vi.fn();
        const {container} = render(
            <GalleryModal
                assets={assets}
                assetIndex={2}
                setAssetIndex={setAssetIndex}
                assetInFocus={assets[2]}
                setAssetInFocus={setAssetInFocus}
                showModal={true}
                modalCloseHandler={vi.fn()}
                propertyId="verona-park"
            />
        );

        await user.click(container.querySelector('.right') as Element);

        expect(setAssetIndex).toHaveBeenCalledWith(0);
        expect(setAssetInFocus).toHaveBeenCalledWith(assets[0]);
    });

    it('calls modalCloseHandler when the close icon is clicked', async () => {
        const user = userEvent.setup();
        const modalCloseHandler = vi.fn();
        const {container} = render(
            <GalleryModal
                assets={assets}
                assetIndex={0}
                setAssetIndex={vi.fn()}
                assetInFocus={assets[0]}
                setAssetInFocus={vi.fn()}
                showModal={true}
                modalCloseHandler={modalCloseHandler}
                propertyId="verona-park"
            />
        );

        await user.click(container.querySelector('.close') as Element);

        expect(modalCloseHandler).toHaveBeenCalledTimes(1);
    });
});
