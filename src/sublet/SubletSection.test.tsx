import {describe, expect, it, vi} from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {NEW_SUBLET, SubletSection} from './SubletSection';
import {deleteSublet, getSublet, postAsset, postSublet} from './services/SubletService';
import {Sublet} from './data/Sublet';

vi.mock('./services/SubletService', () => ({
    getSublet: vi.fn(),
    postSublet: vi.fn(),
    postAsset: vi.fn(),
    deleteSublet: vi.fn()
}));

const mockedGetSublet = vi.mocked(getSublet);
const mockedPostSublet = vi.mocked(postSublet);
const mockedPostAsset = vi.mocked(postAsset);
const mockedDeleteSublet = vi.mocked(deleteSublet);

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
    address: '123 Main St, Bloomington IN',
    zipcode: '47401',
    subletFolderId: '',
    photosFolderId: '',
    coverImage: 'cover.jpg',
    title: 'Cozy Room Near Campus',
    description: 'A great place',
    createdDate: '2026-01-01',
    ...overrides
});

const fillValidForm = async (user: ReturnType<typeof userEvent.setup>) => {
    await user.type(screen.getByLabelText(/^First Name/), 'John');
    await user.type(screen.getByLabelText(/^Last Name/), 'Smith');
    await user.type(screen.getByLabelText(/^Email/), 'john@example.com');
    await user.type(screen.getByLabelText(/^Address/), '456 Elm St');
    await user.type(screen.getByLabelText(/^Zip Code/), '47404');
    fireEvent.change(screen.getByLabelText(/^Available From/), {target: {value: '2026-03-01'}});
    fireEvent.change(screen.getByLabelText(/^Available To/), {target: {value: '2026-06-01'}});
    await user.type(screen.getByLabelText(/^Rent/), '1000');
    await user.type(screen.getByLabelText(/^Title/), 'Great Room');
    await user.type(screen.getByLabelText(/^Description/), 'Nice place to stay');
    const file = new File(['content'], 'photo.png', {type: 'image/png'});
    await user.upload(screen.getByLabelText(/Upload Images/, {selector: 'input'}), file);
};

