import {describe, expect, it, vi} from 'vitest';
import {render, waitFor} from '@testing-library/react';
import {HomePageSpecialSection} from './HomePageSpecialSection';
import {getHomeHomePageSpecials} from './service/HomePageSpecialService';
import {HomePageSpecial} from './data/HomePageSpecial';

vi.mock('./service/HomePageSpecialService', () => ({
    getHomeHomePageSpecials: vi.fn()
}));

const special: HomePageSpecial = {
    id: 'id',
    description: 'A great special',
    image: 'https://example.com/image.jpg',
    startDate: '2026-01-01',
    endDate: '2026-02-01',
    properties: ['renaissance-rentals'],
    links: []
};

describe('HomePageSpecialSection', () => {
    it('renders the section container', async () => {
        vi.mocked(getHomeHomePageSpecials).mockResolvedValueOnce([]);

        const {container} = render(<HomePageSpecialSection propertyId="renaissance-rentals"/>);

        expect(container.querySelector('.section-home-page-specials')).toBeInTheDocument();
        expect(getHomeHomePageSpecials).toHaveBeenCalledWith('renaissance-rentals');
    });

    it('renders nothing extra when there are no specials', async () => {
        vi.mocked(getHomeHomePageSpecials).mockResolvedValueOnce([]);

        render(<HomePageSpecialSection propertyId="renaissance-rentals"/>);

        await waitFor(() => {
            expect(getHomeHomePageSpecials).toHaveBeenCalled();
        });
        expect(document.querySelector('.home-page-special-modal')).not.toBeInTheDocument();
    });

    it('renders the modal wrapper with the first special once loaded', async () => {
        vi.mocked(getHomeHomePageSpecials).mockResolvedValueOnce([special]);

        render(<HomePageSpecialSection propertyId="renaissance-rentals"/>);

        await waitFor(() => {
            expect(document.querySelector('.home-page-special-modal')).toBeInTheDocument();
        });
    });

    it('passes the parent prop through to the modal', async () => {
        vi.mocked(getHomeHomePageSpecials).mockResolvedValueOnce([special]);

        render(<HomePageSpecialSection propertyId="renaissance-rentals" parent="renaissance-rentals"/>);

        await waitFor(() => {
            expect(document.querySelector('.home-page-special-modal')).toBeInTheDocument();
        });
    });

    it('re-fetches when propertyId changes', async () => {
        vi.mocked(getHomeHomePageSpecials).mockResolvedValue([]);

        const {rerender} = render(<HomePageSpecialSection propertyId="renaissance-rentals"/>);
        await waitFor(() => expect(getHomeHomePageSpecials).toHaveBeenCalledWith('renaissance-rentals'));

        rerender(<HomePageSpecialSection propertyId="high-grove"/>);
        await waitFor(() => expect(getHomeHomePageSpecials).toHaveBeenCalledWith('high-grove'));

        expect(getHomeHomePageSpecials).toHaveBeenCalledTimes(2);
    });
});
