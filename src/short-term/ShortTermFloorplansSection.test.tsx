import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import {ShortTermFloorplansSection} from './ShortTermFloorplansSection';
import {FloorplanShortTerm, ShortTermStyle} from './data/ShortTerm';

vi.mock('../asset/service/AssetService', () => ({
    getAssetsFrom: vi.fn(),
    assetUrlFrom: (id: string, propertyId: string) => `https://assets.test/${propertyId}/${id}`,
    getAssetUrl: (imageUrl: string) => imageUrl,
}));

const floorplans: FloorplanShortTerm[] = [
    {
        id: '2-flat',
        name: '2 Flat',
        style: ShortTermStyle.APARTMENT,
        bedroom: 2,
        bathroom: 2,
        priceFor14To29Days: '119.0',
        priceFor1To4Months: '93.0',
        priceFor4andMoreMonths: '81.0',
        squareFoot: 750,
    } as FloorplanShortTerm,
    {
        id: '1-bedroom',
        name: '1 Bedroom',
        style: ShortTermStyle.APARTMENT,
        bedroom: 1,
        bathroom: 1,
        priceFor14To29Days: '102.0',
        priceFor1To4Months: '75.0',
        priceFor4andMoreMonths: '63.0',
        squareFoot: 501,
    } as FloorplanShortTerm,
];

describe('ShortTermFloorplansSection', () => {
    it('renders a card for every floorplan by default', () => {
        render(<ShortTermFloorplansSection floorplans={floorplans} propertyId="verona-park"/>);

        expect(screen.getByText('2 Flat')).toBeInTheDocument();
        expect(screen.getByText('1 Bedroom')).toBeInTheDocument();
    });

    it('renders the given title', () => {
        render(<ShortTermFloorplansSection floorplans={floorplans} propertyId="verona-park" title="Available Now"/>);

        expect(screen.getByText('Available Now')).toBeInTheDocument();
    });

    it('defaults the title to "Floor plans"', () => {
        render(<ShortTermFloorplansSection floorplans={floorplans} propertyId="verona-park"/>);

        expect(screen.getByText('Floor plans')).toBeInTheDocument();
    });

    it('shows a "No matches found" message when a default filter excludes every floorplan', () => {
        render(<ShortTermFloorplansSection floorplans={floorplans} propertyId="verona-park" defaultBedRooms={99}/>);

        expect(screen.getByText('No matches found...')).toBeInTheDocument();
        expect(screen.queryByText('2 Flat')).not.toBeInTheDocument();
    });

    it('renders nothing but the empty message for an empty floorplans array', () => {
        render(<ShortTermFloorplansSection floorplans={[]} propertyId="verona-park"/>);

        expect(screen.getByText('No matches found...')).toBeInTheDocument();
    });
});
