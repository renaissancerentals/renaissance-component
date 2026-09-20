import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {Hostaway} from './Hostaway';

describe('Hostaway', () => {
    it('renders the heading and search availability copy', () => {
        render(<Hostaway contactNumber="8123332280"/>);

        expect(screen.getByText('Stays under 2 weeks')).toBeInTheDocument();
        expect(screen.getByText('Need a stay under 2 weeks?')).toBeInTheDocument();
        expect(screen.getByText('Search Availability')).toBeInTheDocument();
    });

    it('builds a tel link from the contactNumber prop', () => {
        render(<Hostaway contactNumber="8123332280"/>);

        const link = screen.getByText('Call or Text').closest('a');
        expect(link).toHaveAttribute('href', 'tel:8123332280');
    });

    it('rebuilds the tel link when contactNumber changes', () => {
        const {rerender} = render(<Hostaway contactNumber="8123332280"/>);
        rerender(<Hostaway contactNumber="3175551234"/>);

        const link = screen.getByText('Call or Text').closest('a');
        expect(link).toHaveAttribute('href', 'tel:3175551234');
    });
});
