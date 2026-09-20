import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {SubletImage} from './SubletImage';
import {Sublet} from './data/Sublet';
import {getAssetsFrom} from '../asset/service/AssetService';

vi.mock('../asset/service/AssetService', () => ({
    getAssetsFrom: vi.fn(),
    assetUrlFrom: vi.fn((id: string) => `https://example.com/assets/${id}.jpg`),
    getAssetUrl: vi.fn((cover: string) => `https://example.com/cover/${cover}`)
}));

const mockedGetAssetsFrom = vi.mocked(getAssetsFrom);

const sublet = (overrides: Partial<Sublet> = {}): Sublet => ({
    assetKey: 'asset-1',
    email: 'jane@example.com',
    firstName: 'Jane',
    lastName: 'Doe',
    bedroom: '3',
    availableBedrooms: '1',
    availableFrom: '2026-03-01',
    availableTo: '2026-06-01',
    rent: '1200',
    petsAllowed: true,
    utilitiesIncluded: false,
    address: '123 Main St',
    zipcode: '47401',
    subletFolderId: '',
    photosFolderId: '',
    coverImage: 'cover.jpg',
    title: 'Cozy Room Near Campus',
    description: 'A great place',
    createdDate: '2026-01-01',
    ...overrides
});

describe('SubletImage', () => {
    it('renders the cover image and a navigate button before any assets are loaded', () => {
        render(<SubletImage sublet={sublet({photosFolderId: 'folder-1'})}/>);

        const img = screen.getByAltText('sublet cover') as HTMLImageElement;
        expect(img.src).toBe('https://example.com/cover/cover.jpg');
        expect(screen.getByTitle('Navigate Right')).toBeInTheDocument();
    });

    it('loads and renders slider images from the photos folder when the navigate button is clicked', async () => {
        const user = userEvent.setup();
        mockedGetAssetsFrom.mockResolvedValue([
            {id: 'a1', name: '0'} as any,
            {id: 'a2', name: '1'} as any
        ]);
        render(<SubletImage sublet={sublet({photosFolderId: 'folder-1'})}/>);

        await user.click(screen.getByTitle('Navigate Right'));

        expect(await screen.findByAltText('sublet image 01')).toBeInTheDocument();
        expect(screen.getByAltText('sublet image 11')).toBeInTheDocument();
        expect(mockedGetAssetsFrom).toHaveBeenCalledWith('folder-1');
        expect(screen.queryByAltText('sublet cover')).not.toBeInTheDocument();
    });

    it('falls back to the cover image when there is no photos folder id, without fetching assets', async () => {
        const user = userEvent.setup();
        render(<SubletImage sublet={sublet({photosFolderId: ''})}/>);

        await user.click(screen.getByTitle('Navigate Right'));

        expect(mockedGetAssetsFrom).not.toHaveBeenCalled();
        expect(screen.getByAltText('sublet cover')).toBeInTheDocument();
        expect(screen.queryByTitle('Navigate Right')).not.toBeInTheDocument();
    });

    it('falls back to the cover image when loading the assets fails', async () => {
        const user = userEvent.setup();
        mockedGetAssetsFrom.mockRejectedValue(new Error('invalid folderId'));
        render(<SubletImage sublet={sublet({photosFolderId: 'bad-folder'})}/>);

        await user.click(screen.getByTitle('Navigate Right'));

        expect(await screen.findByAltText('sublet cover')).toBeInTheDocument();
    });
});
