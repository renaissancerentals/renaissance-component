import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {UnitsSection} from './UnitsSection';
import {UnitCardData} from '../data/Unit';
import {FloorplanStyle} from '../../floorplan/data/Floorplan';

vi.mock('../../asset/service/AssetService', () => ({
    getAssetsFrom: vi.fn().mockResolvedValue([]),
    getAssetUrl: vi.fn((url: string) => url),
    assetUrlFrom: vi.fn((id: string) => `asset-url/${id}`)
}));

const unit = (overrides: Partial<UnitCardData> = {}): UnitCardData => ({
    id: 'u1',
    rent: 1000,
    squareFoot: 800,
    moveInDate: '2020-01-01',
    availabilityExtensionMonths: null,
    floorplanId: 'fp1',
    floorplanName: 'The Aspen',
    bedroom: 1,
    bathroom: 1,
    coverImage: '',
    featured: false,
    style: FloorplanStyle.APARTMENT,
    specialRent: null as unknown as number,
    specialRentStartDate: '',
    specialRentEndDate: '',
    address: '',
    zipcode: '',
    virtualTourLink: '',
    videoTourLink: '',
    photosFolderId: '',
    webSpecials: [],
    ...overrides
});

describe('UnitsSection', () => {
    it('renders the default title of "Units" when none is given', () => {
        render(<UnitsSection units={[unit()]} propertyId="verona-park"/>);

        expect(screen.getByText('Units')).toBeInTheDocument();
    });

    it('renders a custom title', () => {
        render(<UnitsSection units={[unit()]} title="Available Units" propertyId="verona-park"/>);

        expect(screen.getByText('Available Units')).toBeInTheDocument();
    });

    it('renders a card for every unit that matches the default (unfiltered) view', () => {
        const unitA = unit({id: 'unit-a', floorplanName: 'Aspen'});
        const unitB = unit({id: 'unit-b', floorplanName: 'Birch'});

        render(<UnitsSection units={[unitA, unitB]} propertyId="verona-park"/>);

        expect(screen.getByText('Aspen')).toBeInTheDocument();
        expect(screen.getByText('Birch')).toBeInTheDocument();
    });

    it('shows a "no matches" banner when the default filters exclude every unit', () => {
        const oneBed = unit({id: 'unit-a', bedroom: 1});

        render(<UnitsSection units={[oneBed]} propertyId="verona-park" defaultBedRooms={3}/>);

        expect(screen.getByText('No matches found...')).toBeInTheDocument();
    });

    it('does not show the "no matches" banner when units are present', () => {
        render(<UnitsSection units={[unit()]} propertyId="verona-park"/>);

        expect(screen.queryByText('No matches found...')).not.toBeInTheDocument();
    });

    it('opens the video modal with a video iframe when a unit video tour icon is clicked', async () => {
        const user = userEvent.setup();
        const videoUnit = unit({id: 'video-unit', videoTourLink: 'https://youtu.be/abc123'});

        const {container} = render(<UnitsSection units={[videoUnit]} propertyId="verona-park"/>);

        await user.click(screen.getByTitle('video icon'));

        expect(container.querySelector('iframe[title="YouTube video player"]')).toBeInTheDocument();
    });

    it('renders the units within a container div by default (isCondensed defaults to true)', () => {
        const {container} = render(<UnitsSection units={[unit()]} propertyId="verona-park"/>);

        expect(container.querySelector('.section-units > .container')).toBeInTheDocument();
    });

    it('does not wrap in the outer container when isCondensed is false', () => {
        const {container} = render(<UnitsSection units={[unit()]} propertyId="verona-park" isCondensed={false}/>);

        expect(container.querySelector('.section-units > .container')).not.toBeInTheDocument();
    });
});
