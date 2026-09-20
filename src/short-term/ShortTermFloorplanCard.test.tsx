import {beforeEach, describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ShortTermFloorplanCard} from './ShortTermFloorplanCard';
import {FloorplanShortTerm, ShortTermStyle} from './data/ShortTerm';
import {getAssetsFrom} from '../asset/service/AssetService';

vi.mock('../asset/service/AssetService', () => ({
    getAssetsFrom: vi.fn(),
    assetUrlFrom: (id: string, propertyId: string) => `https://assets.test/${propertyId}/${id}`,
    getAssetUrl: (imageUrl: string) => `resolved-${imageUrl}`,
}));

const baseFloorplan: FloorplanShortTerm = {
    id: '17789',
    name: '2 Bedroom Flat at Verona Park',
    style: ShortTermStyle.APARTMENT,
    bedroom: 2,
    bathroom: 2,
    virtualTourLink: '',
    videoTourLink: '',
    photosFolderId: '',
    coverImage: 'https://drive.google.com/uc?id=abc&export=download',
    priceFor14To29Days: '119.0',
    priceFor1To4Months: '93.0',
    priceFor4andMoreMonths: '81.0',
    squareFoot: 750,
} as FloorplanShortTerm;

describe('ShortTermFloorplanCard', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the floorplan name, bed/bath, and square footage', () => {
        render(<ShortTermFloorplanCard floorplan={baseFloorplan} propertyId="verona-park"
                                        videoClickHandler={vi.fn()}/>);

        expect(screen.getByText('2 Bedroom Flat at Verona Park')).toBeInTheDocument();
        expect(screen.getByText('2 bed, 2 bath')).toBeInTheDocument();
        expect(screen.getByText('750 sq.ft.')).toBeInTheDocument();
    });

    it('formats the price fields as USD per day', () => {
        render(<ShortTermFloorplanCard floorplan={baseFloorplan} propertyId="verona-park"
                                        videoClickHandler={vi.fn()}/>);

        expect(screen.getByText(/\$119\/day \(14-29 Days\)/)).toBeInTheDocument();
        expect(screen.getByText(/\$93\/day \(1-4 Months\)/)).toBeInTheDocument();
        expect(screen.getByText(/\$81\/day \(4\+ Months\)/)).toBeInTheDocument();
    });

    it('shows the resolved cover image when no assets have been loaded yet', () => {
        render(<ShortTermFloorplanCard floorplan={baseFloorplan} propertyId="verona-park"
                                        videoClickHandler={vi.fn()}/>);

        const img = screen.getByAltText('cover') as HTMLImageElement;
        expect(img.src).toContain('resolved-https://drive.google.com/uc?id=abc&export=download');
    });

    it('applies the small modifier class when size="small"', () => {
        const {container} = render(<ShortTermFloorplanCard floorplan={baseFloorplan} size="small"
                                                             propertyId="verona-park" videoClickHandler={vi.fn()}/>);

        expect(container.querySelector('.short-term-floorplan-card--small')).toBeInTheDocument();
    });

    it('does not apply the small modifier class by default', () => {
        const {container} = render(<ShortTermFloorplanCard floorplan={baseFloorplan} propertyId="verona-park"
                                                             videoClickHandler={vi.fn()}/>);

        expect(container.querySelector('.short-term-floorplan-card--small')).not.toBeInTheDocument();
    });

    it('does not render a virtual tour icon when there is no virtualTourLink', () => {
        const {container} = render(<ShortTermFloorplanCard floorplan={baseFloorplan} propertyId="verona-park"
                                                             videoClickHandler={vi.fn()}/>);

        expect(container.querySelector('.icon-tour')).not.toBeInTheDocument();
    });

    it('calls videoClickHandler with the virtual tour link when the tour icon is clicked', async () => {
        const videoClickHandler = vi.fn();
        const withTour = {...baseFloorplan, virtualTourLink: 'https://tour.test/1'};
        const {container} = render(<ShortTermFloorplanCard floorplan={withTour} propertyId="verona-park"
                                                             videoClickHandler={videoClickHandler}/>);

        await userEvent.click(container.querySelector('.icon-tour button') as HTMLElement);

        expect(videoClickHandler).toHaveBeenCalledWith({url: 'https://tour.test/1', type: 'virtual'});
    });

    it('does not render a video tour icon when there is no videoTourLink', () => {
        const {container} = render(<ShortTermFloorplanCard floorplan={baseFloorplan} propertyId="verona-park"
                                                             videoClickHandler={vi.fn()}/>);

        expect(container.querySelector('.icon-video')).not.toBeInTheDocument();
    });

    it('calls videoClickHandler with the video tour link when the video icon is clicked', async () => {
        const videoClickHandler = vi.fn();
        const withVideo = {...baseFloorplan, videoTourLink: 'https://video.test/1'};
        const {container} = render(<ShortTermFloorplanCard floorplan={withVideo} propertyId="verona-park"
                                                             videoClickHandler={videoClickHandler}/>);

        await userEvent.click(container.querySelector('.icon-video button') as HTMLElement);

        expect(videoClickHandler).toHaveBeenCalledWith({url: 'https://video.test/1', type: 'video'});
    });

    it('links to the floorplan detail page', () => {
        const {container} = render(<ShortTermFloorplanCard floorplan={baseFloorplan} propertyId="verona-park"
                                                             videoClickHandler={vi.fn()}/>);

        expect(container.querySelector('a[href="/floorplans/17789"]')).toBeInTheDocument();
    });

    it('loads assets and switches to a slider when the navigate button is clicked', async () => {
        (getAssetsFrom as ReturnType<typeof vi.fn>).mockResolvedValue([
            {id: 'asset-1', name: '1'},
            {id: 'asset-2', name: '2'},
        ]);
        const withFolder = {...baseFloorplan, photosFolderId: 'folder-1'};
        const {container} = render(<ShortTermFloorplanCard floorplan={withFolder} propertyId="verona-park"
                                                             videoClickHandler={vi.fn()}/>);

        const navigateButton = container.querySelector('.muncher-button--navigate-right button') as HTMLElement;
        await userEvent.click(navigateButton);

        expect(getAssetsFrom).toHaveBeenCalledWith('folder-1');
        expect(await screen.findAllByRole('img')).toHaveLength(2);
    });

    it('does not call getAssetsFrom when the floorplan has no photosFolderId', async () => {
        const {container} = render(<ShortTermFloorplanCard floorplan={baseFloorplan} propertyId="verona-park"
                                                             videoClickHandler={vi.fn()}/>);

        const navigateButton = container.querySelector('.muncher-button--navigate-right button') as HTMLElement;
        await userEvent.click(navigateButton);

        expect(getAssetsFrom).not.toHaveBeenCalled();
    });
});
