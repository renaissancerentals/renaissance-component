import {describe, expect, it} from 'vitest';
import {render} from '@testing-library/react';
import {FloorplansHeaderSkeleton} from './FloorplansHeaderSekeleton';

describe('FloorplansHeaderSkeleton', () => {
    it('renders the header skeleton', () => {
        const {container} = render(<FloorplansHeaderSkeleton/>);

        expect(container.querySelector('header.units-header')).toBeInTheDocument();
    });

    it('applies the container class when isCondensed is falsy', () => {
        const {container} = render(<FloorplansHeaderSkeleton isCondensed={false}/>);

        expect(container.querySelector('header.units-header > div.container')).toBeInTheDocument();
    });

    it('omits the container class when isCondensed is true', () => {
        const {container} = render(<FloorplansHeaderSkeleton isCondensed={true}/>);

        expect(container.querySelector('header.units-header > div.container')).not.toBeInTheDocument();
    });
});
