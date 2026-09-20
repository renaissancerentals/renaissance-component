import {describe, expect, it} from 'vitest';
import {render} from '@testing-library/react';
import {TeamCardSkeleton} from './TeamCardSkeleton';

describe('TeamCardSkeleton', () => {
    it('renders a team-card with a circular photo placeholder and text placeholders', () => {
        const {container} = render(<TeamCardSkeleton/>);

        expect(container.querySelector('.team-card')).toBeInTheDocument();

        const skeletons = container.querySelectorAll('.react-loading-skeleton');
        expect(skeletons.length).toBe(3);
    });

    it('renders one skeleton within an h4 and one within a p, matching the card layout', () => {
        const {container} = render(<TeamCardSkeleton/>);

        expect(container.querySelector('h4 .react-loading-skeleton')).toBeInTheDocument();
        expect(container.querySelector('p .react-loading-skeleton')).toBeInTheDocument();
    });
});
