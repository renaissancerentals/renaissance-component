import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import moment from 'moment/moment';
import {UnitPrice} from './UnitPrice';
import {momentToDate, toUSD} from '../../utils/Utils';
import {UnitFloorplan} from '../data/Unit';

const unit = (overrides: Partial<UnitFloorplan> = {}): UnitFloorplan => ({
    rent: 1200,
    discountedRent: null as unknown as number,
    discountedRentStartDate: '',
    discountedRentEndDate: '',
    ...overrides
} as UnitFloorplan);

describe('UnitPrice', () => {
    it('renders the base rent as USD', () => {
        render(<UnitPrice unit={unit({rent: 1200})}/>);

        expect(screen.getByText(toUSD(1200))).toBeInTheDocument();
    });

    it('does not apply the strike-through class or invert color by default', () => {
        const {container} = render(<UnitPrice unit={unit()}/>);

        expect(container.querySelector('.strike-through')).not.toBeInTheDocument();
        expect(container.querySelector('.floorplan-price')).toBeInTheDocument();
        expect(container.querySelector('.floorplan-price-inverted')).not.toBeInTheDocument();
    });

    it('applies the inverted color class when invertColor is true', () => {
        const {container} = render(<UnitPrice unit={unit()} invertColor={true}/>);

        expect(container.querySelector('.floorplan-price-inverted')).toBeInTheDocument();
    });

    it('shows a strike-through price and the discounted rent when within the discount window', () => {
        const discountedRentStartDate = momentToDate(moment().subtract(2, 'days'));
        const discountedRentEndDate = momentToDate(moment().add(2, 'days'));

        const {container} = render(<UnitPrice unit={unit({
            rent: 1200,
            discountedRent: 800,
            discountedRentStartDate,
            discountedRentEndDate
        })}/>);

        expect(container.querySelector('.strike-through')).toBeInTheDocument();
        expect(screen.getByText(`Now starting at ${toUSD(800)}/mo`)).toBeInTheDocument();
    });

    it('does not show the discounted rent when the discount window is in the past', () => {
        const discountedRentStartDate = momentToDate(moment().subtract(10, 'days'));
        const discountedRentEndDate = momentToDate(moment().subtract(5, 'days'));

        const {container} = render(<UnitPrice unit={unit({
            rent: 1200,
            discountedRent: 800,
            discountedRentStartDate,
            discountedRentEndDate
        })}/>);

        expect(container.querySelector('.strike-through')).not.toBeInTheDocument();
        expect(screen.queryByText(`Now starting at ${toUSD(800)}/mo`)).not.toBeInTheDocument();
    });

    it('does not show the discounted rent when discountedRent is missing', () => {
        const discountedRentStartDate = momentToDate(moment().subtract(2, 'days'));
        const discountedRentEndDate = momentToDate(moment().add(2, 'days'));

        const {container} = render(<UnitPrice unit={unit({
            discountedRent: null as unknown as number,
            discountedRentStartDate,
            discountedRentEndDate
        })}/>);

        expect(container.querySelector('.strike-through')).not.toBeInTheDocument();
    });
});
