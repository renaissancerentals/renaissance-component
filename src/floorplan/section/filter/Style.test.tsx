import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {StyleFilter} from './Style';
import {FloorplanStyle} from '../../data/Floorplan';

describe('StyleFilter', () => {
    const openDropdown = async (user: ReturnType<typeof userEvent.setup>) => {
        await user.click(screen.getByText('Home Type'));
    };

    it('renders a checkbox with a humanized label for each style', async () => {
        const user = userEvent.setup();
        render(<StyleFilter filters={new Set([FloorplanStyle.STUDIO, FloorplanStyle.TOWN_HOME])}
                             handleFilterChange={vi.fn()} currentFilters={[]}/>);
        await openDropdown(user);

        expect(screen.getAllByRole('checkbox')).toHaveLength(2);
        expect(screen.getByLabelText('Studio')).toBeInTheDocument();
        expect(screen.getByLabelText('Town home')).toBeInTheDocument();
    });

    it('calls handleFilterChange with the selected style when a checkbox is clicked', async () => {
        const user = userEvent.setup();
        const handleFilterChange = vi.fn();
        render(<StyleFilter filters={new Set([FloorplanStyle.STUDIO])} handleFilterChange={handleFilterChange}
                             currentFilters={[]}/>);
        await openDropdown(user);

        await user.click(screen.getByLabelText('Studio'));

        expect(handleFilterChange).toHaveBeenCalledWith(FloorplanStyle.STUDIO);
    });
});
