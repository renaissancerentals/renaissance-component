import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {HomePageSpecialModal} from './HomePageSpecialModal';
import {HomePageSpecial} from './data/HomePageSpecial';

const special: HomePageSpecial = {
    id: 'id',
    description: 'A great special',
    image: 'https://example.com/image.jpg',
    startDate: '2026-01-01',
    endDate: '2026-02-01',
    properties: ['renaissance-rentals'],
    links: []
};

const clearCookies = () => {
    document.cookie.split(';').forEach(cookie => {
        const name = cookie.split('=')[0].trim();
        if (name) {
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        }
    });
};

describe('HomePageSpecialModal', () => {
    beforeEach(() => {
        vi.useFakeTimers({shouldAdvanceTime: true});
        clearCookies();
    });

    afterEach(() => {
        vi.useRealTimers();
        clearCookies();
    });

    it('renders the modal off-screen (not yet visible) before the 3 second delay has elapsed', () => {
        render(
            <HomePageSpecialModal homePageSpecial={special} propertyId="renaissance-rentals"/>
        );

        const modal = document.querySelector('.muncher-modal') as HTMLElement;
        expect(modal).toBeInTheDocument();
        expect(modal.style.transform).toBe('translateY(-100vh)');
        expect(modal.style.opacity).toBe('0');
    });

    it('shows the modal with the special after the delay when no cookie is set', async () => {
        render(<HomePageSpecialModal homePageSpecial={special} propertyId="renaissance-rentals"/>);

        vi.advanceTimersByTime(3000);

        await waitFor(() => {
            expect(screen.getByAltText('A great special')).toBeInTheDocument();
        });
    });

    it('does not show the modal when the closed cookie is already set', async () => {
        document.cookie = 'renaissance-rentals-specialModalClosed=true;path=/';

        render(<HomePageSpecialModal homePageSpecial={special} propertyId="renaissance-rentals"/>);

        vi.advanceTimersByTime(3000);

        await waitFor(() => {
            expect(screen.queryByAltText('A great special')).not.toBeInTheDocument();
        });
    });

    it('uses a parent-scoped cookie name when parent is provided', async () => {
        document.cookie = 'renaissance-rentals-renaissance-rentals-specialModalClosed=true;path=/';

        render(
            <HomePageSpecialModal
                homePageSpecial={special}
                propertyId="renaissance-rentals"
                parent="renaissance-rentals"
            />
        );

        vi.advanceTimersByTime(3000);

        await waitFor(() => {
            expect(screen.queryByAltText('A great special')).not.toBeInTheDocument();
        });
    });

    it('closes the modal and sets the closed cookie when the close button is clicked', async () => {
        const user = userEvent.setup({advanceTimers: vi.advanceTimersByTime});

        render(<HomePageSpecialModal homePageSpecial={special} propertyId="renaissance-rentals"/>);

        vi.advanceTimersByTime(3000);
        await waitFor(() => {
            expect(screen.getByAltText('A great special')).toBeInTheDocument();
        });

        const closeButton = document.querySelector('.close button') as HTMLElement;
        expect(closeButton).toBeInTheDocument();
        await user.click(closeButton);

        expect(document.cookie).toContain('renaissance-rentals-specialModalClosed=true');
    });
});
