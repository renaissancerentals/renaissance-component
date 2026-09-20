import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {AssetModal} from './AssetModal';

describe('AssetModal', () => {
    it('renders the image with the resolved asset url and alt text when shown', () => {
        render(<AssetModal assetUrl="https://example.com/image.jpg" assetTitle="A nice view"
                            showModal={true} setShowModal={vi.fn()} propertyId="verona-park"/>);

        const img = screen.getByAltText('A nice view') as HTMLImageElement;
        expect(img).toBeInTheDocument();
        expect(img.src).toBe('https://example.com/image.jpg');
    });

    it('shows a spinner before the image has loaded', () => {
        const {container} = render(<AssetModal assetUrl="https://example.com/image.jpg" assetTitle="A nice view"
                                                 showModal={true} setShowModal={vi.fn()} propertyId="verona-park"/>);

        expect(container.querySelector('.muncher-spinner, [class*="spinner"]')).toBeTruthy();
    });

    it('hides the spinner once the image fires onLoad', () => {
        render(<AssetModal assetUrl="https://example.com/image.jpg" assetTitle="A nice view"
                            showModal={true} setShowModal={vi.fn()} propertyId="verona-park"/>);

        const img = screen.getByAltText('A nice view');
        img.dispatchEvent(new Event('load'));

        expect(screen.getByAltText('A nice view')).toBeInTheDocument();
    });

    it('does not render an image when there is no assetUrl', () => {
        render(<AssetModal assetUrl={null} assetTitle="A nice view"
                            showModal={true} setShowModal={vi.fn()} propertyId="verona-park"/>);

        expect(screen.queryByAltText('A nice view')).not.toBeInTheDocument();
    });

    it('does not render an image when the modal is not shown', () => {
        render(<AssetModal assetUrl="https://example.com/image.jpg" assetTitle="A nice view"
                            showModal={false} setShowModal={vi.fn()} propertyId="verona-park"/>);

        expect(screen.queryByAltText('A nice view')).not.toBeInTheDocument();
    });

    it('calls setShowModal(false) when the close icon is clicked', async () => {
        const setShowModal = vi.fn();
        const {container} = render(<AssetModal assetUrl="https://example.com/image.jpg" assetTitle="A nice view"
                                                 showModal={true} setShowModal={setShowModal} propertyId="verona-park"/>);

        const closeIcon = container.querySelector('.close') as HTMLElement;
        await userEvent.click(closeIcon);

        expect(setShowModal).toHaveBeenCalledWith(false);
    });
});
