import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ContactModal} from './ContactModal';

describe('ContactModal', () => {
    it('renders the contact section with the given propertyId and contact number', () => {
        render(<ContactModal showContactModal={true} contactModalCloseHandler={vi.fn()}
                              propertyId="verona-park" contactNumber="8123456789"/>);

        expect(screen.getByText('Contact Us')).toBeInTheDocument();
        expect(screen.getByText('(812)-345-6789')).toBeInTheDocument();
    });

    it('calls contactModalCloseHandler when the close icon is clicked', async () => {
        const closeHandler = vi.fn();
        const {container} = render(<ContactModal showContactModal={true} contactModalCloseHandler={closeHandler}
                                                   propertyId="verona-park"/>);

        const closeIcon = container.querySelector('.close') as HTMLElement;
        await userEvent.click(closeIcon);

        expect(closeHandler).toHaveBeenCalled();
    });
});
