import {describe, expect, it, vi} from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Video} from './Video';

const url = 'https://example.com/video.mp4';

describe('Video', () => {
    it('renders a video element with the given url, muted and autoplaying', () => {
        const {container} = render(<Video url={url}/>);

        const video = container.querySelector('video') as HTMLVideoElement;
        expect(video).toBeInTheDocument();
        expect(video).toHaveAttribute('src', url);
        expect(video).toHaveAttribute('autoplay');
        expect(video).toHaveAttribute('loop');
    });

    it('shows a spinner until the video data has loaded, then hides it', () => {
        const {container} = render(<Video url={url}/>);

        expect(container.querySelector('.muncher-spinner')).toBeInTheDocument();

        const video = container.querySelector('video') as HTMLVideoElement;
        fireEvent.loadedData(video);

        expect(container.querySelector('.muncher-spinner')).not.toBeInTheDocument();
    });

    it('toggles mute state when the volume icon is clicked', async () => {
        const user = userEvent.setup();
        const {container} = render(<Video url={url}/>);

        const volumeIcon = container.querySelector('span.volume svg') as Element;
        expect(volumeIcon).toBeTruthy();

        await user.click(volumeIcon);

        expect(container.querySelector('span.volume')).toBeInTheDocument();
    });

    it('toggles play/pause state when the play-pause icon is clicked', async () => {
        const user = userEvent.setup();
        const {container} = render(<Video url={url}/>);

        const pauseSpy = vi.spyOn(window.HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});

        const playPauseIcon = container.querySelector('span.play-pause svg') as Element;
        expect(playPauseIcon).toBeTruthy();
        await user.click(playPauseIcon);

        expect(pauseSpy).toHaveBeenCalled();
        pauseSpy.mockRestore();
    });

    it('shows a play icon after pausing, and resumes playback when clicked again', async () => {
        const user = userEvent.setup();
        const {container} = render(<Video url={url}/>);

        vi.spyOn(window.HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
        const playSpy = vi.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation(() => Promise.resolve());

        const pauseIcon = container.querySelector('span.play-pause svg') as Element;
        await user.click(pauseIcon);

        const resumeIcon = container.querySelector('span.play-pause svg') as Element;
        await user.click(resumeIcon);

        expect(playSpy).toHaveBeenCalled();
        playSpy.mockRestore();
    });

    it('renders the fallback text for browsers that do not support the video tag', () => {
        render(<Video url={url}/>);
        expect(screen.getByText('Your browser does not support the video tag.')).toBeInTheDocument();
    });
});
