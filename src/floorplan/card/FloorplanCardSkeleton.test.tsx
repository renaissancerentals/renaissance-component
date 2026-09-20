import {describe, expect, it} from 'vitest';
import {render} from '@testing-library/react';
import {FloorplanCardSkeleton} from './FloorplanCardSkeleton';

describe('FloorplanCardSkeleton', () => {
    it('renders a floorplan-card with an image placeholder and a footer placeholder', () => {
        const {container} = render(<FloorplanCardSkeleton/>);

        expect(container.querySelector('.floorplan-card')).toBeInTheDocument();
        expect(container.querySelector('.floorplan-card-footer')).toBeInTheDocument();

        const skeletons = container.querySelectorAll('.react-loading-skeleton');
        expect(skeletons.length).toBe(2);
    });

    it('sizes the image placeholder taller than the footer placeholder', () => {
        const {container} = render(<FloorplanCardSkeleton/>);

        const skeletons = container.querySelectorAll('.react-loading-skeleton');
        expect(skeletons[0]).toHaveStyle({height: '250px'});
        expect(skeletons[1]).toHaveStyle({height: '50px'});
    });
});
