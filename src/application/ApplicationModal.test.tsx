import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ApplicationModal} from './ApplicationModal';

vi.mock('./service/ApplicationService', () => ({
    sendRentalApplicationRequest: vi.fn()
}));

describe('ApplicationModal', () => {
    it('renders the application section content', () => {
        render(<ApplicationModal
            showApplicationModal={true}
            applicationModalCloseHandler={() => {}}
            contactClickHandler={() => {}}
            propertyId="scholars-rooftop"
        />);

        expect(screen.getByText('Request An Application')).toBeInTheDocument();
    });

    it('shows the modal with a visible transform when open', () => {
        const {container} = render(<ApplicationModal
            showApplicationModal={true}
            applicationModalCloseHandler={() => {}}
            contactClickHandler={() => {}}
            propertyId="scholars-rooftop"
        />);

        expect(container.querySelector('.muncher-modal')).toHaveStyle({transform: 'translateY(0)'});
    });

    it('hides the modal with an off-screen transform when closed', () => {
        const {container} = render(<ApplicationModal
            showApplicationModal={false}
            applicationModalCloseHandler={() => {}}
            contactClickHandler={() => {}}
            propertyId="scholars-rooftop"
        />);

        expect(container.querySelector('.muncher-modal')).toHaveStyle({transform: 'translateY(-100vh)'});
    });

    it('calls applicationModalCloseHandler when the close icon is clicked', async () => {
        const user = userEvent.setup();
        const closeHandler = vi.fn();
        const {container} = render(<ApplicationModal
            showApplicationModal={true}
            applicationModalCloseHandler={closeHandler}
            contactClickHandler={() => {}}
            propertyId="scholars-rooftop"
        />);

        const closeButton = container.querySelector('.close');
        await user.click(closeButton as Element);

        expect(closeHandler).toHaveBeenCalledTimes(1);
    });

    it('passes contactClickHandler through to the application section', async () => {
        const user = userEvent.setup();
        const contactClickHandler = vi.fn();
        render(<ApplicationModal
            showApplicationModal={true}
            applicationModalCloseHandler={() => {}}
            contactClickHandler={contactClickHandler}
            propertyId="scholars-rooftop"
        />);

        await user.click(screen.getByText('CONTACT FORM'));

        expect(contactClickHandler).toHaveBeenCalledTimes(1);
    });
});
