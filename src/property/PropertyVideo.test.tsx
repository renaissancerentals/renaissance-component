import {describe, expect, it} from 'vitest';
import {render} from '@testing-library/react';
import {PropertyVideo} from './PropertyVideo';

describe('PropertyVideo', () => {
    it('renders a video element when the coverVideo url has an id parameter', () => {
        const {container} = render(
            <PropertyVideo coverVideo="https://drive.google.com/uc?id=abc123&export=download"/>
        );

        const video = container.querySelector('video');
        expect(video).toBeInTheDocument();
        expect(video).toHaveAttribute(
            'src',
            'https://www.googleapis.com/drive/v3/files/abc123?alt=media&key=AIzaSyAdG4u5YD2CZvQTv_hRtaKrmSNWZkY30oU'
        );
    });

    it('renders nothing when the coverVideo url has no id parameter', () => {
        const {container} = render(<PropertyVideo coverVideo="https://example.com/video.mp4"/>);

        expect(container).toBeEmptyDOMElement();
    });
});
