import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import moment from 'moment/moment';
import {FloorplanPrice} from './FloorplanPrice';
import {momentToDate, toUSD} from '../../utils/Utils';

describe('FloorplanPrice', () => {
    it('renders "-" when there are no units', () => {
        render(<FloorplanPrice unitRents={[]}/>);

        expect(screen.getByText('-')).toBeInTheDocument();
    });

    it('renders a single price when all units share the same rent', () => {
        const {container} = render(<FloorplanPrice unitRents={[{rent: 1200}, {rent: 1200}]}/>);

        expect(screen.getByText(toUSD(1200))).toBeInTheDocument();
        expect(container.querySelector('.strike-through')).not.toBeInTheDocument();
    });

    it('renders a min - max range when unit rents differ', () => {
        render(<FloorplanPrice unitRents={[{rent: 1000}, {rent: 1500}]}/>);

        expect(screen.getByText(`${toUSD(1000)} - ${toUSD(1500)}`)).toBeInTheDocument();
    });

    it('does not apply the floorplan-price-inverted class by default', () => {
        const {container} = render(<FloorplanPrice unitRents={[{rent: 1200}]}/>);

        expect(container.querySelector('.floorplan-price')).toBeInTheDocument();
        expect(container.querySelector('.floorplan-price-inverted')).not.toBeInTheDocument();
    });

    it('applies the floorplan-price-inverted class when invertColor is true', () => {
        const {container} = render(<FloorplanPrice unitRents={[{rent: 1200}]} invertColor/>);

        expect(container.querySelector('.floorplan-price-inverted')).toBeInTheDocument();
    });

    it('shows a strike-through price and the special rent when within the special rent window', () => {
        const specialRentStartDate = momentToDate(moment().subtract(2, 'days'));
        const specialRentEndDate = momentToDate(moment().add(2, 'days'));

        const {container} = render(
            <FloorplanPrice
                unitRents={[{rent: 1200}]}
                specialRent={800}
                specialRentStartDate={specialRentStartDate}
                specialRentEndDate={specialRentEndDate}
            />
        );

        expect(container.querySelector('.strike-through')).toBeInTheDocument();
        expect(screen.getByText(`Now starting at ${toUSD(800)}/mo`)).toBeInTheDocument();
    });

    it('does not show the special rent when the special rent window is in the past', () => {
        const specialRentStartDate = momentToDate(moment().subtract(10, 'days'));
        const specialRentEndDate = momentToDate(moment().subtract(5, 'days'));

        const {container} = render(
            <FloorplanPrice
                unitRents={[{rent: 1200}]}
                specialRent={800}
                specialRentStartDate={specialRentStartDate}
                specialRentEndDate={specialRentEndDate}
            />
        );

        expect(container.querySelector('.strike-through')).not.toBeInTheDocument();
        expect(screen.queryByText(`Now starting at ${toUSD(800)}/mo`)).not.toBeInTheDocument();
    });

    it('does not show the special rent when specialRent is missing', () => {
        const specialRentStartDate = momentToDate(moment().subtract(2, 'days'));
        const specialRentEndDate = momentToDate(moment().add(2, 'days'));

        const {container} = render(
            <FloorplanPrice
                unitRents={[{rent: 1200}]}
                specialRentStartDate={specialRentStartDate}
                specialRentEndDate={specialRentEndDate}
            />
        );

        expect(container.querySelector('.strike-through')).not.toBeInTheDocument();
    });
});
