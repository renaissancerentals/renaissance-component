import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ShortTermSort} from './ShortTermSort';

describe('ShortTermSort', () => {
    it('shows the current sort field label on the trigger', () => {
        render(<ShortTermSort sortBy="priceAsc" handleSortChange={vi.fn()}/>);

        expect(screen.getByText('Price')).toBeInTheDocument();
    });

    it('does not show the other sort options until the dropdown is opened', () => {
        render(<ShortTermSort sortBy="priceAsc" handleSortChange={vi.fn()}/>);

        expect(screen.queryByText('Bedrooms')).not.toBeInTheDocument();
    });

    it('reveals every sort option (price asc/desc, bedrooms asc/desc) once the trigger is clicked', async () => {
        const {container} = render(<ShortTermSort sortBy="priceAsc" handleSortChange={vi.fn()}/>);

        await userEvent.click(screen.getByText('Price'));

        const options = container.querySelectorAll('.sort-filters button');
        expect(options.length).toBe(4);
    });

    it('calls handleSortChange with "bedroomsAsc" when the Bedrooms (asc) option is clicked', async () => {
        const handleSortChange = vi.fn();
        const {container} = render(<ShortTermSort sortBy="priceAsc" handleSortChange={handleSortChange}/>);

        await userEvent.click(screen.getByText('Price'));
        const options = container.querySelectorAll('.sort-filters button');
        await userEvent.click(options[2]);

        expect(handleSortChange).toHaveBeenCalledWith('bedroomsAsc');
    });

    it('calls handleSortChange with "priceDesc" when the Price (desc) option is clicked', async () => {
        const handleSortChange = vi.fn();
        const {container} = render(<ShortTermSort sortBy="priceAsc" handleSortChange={handleSortChange}/>);

        await userEvent.click(screen.getByText('Price'));
        const options = container.querySelectorAll('.sort-filters button');
        await userEvent.click(options[1]);

        expect(handleSortChange).toHaveBeenCalledWith('priceDesc');
    });

    it('closes the dropdown after a selection is made', async () => {
        const {container} = render(<ShortTermSort sortBy="priceAsc" handleSortChange={vi.fn()}/>);

        await userEvent.click(screen.getByText('Price'));
        const options = container.querySelectorAll('.sort-filters button');
        await userEvent.click(options[2]);

        expect(screen.queryByText('Bedrooms')).not.toBeInTheDocument();
    });
});
