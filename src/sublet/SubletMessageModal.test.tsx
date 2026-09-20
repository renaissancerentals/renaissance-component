import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {SubletMessageModal} from './SubletMessageModal';
import {Sublet} from './data/Sublet';
import {sendMessage} from './services/SubletService';

vi.mock('./services/SubletService', () => ({
    sendMessage: vi.fn()
}));

const mockedSendMessage = vi.mocked(sendMessage);

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

// jsdom does not implement the legacy named-property getter on HTMLFormElement
// (e.g. `form.fullName`), which SubletMessageModal relies on in its submit handler.
// Patch it onto the rendered form so the component's own submit logic is exercised
// the same way it would run in a real browser.
const patchNamedFormAccess = (container: HTMLElement) => {
    const form = container.querySelector('form');
    if (!form) return;
    Array.from(form.elements).forEach((element) => {
        const name = (element as HTMLInputElement | HTMLTextAreaElement).name;
        if (name && !(name in form)) {
            Object.defineProperty(form, name, {value: element, configurable: true});
        }
    });
};

const fillAndSubmit = async (user: ReturnType<typeof userEvent.setup>) => {
    await user.type(screen.getByLabelText(/^Name/), 'John Smith');
    await user.type(screen.getByLabelText(/^Email/), 'john@example.com');
    await user.type(screen.getByLabelText(/^Message/), 'Interested in this sublet');
    await user.click(screen.getByRole('button', {name: 'Submit'}));
};

describe('SubletMessageModal', () => {
    it('renders the sublet title and a contact form', () => {
        render(<SubletMessageModal sublet={sublet()} showModal={true} modalCloseHandler={() => {
        }}/>);

        expect(screen.getByText('Contact for')).toBeInTheDocument();
        expect(screen.getByText('"Cozy Room Near Campus"')).toBeInTheDocument();
        expect(screen.getByLabelText(/^Name/)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Email/)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Message/)).toBeInTheDocument();
    });

    it('calls modalCloseHandler when the close icon is clicked', async () => {
        const user = userEvent.setup();
        const closeHandler = vi.fn();
        const {container} = render(<SubletMessageModal sublet={sublet()} showModal={true}
                                                         modalCloseHandler={closeHandler}/>);

        await user.click(container.querySelector('.close') as Element);

        expect(closeHandler).toHaveBeenCalledTimes(1);
    });

    it('does not submit when required fields are left empty', async () => {
        const user = userEvent.setup();
        render(<SubletMessageModal sublet={sublet()} showModal={true} modalCloseHandler={() => {
        }}/>);

        await user.click(screen.getByRole('button', {name: 'Submit'}));

        expect(mockedSendMessage).not.toHaveBeenCalled();
    });

    it('submits the form with the entered name, email and message', async () => {
        const user = userEvent.setup();
        mockedSendMessage.mockResolvedValue({} as any);
        const {container} = render(<SubletMessageModal sublet={sublet({assetKey: 'asset-42'})} showModal={true}
                                                         modalCloseHandler={() => {
                                                         }}/>);
        patchNamedFormAccess(container);

        await fillAndSubmit(user);

        expect(mockedSendMessage).toHaveBeenCalledWith('asset-42', {
            name: 'John Smith',
            email: 'john@example.com',
            message: 'Interested in this sublet'
        });
    });

    it('shows a success message and disables the submit button after a successful submission', async () => {
        const user = userEvent.setup();
        mockedSendMessage.mockResolvedValue({} as any);
        const {container} = render(<SubletMessageModal sublet={sublet()} showModal={true} modalCloseHandler={() => {
        }}/>);
        patchNamedFormAccess(container);

        await fillAndSubmit(user);

        expect(await screen.findByText('Message Sent!')).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Submit'})).toBeDisabled();
    });

    it('shows the server error message when submission fails', async () => {
        const user = userEvent.setup();
        mockedSendMessage.mockRejectedValue({response: {data: {message: 'Server exploded'}}});
        const {container} = render(<SubletMessageModal sublet={sublet()} showModal={true} modalCloseHandler={() => {
        }}/>);
        patchNamedFormAccess(container);

        await fillAndSubmit(user);

        expect(await screen.findByText('Server exploded')).toBeInTheDocument();
    });

    it('shows a generic error message when the failure has no response payload', async () => {
        const user = userEvent.setup();
        mockedSendMessage.mockRejectedValue(new Error('network down'));
        const {container} = render(<SubletMessageModal sublet={sublet()} showModal={true} modalCloseHandler={() => {
        }}/>);
        patchNamedFormAccess(container);

        await fillAndSubmit(user);

        expect(await screen.findByText('Message Failed!')).toBeInTheDocument();
    });
});
