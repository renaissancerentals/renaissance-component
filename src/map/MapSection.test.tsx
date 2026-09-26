import {describe, expect, it} from 'vitest';
import {render} from '@testing-library/react';
import {MapSection} from './MapSection';

describe('MapSection', () => {
    it('renders an img with the given src inside a section.section-map', () => {
        const src = 'https://www.mapquestapi.com/staticmap/v5/map?key=KEY&center=1100 N Walnut St., 47404&size=600,400@2x&zoom=15';
        const {container} = render(<MapSection src={src}/>);

        const section = container.querySelector('section.section-map');
        expect(section).toBeInTheDocument();

        const img = container.querySelector('img');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', src);
        expect(img).toHaveAttribute('alt', 'map');
        expect(img).toHaveAttribute('loading', 'lazy');
    });
});
