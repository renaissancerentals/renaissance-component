import {beforeEach, describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import {ShortTermFloorplanSection} from './ShortTermFloorplanSection';
import {getShortTermFloorplan} from './service/ShortTermService';
import {FloorplanShortTerm, ShortTermStyle} from './data/ShortTerm';

vi.mock('./service/ShortTermService', () => ({
    getShortTermFloorplan: vi.fn(),
}));

vi.mock('./ShortTermFloorplanHero', () => ({
    ShortTermFloorplanHero: (props: { floorplan: FloorplanShortTerm }) =>
        <div data-testid="hero-stub">{props.floorplan?.name}</div>,
}));

const floorplan: FloorplanShortTerm = {
    id: '1-bedroom-flat',
    name: '1 Bedroom Flat',
    style: ShortTermStyle.APARTMENT,
    bedroom: 1,
    bathroom: 1,
    squareFoot: 501,
    description: 'A cozy one bedroom.',
    priceFor14To29Days: '102.0',
    priceFor1To4Months: '75.0',
    priceFor4andMoreMonths: '63.0',
    amenities: [],
    property: {phone: '8123332280', busRoutes: []},
} as unknown as FloorplanShortTerm;

describe('ShortTermFloorplanSection', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('shows the error state when the floorplan fails to load', async () => {
        (getShortTermFloorplan as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('not found'));

        render(<ShortTermFloorplanSection contactClickHandler={vi.fn()} applyClickHandler={vi.fn()}
                                           floorplanId="missing"/>);

        expect(await screen.findByText('Uh-oh, this is a 404')).toBeInTheDocument();
    });

    it('renders the floorplan details once loaded', async () => {
        (getShortTermFloorplan as ReturnType<typeof vi.fn>).mockResolvedValue(floorplan);

        render(<ShortTermFloorplanSection contactClickHandler={vi.fn()} applyClickHandler={vi.fn()}
                                           floorplanId="1-bedroom-flat"/>);

        expect(await screen.findByTestId('hero-stub')).toHaveTextContent('1 Bedroom Flat');
        expect(screen.getByText(/1 Bedroom \| 1 Bathroom/)).toBeInTheDocument();
        expect(screen.getByText('501 Square Feet')).toBeInTheDocument();
    });

    it('formats the pricing rows on the details card', async () => {
        (getShortTermFloorplan as ReturnType<typeof vi.fn>).mockResolvedValue(floorplan);

        render(<ShortTermFloorplanSection contactClickHandler={vi.fn()} applyClickHandler={vi.fn()}
                                           floorplanId="1-bedroom-flat"/>);

        expect(await screen.findByText('$102/day + tax')).toBeInTheDocument();
        expect(screen.getByText('$75/day/ $2,250/mo')).toBeInTheDocument();
        expect(screen.getByText('$63/day/ $1,890/mo')).toBeInTheDocument();
    });

    it('omits the amenities card when there are no amenities', async () => {
        (getShortTermFloorplan as ReturnType<typeof vi.fn>).mockResolvedValue(floorplan);

        render(<ShortTermFloorplanSection contactClickHandler={vi.fn()} applyClickHandler={vi.fn()}
                                           floorplanId="1-bedroom-flat"/>);

        await screen.findByTestId('hero-stub');
        expect(screen.queryByText('Amenities')).not.toBeInTheDocument();
    });

    it('renders featured amenities before non-featured amenities when present', async () => {
        const withAmenities = {
            ...floorplan,
            amenities: [
                {id: 'a1', name: 'Basic Wifi', featured: false},
                {id: 'a2', name: 'Rooftop Pool', featured: true},
            ],
        } as FloorplanShortTerm;
        (getShortTermFloorplan as ReturnType<typeof vi.fn>).mockResolvedValue(withAmenities);

        render(<ShortTermFloorplanSection contactClickHandler={vi.fn()} applyClickHandler={vi.fn()}
                                           floorplanId="1-bedroom-flat"/>);

        await screen.findByTestId('hero-stub');
        expect(screen.getByText('Amenities')).toBeInTheDocument();
        expect(screen.getByText('Rooftop Pool')).toBeInTheDocument();
        expect(screen.getByText('Basic Wifi')).toBeInTheDocument();
    });

    it('requests the floorplan again when floorplanId changes', async () => {
        (getShortTermFloorplan as ReturnType<typeof vi.fn>).mockResolvedValue(floorplan);

        const {rerender} = render(<ShortTermFloorplanSection contactClickHandler={vi.fn()} applyClickHandler={vi.fn()}
                                                               floorplanId="1-bedroom-flat"/>);
        await screen.findByTestId('hero-stub');

        rerender(<ShortTermFloorplanSection contactClickHandler={vi.fn()} applyClickHandler={vi.fn()}
                                             floorplanId="2-bedroom-flat"/>);

        expect(getShortTermFloorplan).toHaveBeenCalledWith('1-bedroom-flat');
        expect(getShortTermFloorplan).toHaveBeenCalledWith('2-bedroom-flat');
    });
});
