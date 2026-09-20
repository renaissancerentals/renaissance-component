import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ShortTermStyleFilter} from './ShortTermStyleFilter';
import {ShortTermStyle} from './data/ShortTerm';

describe('ShortTermStyleFilter', () => {
    const filters = new Set([ShortTermStyle.APARTMENT, ShortTermStyle.TOWN_HOME]);

    it('shows the "Home Type" trigger label', () => {
        render(<ShortTermStyleFilter filters={filters} handleFilterChange={vi.fn()} currentFilters={[]}/>);

        expect(screen.getByText('Home Type')).toBeInTheDocument();
    });

    it('does not show the style checkboxes until the dropdown is opened', () => {
        render(<ShortTermStyleFilter filters={filters} handleFilterChange={vi.fn()} currentFilters={[]}/>);

        expect(screen.queryByLabelText('Apartment')).not.toBeInTheDocument();
    });

    it('shows a labeled checkbox per style once opened', async () => {
        render(<ShortTermStyleFilter filters={filters} handleFilterChange={vi.fn()} currentFilters={[]}/>);

        await userEvent.click(screen.getByText('Home Type'));

        expect(screen.getByLabelText('Apartment')).toBeInTheDocument();
        expect(screen.getByLabelText('Town home')).toBeInTheDocument();
    });

    it('calls handleFilterChange with the clicked style', async () => {
        const handleFilterChange = vi.fn();
        render(<ShortTermStyleFilter filters={filters} handleFilterChange={handleFilterChange}
                                      currentFilters={[]}/>);

        await userEvent.click(screen.getByText('Home Type'));
        await userEvent.click(screen.getByLabelText('Apartment'));

        expect(handleFilterChange).toHaveBeenCalledWith(ShortTermStyle.APARTMENT);
    });

    it('renders no checkboxes for an empty filters set', async () => {
        render(<ShortTermStyleFilter filters={new Set()} handleFilterChange={vi.fn()} currentFilters={[]}/>);

        await userEvent.click(screen.getByText('Home Type'));

        expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
    });
});
