import {describe, expect, it} from 'vitest';
import {render} from '@testing-library/react';
import {LeaseOfficeSkeleton} from './LeaseOfficeSkeleton';

describe('LeaseOfficeSkeleton', () => {
    it('renders a lease-office wrapper with four skeleton placeholders', () => {
        const {container} = render(<LeaseOfficeSkeleton/>);

        expect(container.querySelector('.lease-office')).toBeInTheDocument();

        const skeletons = container.querySelectorAll('.react-loading-skeleton');
        expect(skeletons.length).toBe(4);
    });
});
