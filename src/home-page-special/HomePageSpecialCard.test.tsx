import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {HomePageSpecialCard} from './HomePageSpecialCard';
import {HomePageSpecial} from './data/HomePageSpecial';

const homePageSpecial = (overrides: Partial<HomePageSpecial> = {}): HomePageSpecial => ({
    id: 'id',
    description: 'A great special',
    image: 'https://example.com/image.jpg',
    startDate: '2026-01-01',
    endDate: '2026-02-01',
    properties: ['renaissance-rentals'],
    links: [],
    ...overrides
});

describe('HomePageSpecialCard', () => {
    it('renders the image with the description as alt text', () => {
        render(<HomePageSpecialCard homePageSpecial={homePageSpecial()} propertyId="renaissance-rentals"/>);

        const image = screen.getByAltText('A great special');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
    });

    it('renders a clickable region link for each link with a url', () => {
        const special = homePageSpecial({
            links: [
                {x: 10, y: 20, width: 30, height: 40, url: 'https://www.example.com/one'},
                {x: 50, y: 60, width: 5, height: 5, url: 'https://www.example.com/two'}
            ]
        });

        const {container} = render(<HomePageSpecialCard homePageSpecial={special} propertyId="renaissance-rentals"/>);

        const regions = container.querySelectorAll('.special-card--region');
        expect(regions.length).toBe(2);
        expect(regions[0]).toHaveAttribute('href', 'https://www.example.com/one');
        expect(regions[0]).toHaveStyle({left: '10%', top: '20%', width: '30%', height: '40%'});
        expect(regions[1]).toHaveAttribute('href', 'https://www.example.com/two');
    });

    it('omits regions whose url is empty', () => {
        const special = homePageSpecial({
            links: [
                {x: 10, y: 20, width: 30, height: 40, url: ''},
                {x: 50, y: 60, width: 5, height: 5, url: 'https://www.example.com/two'}
            ]
        });

        const {container} = render(<HomePageSpecialCard homePageSpecial={special} propertyId="renaissance-rentals"/>);

        expect(container.querySelectorAll('.special-card--region').length).toBe(1);
    });

    it('renders no regions when links is undefined', () => {
        const special = homePageSpecial({links: undefined as unknown as []});

        const {container} = render(<HomePageSpecialCard homePageSpecial={special} propertyId="renaissance-rentals"/>);

        expect(container.querySelectorAll('.special-card--region').length).toBe(0);
    });
});
