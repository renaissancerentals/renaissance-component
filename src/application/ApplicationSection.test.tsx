import {beforeEach, describe, expect, it, vi} from 'vitest';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ApplicationSection} from './ApplicationSection';
import {sendRentalApplicationRequest} from './service/ApplicationService';

vi.mock('./service/ApplicationService', () => ({
    sendRentalApplicationRequest: vi.fn()
}));

const mockedSendRentalApplicationRequest = sendRentalApplicationRequest as ReturnType<typeof vi.fn>;

describe('ApplicationSection', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the request form with the initial step active', () => {
        render(<ApplicationSection propertyId="scholars-rooftop" contactClickHandler={() => {}}/>);

        expect(screen.getByText('Request An Application')).toBeInTheDocument();
        expect(screen.getByLabelText('First Name', {exact: false})).toBeInTheDocument();
        expect(screen.getByLabelText('Last Name', {exact: false})).toBeInTheDocument();
        expect(screen.getByLabelText('Email', {exact: false})).toBeInTheDocument();
        expect(screen.getByLabelText('Phone', {exact: false})).toBeInTheDocument();
        expect(screen.getByLabelText('Community where you would like to apply', {exact: false})).toBeInTheDocument();
    });

    it('hides the community select when a community is already given', () => {
        render(<ApplicationSection propertyId="renaissance-rentals" community="Scholar's Rooftop"
                                    contactClickHandler={() => {}}/>);

        expect(screen.queryByLabelText('Community where you would like to apply', {exact: false})).not.toBeInTheDocument();
    });

    it('calls contactClickHandler when the contact form button is clicked', async () => {
        const user = userEvent.setup();
        const contactClickHandler = vi.fn();
        render(<ApplicationSection propertyId="scholars-rooftop" contactClickHandler={contactClickHandler}/>);

        await user.click(screen.getByText('CONTACT FORM'));

        expect(contactClickHandler).toHaveBeenCalledTimes(1);
    });

    it('shows validation errors and does not submit when required fields are missing', async () => {
        const {container} = render(<ApplicationSection propertyId="scholars-rooftop" contactClickHandler={() => {}}/>);

        // native HTML `required` attributes on the inputs would block a real click-driven submit
        // before our own validation ever runs, so dispatch the submit event directly to exercise it.
        fireEvent.submit(container.querySelector('form')!);

        expect(await screen.findByText('Fill all the required fields')).toBeInTheDocument();
        expect(screen.getByText('Please provide First Name')).toBeInTheDocument();
        expect(screen.getByText('Please provide Last Name')).toBeInTheDocument();
        expect(screen.getByText('Please provide Email')).toBeInTheDocument();
        expect(mockedSendRentalApplicationRequest).not.toHaveBeenCalled();
    });

    it('submits the request with the resolved property id for a direct property page', async () => {
        mockedSendRentalApplicationRequest.mockResolvedValue({});
        const user = userEvent.setup();
        render(<ApplicationSection propertyId="scholars-rooftop" contactClickHandler={() => {}}/>);

        await user.type(screen.getByLabelText('First Name', {exact: false}), 'Jane');
        await user.type(screen.getByLabelText('Last Name', {exact: false}), 'Doe');
        await user.type(screen.getByLabelText('Email', {exact: false}), 'jane@example.com');
        await user.selectOptions(screen.getByLabelText('Community where you would like to apply', {exact: false}), 'Scholar\'s Rooftop');
        await user.click(screen.getByText('Request Application'));

        await waitFor(() => expect(mockedSendRentalApplicationRequest).toHaveBeenCalledTimes(1));
        const submittedApplication = mockedSendRentalApplicationRequest.mock.calls[0][0];
        expect(submittedApplication).toMatchObject({
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane@example.com',
            property: 'scholars-rooftop'
        });
    });

    it('resolves the property id from the selected community on an umbrella site page', async () => {
        mockedSendRentalApplicationRequest.mockResolvedValue({});
        const user = userEvent.setup();
        render(<ApplicationSection propertyId="renaissance-rentals" contactClickHandler={() => {}}/>);

        await user.type(screen.getByLabelText('First Name', {exact: false}), 'Jane');
        await user.type(screen.getByLabelText('Last Name', {exact: false}), 'Doe');
        await user.type(screen.getByLabelText('Email', {exact: false}), 'jane@example.com');
        await user.selectOptions(screen.getByLabelText('Community where you would like to apply', {exact: false}), 'Scholar\'s Rooftop');
        await user.click(screen.getByText('Request Application'));

        await waitFor(() => expect(mockedSendRentalApplicationRequest).toHaveBeenCalledTimes(1));
        const submittedApplication = mockedSendRentalApplicationRequest.mock.calls[0][0];
        expect(submittedApplication).toMatchObject({
            property: 'scholars-rooftop',
            community: 'Scholar\'s Rooftop'
        });
    });

    it('shows the completion screen after a successful submission', async () => {
        mockedSendRentalApplicationRequest.mockResolvedValue({});
        const user = userEvent.setup();
        render(<ApplicationSection propertyId="scholars-rooftop" contactClickHandler={() => {}}/>);

        await user.type(screen.getByLabelText('First Name', {exact: false}), 'Jane');
        await user.type(screen.getByLabelText('Last Name', {exact: false}), 'Doe');
        await user.type(screen.getByLabelText('Email', {exact: false}), 'jane@example.com');
        await user.selectOptions(screen.getByLabelText('Community where you would like to apply', {exact: false}), 'Scholar\'s Rooftop');
        await user.click(screen.getByText('Request Application'));

        expect(await screen.findByText('Thank you for submitting your application request.')).toBeInTheDocument();
    });

    it('shows the server error message when submission fails with a response error', async () => {
        mockedSendRentalApplicationRequest.mockRejectedValue({response: {data: {message: 'Property not found'}}});
        const user = userEvent.setup();
        render(<ApplicationSection propertyId="scholars-rooftop" contactClickHandler={() => {}}/>);

        await user.type(screen.getByLabelText('First Name', {exact: false}), 'Jane');
        await user.type(screen.getByLabelText('Last Name', {exact: false}), 'Doe');
        await user.type(screen.getByLabelText('Email', {exact: false}), 'jane@example.com');
        await user.selectOptions(screen.getByLabelText('Community where you would like to apply', {exact: false}), 'Scholar\'s Rooftop');
        await user.click(screen.getByText('Request Application'));

        expect(await screen.findByText('Property not found')).toBeInTheDocument();
    });

    it('shows a generic error message when submission fails without a response', async () => {
        mockedSendRentalApplicationRequest.mockRejectedValue(new Error('network down'));
        const user = userEvent.setup();
        render(<ApplicationSection propertyId="scholars-rooftop" contactClickHandler={() => {}}/>);

        await user.type(screen.getByLabelText('First Name', {exact: false}), 'Jane');
        await user.type(screen.getByLabelText('Last Name', {exact: false}), 'Doe');
        await user.type(screen.getByLabelText('Email', {exact: false}), 'jane@example.com');
        await user.selectOptions(screen.getByLabelText('Community where you would like to apply', {exact: false}), 'Scholar\'s Rooftop');
        await user.click(screen.getByText('Request Application'));

        expect(await screen.findByText('Rental Application Request Failed!')).toBeInTheDocument();
    });
});
