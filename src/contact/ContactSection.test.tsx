import {afterEach, describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ContactSection} from './ContactSection';
import {PropertyNameIds} from '../property/data/Property';

// The HTMLFormElement named-property-access polyfill this test relies on
// (form.firstName, form.bedrooms, etc.) lives globally in src/setupTests.ts.

const {sendContactMailMock, trackContactInitiatedMock, trackContactSubmittedMock, sendToConversionTrackingMock} = vi.hoisted(() => ({
    sendContactMailMock: vi.fn(),
    trackContactInitiatedMock: vi.fn(),
    trackContactSubmittedMock: vi.fn(),
    sendToConversionTrackingMock: vi.fn()
}));

vi.mock('./service/ContactService', () => ({
    sendContactMail: sendContactMailMock,
    sendToConversionTracking: sendToConversionTrackingMock,
    trackContactInitiated: trackContactInitiatedMock,
    trackContactSubmitted: trackContactSubmittedMock
}));

const fillRequiredFields = async (user: ReturnType<typeof userEvent.setup>) => {
    await user.type(screen.getByLabelText('First Name*'), 'Jane');
    await user.type(screen.getByLabelText('Last Name*'), 'Doe');
    await user.type(screen.getByLabelText('Email*'), 'jane@example.com');
    await user.type(screen.getByLabelText('Phone*'), '8123456789');
};

const clickNext = async (user: ReturnType<typeof userEvent.setup>) => {
    await user.click(screen.getByRole('button', {name: /NEXT/i}));
};

describe('ContactSection', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders step 1 of the form with the heading and required fields', () => {
        render(<ContactSection propertyId="scholars-rooftop"/>);

        expect(screen.getByText('Contact Us')).toBeInTheDocument();
        expect(screen.getAllByText('Step 1 of 2').length).toBeGreaterThan(0);
        expect(screen.getByLabelText('First Name*')).toBeInTheDocument();
        expect(screen.getByLabelText('Last Name*')).toBeInTheDocument();
        expect(screen.getByLabelText('Email*')).toBeInTheDocument();
        expect(screen.getByLabelText('Phone*')).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /NEXT/i})).toBeInTheDocument();
    });

    it('renders the formatted contact number when provided', () => {
        render(<ContactSection propertyId="scholars-rooftop" contactNumber="8123456789"/>);

        expect(screen.getByText('(812)-345-6789')).toBeInTheDocument();
    });

    it('omits the contact number paragraph when not provided', () => {
        render(<ContactSection propertyId="scholars-rooftop"/>);

        expect(screen.queryByText(/Text or call us at/)).not.toBeInTheDocument();
    });

    it('stays on step 1 and does not advance when required fields are empty', async () => {
        const user = userEvent.setup();
        render(<ContactSection propertyId="scholars-rooftop"/>);

        await clickNext(user);

        expect(screen.getByLabelText('First Name*')).toBeInTheDocument();
        expect(screen.queryByRole('button', {name: /SUBMIT/i})).not.toBeInTheDocument();
    });

    it('shows a contact-preference error when all preferred-contact checkboxes are unchecked', async () => {
        const user = userEvent.setup();
        const {container} = render(<ContactSection propertyId="scholars-rooftop"/>);

        await fillRequiredFields(user);
        const emailPreferred = container.querySelector('input[name="emailPreferred"]') as HTMLInputElement;
        expect(emailPreferred.checked).toBe(true);
        await user.click(emailPreferred);
        expect(emailPreferred.checked).toBe(false);

        await clickNext(user);

        expect(screen.getByText('Please check one of the boxes')).toBeInTheDocument();
        expect(screen.queryByRole('button', {name: /SUBMIT/i})).not.toBeInTheDocument();
    });

    it('advances to step 2 and tracks contact-initiated when required fields are valid', async () => {
        const user = userEvent.setup();
        render(<ContactSection propertyId="scholars-rooftop"/>);

        await fillRequiredFields(user);
        await clickNext(user);

        expect(screen.getAllByText('Optional Fields').length).toBeGreaterThan(0);
        expect(screen.getByRole('button', {name: /SUBMIT/i})).toBeInTheDocument();
        expect(trackContactInitiatedMock).toHaveBeenCalledWith('scholars-rooftop');
    });

    it('submits the contact message and shows a success message on successful submission', async () => {
        sendContactMailMock.mockResolvedValueOnce({});
        const user = userEvent.setup();
        render(<ContactSection propertyId="scholars-rooftop"/>);

        await fillRequiredFields(user);
        await clickNext(user);
        await user.click(screen.getByRole('button', {name: /SUBMIT/i}));

        expect(trackContactSubmittedMock).toHaveBeenCalledWith('scholars-rooftop');
        expect(sendContactMailMock).toHaveBeenCalledTimes(1);
        const submittedMessage = sendContactMailMock.mock.calls[0][0];
        expect(submittedMessage.firstName).toBe('Jane');
        expect(submittedMessage.lastName).toBe('Doe');
        expect(submittedMessage.email).toBe('jane@example.com');
        expect(submittedMessage.property).toBe('scholars-rooftop');

        expect(await screen.findByText('Message Sent!')).toBeInTheDocument();
    });

    it('shows the server-provided error message when submission fails', async () => {
        sendContactMailMock.mockRejectedValueOnce({response: {data: {message: 'Something went wrong'}}});
        const user = userEvent.setup();
        render(<ContactSection propertyId="scholars-rooftop"/>);

        await fillRequiredFields(user);
        await clickNext(user);
        await user.click(screen.getByRole('button', {name: /SUBMIT/i}));

        expect(await screen.findByText('Something went wrong')).toBeInTheDocument();
    });

    it('sends conversion tracking pings for both tracking ids on submission', async () => {
        sendContactMailMock.mockResolvedValueOnce({});
        const user = userEvent.setup();
        render(<ContactSection propertyId="scholars-rooftop"
                                conversionTrackingId1="AW-111" conversionTrackingId2="AW-222"/>);

        await fillRequiredFields(user);
        await clickNext(user);
        await user.click(screen.getByRole('button', {name: /SUBMIT/i}));

        await screen.findByText('Message Sent!');
        expect(sendToConversionTrackingMock).toHaveBeenCalledWith('AW-111');
        expect(sendToConversionTrackingMock).toHaveBeenCalledWith('AW-222');
    });

    it('resolves the property id from the checked community when propertyId is an umbrella site id', async () => {
        sendContactMailMock.mockResolvedValueOnce({});
        const user = userEvent.setup();
        const {container} = render(<ContactSection propertyId="renaissance-rentals"/>);

        await fillRequiredFields(user);
        await clickNext(user);

        const communityCheckbox = container.querySelector('input[name="Verona Park"]') as HTMLInputElement;
        expect(communityCheckbox).toBeTruthy();
        await user.click(communityCheckbox);

        await user.click(screen.getByRole('button', {name: /SUBMIT/i}));

        const submittedMessage = sendContactMailMock.mock.calls[0][0];
        expect(submittedMessage.property).toBe('verona-park');
        expect(submittedMessage.additionalInfo.communities).toBe('Verona Park');
    });
});
