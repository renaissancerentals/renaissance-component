import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {SpecialOfferButton} from './SpecialOfferButton';

describe('SpecialOfferButton', () => {
    it('renders the "Special Offer" button with a star icon', () => {
        const {container} = render(
            <SpecialOfferButton onMouseEnter={() => {}} onMouseLeave={() => {}}/>
        );

        expect(screen.getByText('Special Offer')).toBeInTheDocument();
        expect(container.querySelector('span.special-offer-button')).toBeInTheDocument();
        expect(container.querySelector('img.star-icon')).toHaveAttribute('alt', 'star icon');
    });

    it('fires onMouseEnter and onMouseLeave when hovered', async () => {
        const user = userEvent.setup();
        const onMouseEnter = vi.fn();
        const onMouseLeave = vi.fn();

        render(<SpecialOfferButton onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}/>);

        const button = screen.getByText('Special Offer').closest('button') as HTMLElement;
        await user.hover(button);
        expect(onMouseEnter).toHaveBeenCalledTimes(1);

        await user.unhover(button);
        expect(onMouseLeave).toHaveBeenCalledTimes(1);
    });
});
