import {describe, expect, it} from 'vitest';
import {render} from '@testing-library/react';
import {GridGallerySkeleton} from './GridGallerySkeleton';

describe('GridGallerySkeleton', () => {
    it('renders the grid gallery skeleton container', () => {
        const {container} = render(<GridGallerySkeleton/>);

        expect(container.querySelector('.grid-gallery')).toBeInTheDocument();
        expect(container.querySelector('.gallery-hero-one')).toBeInTheDocument();
    });

    it('renders a skeleton placeholder', () => {
        const {container} = render(<GridGallerySkeleton/>);

        expect(container.querySelector('.react-loading-skeleton')).toBeInTheDocument();
    });
});
