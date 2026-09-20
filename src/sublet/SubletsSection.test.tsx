import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import {SubletsSection} from './SubletsSection';
import {getSublets} from './services/SubletService';
import {Sublet} from './data/Sublet';

vi.mock('./services/SubletService', () => ({
    getSublets: vi.fn()
}));

vi.mock('../asset/service/AssetService', () => ({
    getAssetsFrom: vi.fn().mockReturnValue(new Promise(() => {
    })),
    assetUrlFrom: vi.fn().mockReturnValue('https://example.com/asset.jpg'),
    getAssetUrl: vi.fn().mockReturnValue('https://example.com/cover.jpg')
}));

const mockedGetSublets = vi.mocked(getSublets);

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

describe('SubletsSection', () => {
    it('shows a loading indicator while sublets are being fetched', () => {
        mockedGetSublets.mockReturnValue(new Promise(() => {
        }));

        render(<SubletsSection linkToSubletCreatePage="/sublets/new"/>);

        expect(screen.getByText('loading...')).toBeInTheDocument();
    });

    it('renders an "Add Sublet" link pointing at the create page', () => {
        mockedGetSublets.mockReturnValue(new Promise(() => {
        }));

        render(<SubletsSection linkToSubletCreatePage="/sublets/new"/>);

        expect(screen.getByRole('link', {name: 'Add Sublet'})).toHaveAttribute('href', '/sublets/new');
    });

    it('renders a card for each sublet once loaded', async () => {
        mockedGetSublets.mockResolvedValue([
            sublet({assetKey: 'a1', title: 'First Sublet'}),
            sublet({assetKey: 'a2', title: 'Second Sublet'})
        ]);

        render(<SubletsSection linkToSubletCreatePage="/sublets/new"/>);

        expect(await screen.findByText('First Sublet')).toBeInTheDocument();
        expect(screen.getByText('Second Sublet')).toBeInTheDocument();
        expect(screen.queryByText('loading...')).not.toBeInTheDocument();
    });

    it('stops loading and renders nothing when there are no sublets', async () => {
        mockedGetSublets.mockResolvedValue([]);

        render(<SubletsSection linkToSubletCreatePage="/sublets/new"/>);

        await screen.findByRole('link', {name: 'Add Sublet'});
        expect(screen.queryByText('loading...')).not.toBeInTheDocument();
    });
});
