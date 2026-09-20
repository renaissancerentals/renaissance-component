import {describe, expect, it} from 'vitest';
import {render} from '@testing-library/react';
import {MapSection} from './MapSection';

describe('MapSection', () => {
    it('renders an iframe with the given src inside a section.section-map', () => {
        const src = 'https://www.google.com/maps/embed/v1/place?q=1100 N Walnut St., 47404';
        const {container} = render(<MapSection src={src}/>);

        const section = container.querySelector('section.section-map');
        expect(section).toBeInTheDocument();

        const iframe = container.querySelector('iframe');
        expect(iframe).toBeInTheDocument();
        expect(iframe).toHaveAttribute('src', src);
        expect(iframe).toHaveAttribute('title', 'map');
        expect(iframe).toHaveAttribute('loading', 'lazy');
    });
});
