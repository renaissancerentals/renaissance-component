import {describe, expect, it, vi} from 'vitest';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {DriveGallery} from './DriveGallery';
import {getAssetsFrom} from '../asset/service/AssetService';
import {Asset} from '../asset/data/Asset';

vi.mock('../asset/service/AssetService', async () => {
    const actual = await vi.importActual<typeof import('../asset/service/AssetService')>('../asset/service/AssetService');
    return {
        ...actual,
        getAssetsFrom: vi.fn()
    };
});

const mockedGetAssetsFrom = vi.mocked(getAssetsFrom);

const assetFrom = (id: string, name: string): Asset => ({
    id,
    name,
    description: '',
    folderId: 'folder-1',
    height: 1382,
    width: 2074,
    mimeType: 'image/jpeg'
});

describe('DriveGallery', () => {
    it('fetches images for the given driveId and renders them', async () => {
        const images = [assetFrom('1', 'One'), assetFrom('2', 'Two')];
        mockedGetAssetsFrom.mockResolvedValue(images);

        render(<DriveGallery driveId="drive-1" propertyId="verona-park"/>);

        expect(await screen.findByAltText('One')).toBeInTheDocument();
        expect(screen.getByAltText('Two')).toBeInTheDocument();
        expect(mockedGetAssetsFrom).toHaveBeenCalledWith('drive-1');
    });

    it('does not call getAssetsFrom when no driveId is given', () => {
        render(<DriveGallery driveId="" propertyId="verona-park"/>);

        expect(mockedGetAssetsFrom).not.toHaveBeenCalled();
    });

    it('limits the initially shown images to initialSize', async () => {
        const images = [assetFrom('1', 'One'), assetFrom('2', 'Two'), assetFrom('3', 'Three')];
        mockedGetAssetsFrom.mockResolvedValue(images);

        render(<DriveGallery driveId="drive-1" propertyId="verona-park" initialSize={2}/>);

        await screen.findByAltText('One');
        expect(screen.getByAltText('Two')).toBeInTheDocument();
        expect(screen.queryByAltText('Three')).not.toBeInTheDocument();
    });

    it('shows the "More Pictures" button when initialSize truncates the images', async () => {
        const images = [assetFrom('1', 'One'), assetFrom('2', 'Two'), assetFrom('3', 'Three')];
        mockedGetAssetsFrom.mockResolvedValue(images);

        render(<DriveGallery driveId="drive-1" propertyId="verona-park" initialSize={2}/>);

        await screen.findByAltText('One');
        expect(screen.getByText('More Pictures »')).toBeInTheDocument();
    });

    it('reveals all images and hides the button when "More Pictures" is clicked', async () => {
        const user = userEvent.setup();
        const images = [assetFrom('1', 'One'), assetFrom('2', 'Two'), assetFrom('3', 'Three')];
        mockedGetAssetsFrom.mockResolvedValue(images);

        render(<DriveGallery driveId="drive-1" propertyId="verona-park" initialSize={2}/>);

        await screen.findByAltText('One');
        await user.click(screen.getByText('More Pictures »'));

        expect(screen.getByAltText('Three')).toBeInTheDocument();
        expect(screen.queryByText('More Pictures »')).not.toBeInTheDocument();
    });

    it('shows the "More Pictures" button by default even without initialSize truncation', async () => {
        const images = [assetFrom('1', 'One'), assetFrom('2', 'Two')];
        mockedGetAssetsFrom.mockResolvedValue(images);

        render(<DriveGallery driveId="drive-1" propertyId="verona-park"/>);

        await screen.findByAltText('One');
        expect(screen.getByText('More Pictures »')).toBeInTheDocument();
    });

    it('stops loading when getAssetsFrom rejects', async () => {
        mockedGetAssetsFrom.mockRejectedValue(new Error('invalid drive id'));

        const {container} = render(<DriveGallery driveId="bad-drive" propertyId="verona-park"/>);

        await waitFor(() => expect(container.querySelectorAll('.react-loading-skeleton')).toHaveLength(0));
    });
});
