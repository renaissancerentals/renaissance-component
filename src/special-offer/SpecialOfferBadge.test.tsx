import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {SpecialOfferBadge} from './SpecialOfferBadge';

describe('SpecialOfferBadge', () => {
    it('renders the "Special Offer" badge with a star icon', () => {
        const {container} = render(<SpecialOfferBadge/>);

        expect(screen.getByText('Special Offer')).toBeInTheDocument();
        expect(container.querySelector('span.special-offer-badge')).toBeInTheDocument();
        expect(container.querySelector('img.star-icon')).toHaveAttribute('alt', 'star icon');
    });
});
