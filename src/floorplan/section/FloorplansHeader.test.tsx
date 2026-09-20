import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {FloorplansHeader} from './FloorplansHeader';
import {FloorplanCardData, FloorplanStyle} from '../data/Floorplan';
import {FloorplanFilters} from '../data/FloorplanFilters';

const floorplan = (overrides: Partial<FloorplanCardData> = {}): FloorplanCardData => ({
    id: 'studio-a',
    name: 'Studio A',
    bedroom: 1,
    bathroom: 1,
    coverImage: '',
    featured: false,
    style: FloorplanStyle.STUDIO,
    specialRent: null as unknown as number,
    specialRentStartDate: '',
    specialRentEndDate: '',
    address: '123 Main St',
    zipcode: '47401',
    virtualTourLink: '',
    videoTourLink: '',
    photosFolderId: '',
    units: [{id: 'u1', rent: 1000, squareFoot: 600, moveInDate: '2020-01-01', availabilityExtensionMonths: null}],
    webSpecials: [],
    ...overrides
});

const filters: FloorplanFilters = {
    bedroom: new Set([1, 2]),
    availability: new Set(['Available Now']),
    style: new Set([FloorplanStyle.STUDIO, FloorplanStyle.TOWN_HOME])
};

describe('FloorplansHeader', () => {
    it('renders the title and the current result count', () => {
        render(
            <FloorplansHeader title="Floor plans" filters={filters} floorplans={[floorplan()]}
                               setCurrentFloorplans={vi.fn()} currentFloorplansCount={4}/>
        );

        expect(screen.getByRole('heading', {name: 'Floor plans'})).toBeInTheDocument();
        expect(screen.getByText(/Total: 4 Results/)).toBeInTheDocument();
    });

    it('renders a removable pill for a default bedroom filter', () => {
        render(
            <FloorplansHeader filters={filters} floorplans={[floorplan()]} setCurrentFloorplans={vi.fn()}
                               currentFloorplansCount={1} defaultBedRooms={1}/>
        );

        expect(screen.getByText('1 bedroom')).toBeInTheDocument();
    });

    it('does not render a price pill when the rent range is left at its default', () => {
        render(
            <FloorplansHeader filters={filters} floorplans={[floorplan()]} setCurrentFloorplans={vi.fn()}
                               currentFloorplansCount={1}/>
        );

        expect(screen.queryByText(/^\$0 - \$4000$/)).not.toBeInTheDocument();
    });

    it('calls setCurrentFloorplans when a bedroom filter checkbox is toggled', async () => {
        const user = userEvent.setup();
        const setCurrentFloorplans = vi.fn();
        render(
            <FloorplansHeader filters={filters} floorplans={[floorplan()]} setCurrentFloorplans={setCurrentFloorplans}
                               currentFloorplansCount={1}/>
        );

        await user.click(screen.getByText('Bedroom'));
        await user.click(screen.getByLabelText('1'));

        expect(setCurrentFloorplans).toHaveBeenCalledWith([floorplan()]);
    });

    it('calls setCurrentFloorplans with an empty list when the active bedroom filter excludes every floorplan', async () => {
        const user = userEvent.setup();
        const setCurrentFloorplans = vi.fn();
        render(
            <FloorplansHeader filters={filters} floorplans={[floorplan()]} setCurrentFloorplans={setCurrentFloorplans}
                               currentFloorplansCount={1}/>
        );

        await user.click(screen.getByText('Bedroom'));
        await user.click(screen.getByLabelText('2'));

        expect(setCurrentFloorplans).toHaveBeenCalledWith([]);
    });

    it('removes the pill and re-filters when the pill close handler is clicked', async () => {
        const user = userEvent.setup();
        const setCurrentFloorplans = vi.fn();
        const {container} = render(
            <FloorplansHeader filters={filters} floorplans={[floorplan()]} setCurrentFloorplans={setCurrentFloorplans}
                               currentFloorplansCount={1} defaultBedRooms={2}/>
        );

        expect(screen.getByText('2 bedroom')).toBeInTheDocument();
        setCurrentFloorplans.mockClear();

        await user.click(container.querySelector('.muncher-pill .close')!);

        expect(screen.queryByText('2 bedroom')).not.toBeInTheDocument();
        expect(setCurrentFloorplans).toHaveBeenCalledWith([floorplan()]);
    });
});
