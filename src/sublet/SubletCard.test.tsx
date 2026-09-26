import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {SubletCard} from './SubletCard';
import {Sublet} from './data/Sublet';

vi.mock('./services/SubletService', () => ({
    sendMessage: vi.fn()
}));

vi.mock('../asset/service/AssetService', () => ({
    getAssetsFrom: vi.fn().mockReturnValue(new Promise(() => {
    })),
    assetUrlFrom: vi.fn().mockReturnValue('https://example.com/asset.jpg'),
    getAssetUrl: vi.fn().mockReturnValue('https://example.com/cover.jpg')
}));

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
    description: 'A great place &amp; close to campus',
    createdDate: '2026-01-01',
    ...overrides
});

describe('SubletCard', () => {
    it('renders the title, address, bedroom/rent and availability window', () => {
        render(<SubletCard sublet={sublet()}/>);

        expect(screen.getByText('Cozy Room Near Campus')).toBeInTheDocument();
        expect(screen.getByText('123 Main St 47401')).toBeInTheDocument();
        expect(screen.getByText(/1 of 3 bed\(s\) \$1,200\/month/)).toBeInTheDocument();
        expect(screen.getByText('Available from Mar 01, 2026 to Jun 01, 2026')).toBeInTheDocument();
    });

    it('renders the description as-is (decode() only decodes a full single entity token, not embedded entities in prose)', () => {
        render(<SubletCard sublet={sublet()}/>);

        expect(screen.getByText('A great place &amp; close to campus')).toBeInTheDocument();
    });

    it('shows thumbs-up for pets and thumbs-down for utilities when set accordingly', () => {
        render(<SubletCard sublet={sublet({petsAllowed: true, utilitiesIncluded: false})}/>);

        const petsIcon = screen.getByText('(Pets)').closest('.muncher-icon')!.querySelector('path');
        const utilitiesIcon = screen.getByText('(Utilities included)').closest('.muncher-icon')!.querySelector('path');

        // thumbs-up path starts with "M14 9V5", thumbs-down with "M10 15v4"
        expect(petsIcon?.getAttribute('d')).toContain('M14 9V5');
        expect(utilitiesIcon?.getAttribute('d')).toContain('M10 15v4');
    });

    it('builds a google maps link from the address and zipcode', () => {
        render(<SubletCard sublet={sublet()}/>);

        const link = screen.getByRole('link', {name: '123 Main St 47401'});
        expect(link).toHaveAttribute('href', 'https://www.mapquest.com/search/' + encodeURIComponent('123 Main St,47401'));
    });

    it('opens the contact modal when the Contact button is clicked', async () => {
        const user = userEvent.setup();
        const {container} = render(<SubletCard sublet={sublet()}/>);

        expect(container.querySelector('.muncher-modal')).toHaveStyle({transform: 'translateY(-100vh)'});

        await user.click(screen.getByText('Contact'));

        expect(container.querySelector('.muncher-modal')).toHaveStyle({transform: 'translateY(0)'});
    });
});
