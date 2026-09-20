import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {ShortTermPricingCard} from './ShortTermPricingCard';
import {FloorplanShortTerm, ShortTermStyle} from './data/ShortTerm';

const floorplans: FloorplanShortTerm[] = [
    {
        id: '17789',
        name: '2 Bedroom Flat',
        style: ShortTermStyle.APARTMENT,
        bedroom: 2,
        bathroom: 2,
        priceFor14To29Days: '119.0',
        priceFor1To4Months: '93.0',
        priceFor4andMoreMonths: '81.0',
        squareFoot: 750,
    } as FloorplanShortTerm,
    {
        id: '17790',
        name: '2 townhome',
        style: ShortTermStyle.TOWN_HOME,
        bedroom: 2,
        bathroom: 2.5,
        priceFor14To29Days: '127.0',
        priceFor1To4Months: '101.0',
        priceFor4andMoreMonths: '89.0',
        squareFoot: 1132,
    } as FloorplanShortTerm,
];

describe('ShortTermPricingCard', () => {
    it('renders the heading', () => {
        render(<ShortTermPricingCard floorplans={floorplans} contactNumber="8123332280"/>);

        expect(screen.getByText('Short Term Pricing')).toBeInTheDocument();
    });

    it('renders bedroom/style labels for each floorplan (mobile + desktop views)', () => {
        render(<ShortTermPricingCard floorplans={floorplans} contactNumber="8123332280"/>);

        expect(screen.getAllByText('2-Bedroom Apartment').length).toBeGreaterThan(0);
        expect(screen.getAllByText('2-Bedroom Town home').length).toBeGreaterThan(0);
    });

    it('formats the 14-29 day price as USD with a day+tax suffix', () => {
        render(<ShortTermPricingCard floorplans={floorplans} contactNumber="8123332280"/>);

        expect(screen.getAllByText('$119/day + tax').length).toBeGreaterThan(0);
    });

    it('formats the 1-4 month price with both a daily and monthly figure', () => {
        render(<ShortTermPricingCard floorplans={floorplans} contactNumber="8123332280"/>);

        expect(screen.getAllByText(/\$93\/day\//).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/\$2,790\/mo/).length).toBeGreaterThan(0);
    });

    it('renders square footage with a plus suffix', () => {
        render(<ShortTermPricingCard floorplans={floorplans} contactNumber="8123332280"/>);

        expect(screen.getAllByText('750+').length).toBeGreaterThan(0);
        expect(screen.getAllByText('1132+').length).toBeGreaterThan(0);
    });

    it('falls back to the raw price string when the price is not a valid positive number', () => {
        const invalid = [{
            ...floorplans[0],
            priceFor14To29Days: 'call for pricing',
        }] as FloorplanShortTerm[];

        render(<ShortTermPricingCard floorplans={invalid} contactNumber="8123332280"/>);

        expect(screen.getAllByText(/call for pricing/).length).toBeGreaterThan(0);
    });

    it('renders no pricing rows for an empty floorplans array', () => {
        const {container} = render(<ShortTermPricingCard floorplans={[]} contactNumber="8123332280"/>);

        expect(container.querySelectorAll('.col:not(.head)').length).toBe(0);
    });
});
