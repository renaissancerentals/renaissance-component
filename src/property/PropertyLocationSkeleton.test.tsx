import {describe, expect, it} from 'vitest';
import {render} from '@testing-library/react';
import {PropertyLocationSkeleton} from './PropertyLocationSkeleton';

describe('PropertyLocationSkeleton', () => {
    it('renders a property-location wrapper with a plain skeleton and a map skeleton', () => {
        const {container} = render(<PropertyLocationSkeleton/>);

        expect(container.querySelector('.property-location')).toBeInTheDocument();

        const skeletons = container.querySelectorAll('.react-loading-skeleton');
        expect(skeletons.length).toBe(2);
        expect(container.querySelector('.map-skeleton')).toBeInTheDocument();
    });
});
