import {describe, expect, it, vi} from 'vitest';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {SimilarFloorplanCard} from './SimilarFloorplanCard';
import {FloorplanSpotlight, FloorplanStyle, SimilarFloorplan} from '../data/Floorplan';

vi.mock('../service/FloorplanService', async (importOriginal) => {
    const actual = await importOriginal<typeof import('../service/FloorplanService')>();
    return {
        ...actual,
        getFloorplanSpotlight: vi.fn()
    };
});

import {getFloorplanSpotlight} from '../service/FloorplanService';

const similarFloorplans: SimilarFloorplan[] = [
    {similarFloorplanId: 'valencia'},
    {similarFloorplanId: 'madrid'}
];

const spotlightFor = (id: string, name: string): FloorplanSpotlight => ({
    id,
    name,
    metaDescription: 'a nice place',
    bedroom: 2,
    bathroom: 1,
    style: FloorplanStyle.APARTMENT,
    coverImage: 'https://drive.google.com/uc?id=abc123&export=download',
    units: [{id: 'unit-1', squareFoot: 700, rent: 1200, address: '123 Main St', zipcode: '47401'}],
    property: {id: 'verona-park', name: 'Verona Park', address: '123 Main St', zipcode: '47401'}
});

describe('SimilarFloorplanCard', () => {
    it('shows a spinner while similar floorplans are loading', () => {
        vi.mocked(getFloorplanSpotlight).mockReturnValue(new Promise(() => {
        }));

        const {container} = render(<SimilarFloorplanCard similarFloorplans={similarFloorplans}/>);

        expect(container.querySelector('.muncher-spinner, [class*="spinner"]')).toBeTruthy();
    });

    it('renders the "You Might Also Like" title and a card per similar floorplan once loaded', async () => {
        vi.mocked(getFloorplanSpotlight).mockImplementation((id: string) =>
            Promise.resolve(spotlightFor(id, id === 'valencia' ? 'Valencia' : 'Madrid'))
        );

        render(<SimilarFloorplanCard similarFloorplans={similarFloorplans}/>);

        expect(screen.getByText('You Might Also Like')).toBeInTheDocument();
        expect(getFloorplanSpotlight).toHaveBeenCalledWith('valencia');
        expect(getFloorplanSpotlight).toHaveBeenCalledWith('madrid');

        await waitFor(() => {
            expect(screen.getByText('Valencia')).toBeInTheDocument();
        });
        expect(screen.getByText('Madrid')).toBeInTheDocument();
    });

    it('renders the bedroom count, rent and address for each floorplan', async () => {
        vi.mocked(getFloorplanSpotlight).mockResolvedValue(spotlightFor('valencia', 'Valencia'));

        render(<SimilarFloorplanCard similarFloorplans={[similarFloorplans[0]]}/>);

        await waitFor(() => {
            expect(screen.getByText('Valencia')).toBeInTheDocument();
        });

        expect(screen.getByText(/2 Bedroom/)).toBeInTheDocument();
        expect(screen.getByText(/\$1200\/mo/)).toBeInTheDocument();
        expect(screen.getByText('123 Main St, Bloomington IN, 47401')).toBeInTheDocument();
    });

    it('links each card to its floorplan page', async () => {
        vi.mocked(getFloorplanSpotlight).mockResolvedValue(spotlightFor('valencia', 'Valencia'));

        render(<SimilarFloorplanCard similarFloorplans={[similarFloorplans[0]]}/>);

        await waitFor(() => {
            expect(screen.getByText('Valencia')).toBeInTheDocument();
        });

        expect(screen.getByText('Valencia').closest('a')).toHaveAttribute('href', '/floorplans/valencia');
    });

    it('removes the spinner once loading settles even when there are no similar floorplans', async () => {
        render(<SimilarFloorplanCard similarFloorplans={[]}/>);

        await waitFor(() => {
            expect(screen.getByText('You Might Also Like')).toBeInTheDocument();
        });
        expect(getFloorplanSpotlight).not.toHaveBeenCalled();
    });

    it('re-fetches when the similarFloorplans prop changes', async () => {
        vi.mocked(getFloorplanSpotlight).mockResolvedValue(spotlightFor('valencia', 'Valencia'));

        const {rerender} = render(<SimilarFloorplanCard similarFloorplans={[similarFloorplans[0]]}/>);
        await waitFor(() => expect(getFloorplanSpotlight).toHaveBeenCalledTimes(1));

        vi.mocked(getFloorplanSpotlight).mockResolvedValue(spotlightFor('madrid', 'Madrid'));
        rerender(<SimilarFloorplanCard similarFloorplans={[similarFloorplans[1]]}/>);

        await waitFor(() => expect(getFloorplanSpotlight).toHaveBeenCalledTimes(2));
        expect(getFloorplanSpotlight).toHaveBeenLastCalledWith('madrid');
    });
});
