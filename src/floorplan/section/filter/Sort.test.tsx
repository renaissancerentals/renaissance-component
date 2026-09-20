import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Sort} from './Sort';

describe('Sort', () => {
    it('renders the current sort selection as the dropdown trigger', () => {
        render(<Sort sortBy="featured" handleSortChange={vi.fn()}/>);

        expect(screen.getByRole('button', {name: /Featured/})).toBeInTheDocument();
    });

    it('calls handleSortChange with the selected sort field when an option is clicked', async () => {
        const user = userEvent.setup();
        const handleSortChange = vi.fn();
        render(<Sort sortBy="featured" handleSortChange={handleSortChange}/>);

        await user.click(screen.getAllByRole('button')[0]);
        const priceAscButton = screen.getAllByRole('button', {name: /Price/})[0];
        await user.click(priceAscButton);

        expect(handleSortChange).toHaveBeenCalledWith('priceAsc');
    });

    it('marks the active sort option once the dropdown is open', async () => {
        const user = userEvent.setup();
        render(<Sort sortBy="bedroomsDesc" handleSortChange={vi.fn()}/>);

        await user.click(screen.getAllByRole('button')[0]);

        const activeButton = screen.getAllByRole('button', {name: /Bedrooms/})[2];
        expect(activeButton).toHaveClass('muncher-button--active');
    });
});
