import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {BedroomFilter, sortBedrooms} from './Bedroom';

describe('sortBedrooms', () => {
    it('sorts numbers ascending', () => {
        expect([3, 1, 2].sort(sortBedrooms)).toEqual([1, 2, 3]);
    });
});

describe('BedroomFilter', () => {
    const openDropdown = async (user: ReturnType<typeof userEvent.setup>) => {
        await user.click(screen.getByText('Bedroom'));
    };

    it('renders one checkbox per filter, sorted ascending', async () => {
        const user = userEvent.setup();
        render(<BedroomFilter filters={new Set([3, 1, 2])} handleFilterChange={vi.fn()} currentFilters={[]}/>);
        await openDropdown(user);

        const checkboxes = screen.getAllByRole('checkbox');
        expect(checkboxes).toHaveLength(3);
        expect(screen.getByLabelText('1')).toBeInTheDocument();
        expect(screen.getByLabelText('2')).toBeInTheDocument();
        expect(screen.getByLabelText('3')).toBeInTheDocument();
    });

    it('calls handleFilterChange with the selected bedroom count when a checkbox is clicked', async () => {
        const user = userEvent.setup();
        const handleFilterChange = vi.fn();
        render(<BedroomFilter filters={new Set([1, 2])} handleFilterChange={handleFilterChange} currentFilters={[]}/>);
        await openDropdown(user);

        await user.click(screen.getByLabelText('2'));

        expect(handleFilterChange).toHaveBeenCalledWith(2);
    });
});
