import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {VirtualTour} from './VirtualTour';

describe('VirtualTour', () => {
    it('renders an iframe with the given virtual tour url', () => {
        render(<VirtualTour virtualTourUrl="https://www.virtualtour.link"/>);

        const iframe = screen.getByTitle('virtual tour') as HTMLIFrameElement;
        expect(iframe).toBeInTheDocument();
        expect(iframe.src).toBe('https://www.virtualtour.link/');
    });

    it('renders without a src when no url is given', () => {
        render(<VirtualTour/>);

        const iframe = screen.getByTitle('virtual tour') as HTMLIFrameElement;
        expect(iframe.getAttribute('src')).toBeNull();
    });
});
