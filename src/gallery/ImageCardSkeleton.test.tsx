import {describe, expect, it} from 'vitest';
import {render} from '@testing-library/react';
import {ImageCardSkeleton} from './ImageCardSkeleton';

describe('ImageCardSkeleton', () => {
    it('renders a skeleton placeholder', () => {
        const {container} = render(<ImageCardSkeleton width={150} height={200}/>);

        expect(container.querySelector('.react-loading-skeleton')).toBeInTheDocument();
    });

    it('applies the given width and height to the skeleton', () => {
        const {container} = render(<ImageCardSkeleton width={300} height={100}/>);

        const skeleton = container.querySelector('.react-loading-skeleton') as HTMLElement;
        expect(skeleton.style.width).toBe('300px');
        expect(skeleton.style.height).toBe('100px');
    });
});
