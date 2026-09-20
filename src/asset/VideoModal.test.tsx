import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {VideoModal} from './VideoModal';
import {Video} from './data/Asset';

describe('VideoModal', () => {
    it('renders a youtube embed iframe for a "video" type', () => {
        const video: Video = {url: 'https://youtu.be/abc123', type: 'video'};
        render(<VideoModal video={video} showModal={true} setShowModal={vi.fn()}/>);

        const iframe = screen.getByTitle('YouTube video player') as HTMLIFrameElement;
        expect(iframe).toBeInTheDocument();
        expect(iframe.src).toBe('https://www.youtube.com/embed/abc123?rel=0');
    });

    it('renders a virtual tour iframe with the raw url for a non-video type', () => {
        const video: Video = {url: 'https://example.com/tour', type: 'virtual'};
        render(<VideoModal video={video} showModal={true} setShowModal={vi.fn()}/>);

        const iframe = screen.getByTitle('virtual tour') as HTMLIFrameElement;
        expect(iframe).toBeInTheDocument();
        expect(iframe.src).toBe('https://example.com/tour');
    });

    it('renders nothing for the video when the modal is not shown', () => {
        const video: Video = {url: 'https://youtu.be/abc123', type: 'video'};
        render(<VideoModal video={video} showModal={false} setShowModal={vi.fn()}/>);

        expect(screen.queryByTitle('YouTube video player')).not.toBeInTheDocument();
    });

    it('calls setShowModal(false) when the close icon is clicked', async () => {
        const setShowModal = vi.fn();
        const video: Video = {url: 'https://youtu.be/abc123', type: 'video'};
        const {container} = render(<VideoModal video={video} showModal={true} setShowModal={setShowModal}/>);

        const closeIcon = container.querySelector('.close') as HTMLElement;
        await userEvent.click(closeIcon);

        expect(setShowModal).toHaveBeenCalledWith(false);
    });
});
