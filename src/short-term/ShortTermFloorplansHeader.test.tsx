import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ShortTermFloorplansHeader} from './ShortTermFloorplansHeader';
import {FloorplanShortTerm, ShortTermStyle} from './data/ShortTerm';
import {ShortTermFilters} from './data/ShortTermFilters';

const floorplans: FloorplanShortTerm[] = [
    {id: 'a', name: 'A', bedroom: 1, style: ShortTermStyle.APARTMENT} as FloorplanShortTerm,
    {id: 'b', name: 'B', bedroom: 2, style: ShortTermStyle.TOWN_HOME} as FloorplanShortTerm,
];

const filters: ShortTermFilters = {
    bedroom: new Set([1, 2]),
    style: new Set([ShortTermStyle.APARTMENT, ShortTermStyle.TOWN_HOME]),
};

describe('ShortTermFloorplansHeader', () => {
    it('renders the title and current result count', () => {
        render(<ShortTermFloorplansHeader title="Floor plans" filters={filters} floorplans={floorplans}
                                           setCurrentFloorplans={vi.fn()} currentFloorplansCount={2}/>);

        expect(screen.getByText('Floor plans')).toBeInTheDocument();
        expect(screen.getByText(/Total: 2 Results/)).toBeInTheDocument();
    });

    it('pre-selects a bedroom pill from defaultBedRooms and removes the filter when the pill is closed', async () => {
        const setCurrentFloorplans = vi.fn();
        const {container} = render(<ShortTermFloorplansHeader filters={filters} floorplans={floorplans}
                                                                setCurrentFloorplans={setCurrentFloorplans}
                                                                currentFloorplansCount={1} defaultBedRooms={2}/>);

        expect(screen.getByText('2 bedroom')).toBeInTheDocument();

        const closeIcon = container.querySelector('.muncher-pill .close') as HTMLElement;
        await userEvent.click(closeIcon);

        expect(setCurrentFloorplans).toHaveBeenCalledTimes(1);
        const result = setCurrentFloorplans.mock.calls[0][0] as FloorplanShortTerm[];
        expect(result.map(f => f.id).sort()).toEqual(['a', 'b']);
    });

    it('filters floorplans by style when a style checkbox is toggled', async () => {
        const setCurrentFloorplans = vi.fn();
        render(<ShortTermFloorplansHeader filters={filters} floorplans={floorplans}
                                           setCurrentFloorplans={setCurrentFloorplans} currentFloorplansCount={2}/>);

        await userEvent.click(screen.getByText('Home Type'));
        await userEvent.click(screen.getByLabelText('Apartment'));

        expect(setCurrentFloorplans).toHaveBeenCalledTimes(1);
        const result = setCurrentFloorplans.mock.calls[0][0] as FloorplanShortTerm[];
        expect(result.map(f => f.id)).toEqual(['a']);
    });

    it('re-sorts floorplans when a different sort option is chosen', async () => {
        const setCurrentFloorplans = vi.fn();
        const {container} = render(<ShortTermFloorplansHeader filters={filters} floorplans={floorplans}
                                                                setCurrentFloorplans={setCurrentFloorplans}
                                                                currentFloorplansCount={2}/>);

        await userEvent.click(screen.getByText('Price'));
        const sortOptions = container.querySelectorAll('.sort-filters button');
        await userEvent.click(sortOptions[3]);

        expect(setCurrentFloorplans).toHaveBeenCalledTimes(1);
        const result = setCurrentFloorplans.mock.calls[0][0] as FloorplanShortTerm[];
        expect(result.map(f => f.bedroom)).toEqual([2, 1]);
    });
});