describe('SubletSection', () => {
    describe('new sublet', () => {
        it('renders the create-listing heading and an image upload field', () => {
            render(<SubletSection uniqueId={NEW_SUBLET}/>);

            expect(screen.getByText(/Post your sublet for free/)).toBeInTheDocument();
            expect(screen.getByLabelText(/Upload Images/, {selector: 'input'})).toBeInTheDocument();
            expect(screen.getByRole('button', {name: /Submit/})).toBeInTheDocument();
        });

        it('does not fetch an existing sublet', () => {
            render(<SubletSection uniqueId={NEW_SUBLET}/>);

            expect(mockedGetSublet).not.toHaveBeenCalled();
        });

        it('shows a file error and does not submit when no image is provided', async () => {
            const user = userEvent.setup();
            render(<SubletSection uniqueId={NEW_SUBLET}/>);

            await user.type(screen.getByLabelText(/^First Name/), 'John');
            await user.type(screen.getByLabelText(/^Last Name/), 'Smith');
            await user.type(screen.getByLabelText(/^Email/), 'john@example.com');
            await user.type(screen.getByLabelText(/^Address/), '456 Elm St');
            await user.type(screen.getByLabelText(/^Zip Code/), '47404');
            fireEvent.change(screen.getByLabelText(/^Available From/), {target: {value: '2026-03-01'}});
            fireEvent.change(screen.getByLabelText(/^Available To/), {target: {value: '2026-06-01'}});
            await user.type(screen.getByLabelText(/^Rent/), '1000');
            await user.type(screen.getByLabelText(/^Title/), 'Great Room');
            await user.type(screen.getByLabelText(/^Description/), 'Nice place to stay');

            await user.click(screen.getByRole('button', {name: /Submit/}));

            expect(await screen.findByText('Provide at least an image!')).toBeInTheDocument();
            expect(mockedPostSublet).not.toHaveBeenCalled();
        });

        it('shows a zip code error for an invalid zip code', async () => {
            const user = userEvent.setup();
            render(<SubletSection uniqueId={NEW_SUBLET}/>);

            await fillValidForm(user);
            await user.clear(screen.getByLabelText(/^Zip Code/));
            await user.type(screen.getByLabelText(/^Zip Code/), '123');

            await user.click(screen.getByRole('button', {name: /Submit/}));

            expect(await screen.findByText('Provide valid zip code (ex: 47401)')).toBeInTheDocument();
            expect(mockedPostSublet).not.toHaveBeenCalled();
        });

        it('shows a date-range error when Available To is before Available From', async () => {
            const user = userEvent.setup();
            render(<SubletSection uniqueId={NEW_SUBLET}/>);

            await fillValidForm(user);
            fireEvent.change(screen.getByLabelText(/^Available From/), {target: {value: '2026-06-01'}});
            fireEvent.change(screen.getByLabelText(/^Available To/), {target: {value: '2026-03-01'}});

            await user.click(screen.getByRole('button', {name: /Submit/}));

            expect(await screen.findByText('Should be later than Available From date')).toBeInTheDocument();
            expect(mockedPostSublet).not.toHaveBeenCalled();
        });

        it('submits a valid form, posts the sublet and uploads the image', async () => {
            const user = userEvent.setup();
            mockedPostSublet.mockResolvedValue(sublet({assetKey: 'new-asset-key'}));
            mockedPostAsset.mockResolvedValue({} as any);
            render(<SubletSection uniqueId={NEW_SUBLET}/>);

            await fillValidForm(user);
            await user.click(screen.getByRole('button', {name: /Submit/}));

            expect(await screen.findByText('Sublet Created, It will be posted when approved!')).toBeInTheDocument();
            expect(mockedPostSublet).toHaveBeenCalledTimes(1);
            const postedSublet = mockedPostSublet.mock.calls[0][0];
            expect(postedSublet.address).toBe('456 Elm St, Bloomington IN');
            expect(mockedPostAsset).toHaveBeenCalledWith('new-asset-key', expect.any(File), '0', true);
        });

        it('shows an error message when posting the sublet fails', async () => {
            const user = userEvent.setup();
            mockedPostSublet.mockRejectedValue(new Error('server error'));
            render(<SubletSection uniqueId={NEW_SUBLET}/>);

            await fillValidForm(user);
            await user.click(screen.getByRole('button', {name: /Submit/}));

            expect(await screen.findByText('Error posting sublet!')).toBeInTheDocument();
        });
    });

    describe('existing sublet', () => {
        it('fetches and renders the sublet as read-only with a "Your Listing" heading', async () => {
            mockedGetSublet.mockResolvedValue(sublet());

            render(<SubletSection uniqueId="asset-1"/>);

            expect(await screen.findByText('Your Listing')).toBeInTheDocument();
            expect(screen.getByLabelText(/^First Name/)).toHaveValue('Jane');
            expect(screen.getByLabelText(/^First Name/)).toHaveAttribute('readonly');
            expect(mockedGetSublet).toHaveBeenCalledWith('asset-1');
        });

        it('shows the not-found state when the sublet cannot be loaded', async () => {
            mockedGetSublet.mockRejectedValue(new Error('not found'));

            render(<SubletSection uniqueId="missing-asset"/>);

            expect(await screen.findByText('Uh-oh, this is a 404')).toBeInTheDocument();
        });

        it('opens a confirmation modal and deletes the sublet when confirmed', async () => {
            const user = userEvent.setup();
            mockedGetSublet.mockResolvedValue(sublet());
            mockedDeleteSublet.mockResolvedValue({} as any);

            const {container} = render(<SubletSection uniqueId="asset-1"/>);
            await screen.findByText('Your Listing');

            await user.click(container.querySelector('.form-submit .muncher-button--danger') as Element);
            expect(screen.getByText('Delete Sublet?')).toBeInTheDocument();

            await user.click(container.querySelector('.buttons .muncher-button--danger') as Element);

            expect(await screen.findByText('Sublet Deleted!')).toBeInTheDocument();
            expect(mockedDeleteSublet).toHaveBeenCalledWith('asset-1');
        });

        it('closes the confirmation modal on cancel without deleting', async () => {
            const user = userEvent.setup();
            mockedGetSublet.mockResolvedValue(sublet());

            const {container} = render(<SubletSection uniqueId="asset-1"/>);
            await screen.findByText('Your Listing');

            await user.click(container.querySelector('.form-submit .muncher-button--danger') as Element);
            await user.click(container.querySelector('.buttons .muncher-button--secondary') as Element);

            expect(mockedDeleteSublet).not.toHaveBeenCalled();
        });
    });
});
