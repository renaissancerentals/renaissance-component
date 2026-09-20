import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {UnitsHeader} from './UnitsHeader';
import {UnitCardData} from '../data/Unit';
import {FloorplanStyle, MAX_RENT, MIN_RENT} from '../../floorplan/data/Floorplan';
import {FloorplanFilters} from '../../floorplan/data/FloorplanFilters';

const unit = (overrides: Partial<UnitCardData> = {}): UnitCardData => ({
    id: 'u1',
    rent: 1000,
    squareFoot: 800,
    moveInDate: '2020-01-01',
    availabilityExtensionMonths: null,
    floorplanId: 'fp1',
    floorplanName: 'The Aspen',
    bedroom: 1,
    bathroom: 1,
    coverImage: '',
    featured: false,
    style: FloorplanStyle.APARTMENT,
    specialRent: null as unknown as number,
    specialRentStartDate: '',
    specialRentEndDate: '',
    address: '',
    zipcode: '',
    virtualTourLink: '',
    videoTourLink: '',
    photosFolderId: '',
    webSpecials: [],
    ...overrides
});

const filters = (): FloorplanFilters => ({
    bedroom: new Set([1, 2]),
    availability: new Set(['AVAILABLE NOW']),
    style: new Set([FloorplanStyle.APARTMENT, FloorplanStyle.STUDIO])
});

describe('UnitsHeader', () => {
    it('renders the given title', () => {
        render(<UnitsHeader title="Our Units" filters={filters()} units={[unit()]} setCurrentUnits={vi.fn()}
                             currentUnitCounts={1}/>);

        expect(screen.getByText('Our Units')).toBeInTheDocument();
    });

    it('renders the current unit count', () => {
        render(<UnitsHeader title="Units" filters={filters()} units={[unit()]} setCurrentUnits={vi.fn()}
                             currentUnitCounts={5}/>);

        expect(screen.getByText(/Total: 5 Results/)).toBeInTheDocument();
    });

    it('renders the Filter By and Sort By labels', () => {
        render(<UnitsHeader title="Units" filters={filters()} units={[unit()]} setCurrentUnits={vi.fn()}
                             currentUnitCounts={0}/>);

        expect(screen.getByText('Filter By:')).toBeInTheDocument();
        expect(screen.getByText('Sort By:')).toBeInTheDocument();
    });

    it('renders no filter pills when no default filters are given', () => {
        const {container} = render(<UnitsHeader title="Units" filters={filters()} units={[unit()]}
                                                 setCurrentUnits={vi.fn()} currentUnitCounts={1}/>);

        expect(container.querySelectorAll('.muncher-pill').length).toBe(0);
    });

    it('renders a bedroom pill when a default bedroom filter is given', () => {
        render(<UnitsHeader title="Units" filters={filters()} units={[unit()]} setCurrentUnits={vi.fn()}
                             currentUnitCounts={1} defaultBedRooms={2}/>);

        expect(screen.getByText('2 bedroom')).toBeInTheDocument();
    });

    it('renders a price pill and removes it when default min/max rent differ from the global defaults', () => {
        const setCurrentUnits = vi.fn();
        render(<UnitsHeader title="Units" filters={filters()} units={[unit()]} setCurrentUnits={setCurrentUnits}
                             currentUnitCounts={1} defaultMinRent={500} defaultMaxRent={1500}/>);

        expect(screen.getByText('$500 - $1500')).toBeInTheDocument();
    });

    it('does not render a price pill when min/max rent equal the global defaults', () => {
        render(<UnitsHeader title="Units" filters={filters()} units={[unit()]} setCurrentUnits={vi.fn()}
                             currentUnitCounts={1}/>);

        expect(screen.queryByText(`$${MIN_RENT} - $${MAX_RENT}`)).not.toBeInTheDocument();
    });

    it('applies bedroom filtering and calls setCurrentUnits when a bedroom checkbox is toggled', async () => {
        const setCurrentUnits = vi.fn();
        const user = userEvent.setup();
        const oneBed = unit({id: 'one-bed', bedroom: 1});
        const twoBed = unit({id: 'two-bed', bedroom: 2});

        render(<UnitsHeader title="Units" filters={filters()} units={[oneBed, twoBed]}
                             setCurrentUnits={setCurrentUnits} currentUnitCounts={2}/>);

        await user.click(screen.getByText('Bedroom'));
        await user.click(screen.getByLabelText('1'));

        expect(setCurrentUnits).toHaveBeenCalled();
        const lastCallResult = setCurrentUnits.mock.calls[setCurrentUnits.mock.calls.length - 1][0];
        expect(lastCallResult.map((u: UnitCardData) => u.id)).toEqual(['one-bed']);
    });

    it('removes a bedroom pill and re-filters when its close handler is clicked', async () => {
        const setCurrentUnits = vi.fn();
        const user = userEvent.setup();
        const oneBed = unit({id: 'one-bed', bedroom: 1});
        const twoBed = unit({id: 'two-bed', bedroom: 2});

        render(<UnitsHeader title="Units" filters={filters()} units={[oneBed, twoBed]}
                             setCurrentUnits={setCurrentUnits} currentUnitCounts={2} defaultBedRooms={1}/>);

        const pill = screen.getByText('1 bedroom').closest('.muncher-pill') as HTMLElement;
        const closeButton = pill.querySelector('.close');
        expect(closeButton).toBeTruthy();
        await user.click(closeButton!);

        expect(setCurrentUnits).toHaveBeenCalled();
    });
});
