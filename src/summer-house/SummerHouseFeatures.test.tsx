import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {SummerHouseFeatures} from './SummerHouseFeatures';

describe('SummerHouseFeatures', () => {
    it('renders the section title', () => {
        render(<SummerHouseFeatures/>);

        expect(screen.getByText(/Flexible Term/)).toBeInTheDocument();
    });

    it('renders the list of included features', () => {
        render(<SummerHouseFeatures/>);

        expect(screen.getByText('14 Day Minimum')).toBeInTheDocument();
        expect(screen.getByText('No Lease and No Deposit')).toBeInTheDocument();
        expect(screen.getByText('Washer & Dryer in-unit')).toBeInTheDocument();
        expect(screen.getByText('No pets')).toBeInTheDocument();
    });

    it('renders the "Perfect for..." audience heading', () => {
        render(<SummerHouseFeatures/>);

        expect(screen.getByText(/Perfect for.../)).toBeInTheDocument();
        expect(screen.getByText(/Visiting Professionals/)).toBeInTheDocument();
    });
});
