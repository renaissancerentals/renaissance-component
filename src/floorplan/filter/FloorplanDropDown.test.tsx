import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {DropDownFilter} from './FloorplanDropDown';

describe('DropDownFilter', () => {
    it('renders the label', () => {
        render(<DropDownFilter label="Bedrooms">content</DropDownFilter>);

        expect(screen.getByText('Bedrooms')).toBeInTheDocument();
    });

    it('does not render the children until opened', () => {
        render(<DropDownFilter label="Bedrooms">
            <div>Bedroom options</div>
        </DropDownFilter>);

        expect(screen.queryByText('Bedroom options')).not.toBeInTheDocument();
    });

    it('shows the children after clicking the label button', async () => {
        const user = userEvent.setup();
        render(<DropDownFilter label="Bedrooms">
            <div>Bedroom options</div>
        </DropDownFilter>);

        await user.click(screen.getByText('Bedrooms'));

        expect(screen.getByText('Bedroom options')).toBeInTheDocument();
    });

    it('renders inside a unit-dropdown wrapper', () => {
        const {container} = render(<DropDownFilter label="Bedrooms">content</DropDownFilter>);

        expect(container.querySelector('.unit-dropdown')).toBeInTheDocument();
    });
});
