import {describe, expect, it, vi} from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {PriceFilter} from './Price';

describe('PriceFilter', () => {
    const openDropdown = async (user: ReturnType<typeof userEvent.setup>) => {
        await user.click(screen.getByText('Price'));
    };

    it('renders a range slider with the given min and max values', async () => {
        const user = userEvent.setup();
        const {container} = render(<PriceFilter minValue={500} maxValue={1500} setMinValue={vi.fn()}
                                                  setMaxValue={vi.fn()}/>);
        await openDropdown(user);

        const ranges = container.querySelectorAll('input.muncher-range');
        expect(ranges).toHaveLength(2);
        expect((ranges[0] as HTMLInputElement).value).toBe('500');
        expect((ranges[1] as HTMLInputElement).value).toBe('1500');
    });

    it('calls setMinValue when the min range input changes', async () => {
        const user = userEvent.setup();
        const setMinValue = vi.fn();
        const {container} = render(<PriceFilter minValue={500} maxValue={1500} setMinValue={setMinValue}
                                                  setMaxValue={vi.fn()}/>);
        await openDropdown(user);

        const [minInput] = container.querySelectorAll('input.muncher-range');
        fireEvent.change(minInput, {target: {value: '700'}});

        expect(setMinValue).toHaveBeenCalledWith(700);
    });

    it('calls setMaxValue when the max range input changes', async () => {
        const user = userEvent.setup();
        const setMaxValue = vi.fn();
        const {container} = render(<PriceFilter minValue={500} maxValue={1500} setMinValue={vi.fn()}
                                                  setMaxValue={setMaxValue}/>);
        await openDropdown(user);

        const [, maxInput] = container.querySelectorAll('input.muncher-range');
        fireEvent.change(maxInput, {target: {value: '1200'}});

        expect(setMaxValue).toHaveBeenCalledWith(1200);
    });
});
