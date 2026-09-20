import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {FloorplansSection} from './FloorplansSection';
import {FloorplanCardData, FloorplanStyle} from '../data/Floorplan';

const floorplan = (overrides: Partial<FloorplanCardData> = {}): FloorplanCardData => ({
    id: 'studio-a',
    name: 'Studio A',
    bedroom: 1,
    bathroom: 1,
    coverImage: '',
    featured: false,
    style: FloorplanStyle.STUDIO,
    specialRent: null as unknown as number,
    specialRentStartDate: '',
    specialRentEndDate: '',
    address: '123 Main St',
    zipcode: '47401',
    virtualTourLink: '',
    videoTourLink: '',
    photosFolderId: '',
    units: [{id: 'u1', rent: 1000, squareFoot: 600, moveInDate: '2020-01-01', availabilityExtensionMonths: null}],
    webSpecials: [],
    ...overrides
});

describe('FloorplansSection', () => {
    it('renders a card for each floorplan and the default title', () => {
        render(<FloorplansSection floorplans={[floorplan(), floorplan({id: 'studio-b', name: 'Studio B'})]}
                                   propertyId="verona-park"/>);

        expect(screen.getByRole('heading', {name: 'Floor plans'})).toBeInTheDocument();
        expect(screen.getByText('Studio A')).toBeInTheDocument();
        expect(screen.getByText('Studio B')).toBeInTheDocument();
    });

    it('renders a custom title when one is given', () => {
        render(<FloorplansSection floorplans={[floorplan()]} propertyId="verona-park" title="Available Homes"/>);

        expect(screen.getByRole('heading', {name: 'Available Homes'})).toBeInTheDocument();
    });

    it('shows a "no matches" banner when the default filters exclude every floorplan', () => {
        render(<FloorplansSection floorplans={[floorplan({bedroom: 1})]} propertyId="verona-park"
                                   defaultBedRooms={3}/>);

        expect(screen.getByText('No matches found...')).toBeInTheDocument();
        expect(screen.queryByText('Studio A')).not.toBeInTheDocument();
    });

    it('applies the container class when isCondensed is true (default)', () => {
        const {container} = render(<FloorplansSection floorplans={[floorplan()]} propertyId="verona-park"/>);

        expect(container.querySelector('section.section-floorplans > div.container')).toBeInTheDocument();
    });

    it('omits the container class when isCondensed is false', () => {
        const {container} = render(<FloorplansSection floorplans={[floorplan()]} propertyId="verona-park"
                                                        isCondensed={false}/>);

        expect(container.querySelector('section.section-floorplans > div.container')).not.toBeInTheDocument();
    });
});
