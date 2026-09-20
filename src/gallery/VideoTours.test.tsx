import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {VideoTours} from './VideoTours';

describe('VideoTours', () => {
    it('renders a single video layout when only one video url is given', () => {
        const {container} = render(<VideoTours videoTourUrls={['https://youtu.be/abc123']}/>);

        expect(container.querySelector('.single-video-layout')).toBeInTheDocument();
        expect(container.querySelector('.two-video-layout')).not.toBeInTheDocument();
        expect(screen.getAllByTitle('YouTube video player')).toHaveLength(1);
    });

    it('embeds the youtube url correctly', () => {
        render(<VideoTours videoTourUrls={['https://youtu.be/abc123']}/>);

        const iframe = screen.getByTitle('YouTube video player') as HTMLIFrameElement;
        expect(iframe.src).toBe('https://www.youtube.com/embed/abc123?rel=0');
    });

    it('renders a two video layout when two video urls are given', () => {
        const {container} = render(<VideoTours videoTourUrls={['https://youtu.be/abc123', 'https://youtu.be/def456']}/>);

        expect(container.querySelector('.mobile .single-video-layout')).toBeInTheDocument();
        expect(container.querySelector('.two-video-layout')).toBeInTheDocument();
        expect(screen.getAllByTitle('YouTube video player')).toHaveLength(3);
    });
});
