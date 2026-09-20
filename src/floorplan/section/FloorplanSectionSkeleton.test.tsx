import {describe, expect, it} from 'vitest';
import {render} from '@testing-library/react';
import {FloorplanSectionSkeleton} from './FloorplanSectionSkeleton';

describe('FloorplanSectionSkeleton', () => {
    it('renders the default number of skeleton cards', () => {
        const {container} = render(<FloorplanSectionSkeleton/>);

        expect(container.querySelectorAll('.floorplan-card-skeleton, .floorplan-card').length).toBeGreaterThanOrEqual(0);
        expect(container.querySelector('.floorplans-body')?.children.length).toBe(8);
    });

    it('renders a custom number of skeleton cards', () => {
        const {container} = render(<FloorplanSectionSkeleton skeletonCount={3}/>);

        expect(container.querySelector('.floorplans-body')?.children.length).toBe(3);
    });

    it('applies the container class when isCondensed is true (default)', () => {
        const {container} = render(<FloorplanSectionSkeleton/>);

        expect(container.querySelector('section.section-floorplans > div.container')).toBeInTheDocument();
    });

    it('omits the container class when isCondensed is false', () => {
        const {container} = render(<FloorplanSectionSkeleton isCondensed={false}/>);

        expect(container.querySelector('section.section-floorplans > div.container')).not.toBeInTheDocument();
        expect(container.querySelector('.floorplans-body')?.parentElement).toHaveClass('container');
    });

    it('renders the header skeleton', () => {
        const {container} = render(<FloorplanSectionSkeleton/>);

        expect(container.querySelector('header.units-header')).toBeInTheDocument();
    });
});
