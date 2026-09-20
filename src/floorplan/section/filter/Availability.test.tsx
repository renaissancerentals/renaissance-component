import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {AvailabilityFilter, sortAvailability} from './Availability';

describe('sortAvailability', () => {
    it('sorts month/year strings chronologically', () => {
        expect(['Mar 2026', 'Jan 2026', 'Feb 2026'].sort(sortAvailability)).toEqual(['Jan 2026', 'Feb 2026', 'Mar 2026']);
    });
});

describe('AvailabilityFilter', () => {
    const openDropdown = async (user: ReturnType<typeof userEvent.setup>) => {
        await user.click(screen.getByText('Availability'));
    };

    it('renders one checkbox per filter, sorted chronologically', async () => {
        const user = userEvent.setup();
        render(<AvailabilityFilter filters={new Set(['Mar 2026', 'Jan 2026'])} handleFilterChange={vi.fn()}
                                    currentFilters={[]}/>);
        await openDropdown(user);

        expect(screen.getAllByRole('checkbox')).toHaveLength(2);
        expect(screen.getByLabelText('Jan 2026')).toBeInTheDocument();
        expect(screen.getByLabelText('Mar 2026')).toBeInTheDocument();
    });

    it('calls handleFilterChange with the selected availability when a checkbox is clicked', async () => {
        const user = userEvent.setup();
        const handleFilterChange = vi.fn();
        render(<AvailabilityFilter filters={new Set(['Jan 2026'])} handleFilterChange={handleFilterChange}
                                    currentFilters={[]}/>);
        await openDropdown(user);

        await user.click(screen.getByLabelText('Jan 2026'));

        expect(handleFilterChange).toHaveBeenCalledWith('Jan 2026');
    });
});
