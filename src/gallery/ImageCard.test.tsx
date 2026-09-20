import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ImageCard} from './ImageCard';
import {Asset} from '../asset/data/Asset';

const asset: Asset = {
    id: 'asset-1',
    name: 'Living Room',
    description: '',
    folderId: 'folder-1',
    height: 1382,
    width: 2074,
    mimeType: 'image/jpeg'
};

describe('ImageCard', () => {
    it('renders the image with the asset name as alt text', () => {
        render(<ImageCard image={asset} onClick={vi.fn()} propertyId="verona-park"/>);

        const img = screen.getByAltText('Living Room') as HTMLImageElement;
        expect(img).toBeInTheDocument();
        expect(img.src).toContain('api/assets/asset-1/download');
    });

    it('renders the asset name in the footer', () => {
        render(<ImageCard image={asset} onClick={vi.fn()} propertyId="verona-park"/>);

        expect(screen.getByText('Living Room')).toBeInTheDocument();
    });

    it('calls onClick when the card is clicked', async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        const {container} = render(<ImageCard image={asset} onClick={onClick} propertyId="verona-park"/>);

        await user.click(container.querySelector('.image-card') as Element);

        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
