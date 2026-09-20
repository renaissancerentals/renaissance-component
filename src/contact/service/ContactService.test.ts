import {afterEach, describe, expect, it, vi} from 'vitest';

vi.mock('../../service/Api', () => ({
    default: {
        post: vi.fn()
    }
}));

vi.mock('ga-gtag', () => ({
    default: vi.fn(),
    install: vi.fn()
}));

import Api from '../../service/Api';
import gtag, {install} from 'ga-gtag';
import {
    sendContactMail,
    sendToConversionTracking,
    trackContactClicked,
    trackContactInitiated,
    trackContactSubmitted
} from './ContactService';
import {ContactMessage, defaultContactMessage} from '../data/ContactMessage';

describe('sendContactMail', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('posts the contact message and resolves with the response data', async () => {
        const message: ContactMessage = {...defaultContactMessage, firstName: 'Jane'};
        (Api.post as ReturnType<typeof vi.fn>).mockResolvedValueOnce({data: {success: true}});

        const result = await sendContactMail(message);

        expect(Api.post).toHaveBeenCalledWith('contact', message);
        expect(result).toEqual({success: true});
    });
});

describe('sendToConversionTracking', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('installs the tag and fires a conversion event with the tracking id', () => {
        sendToConversionTracking('AW-12345');

        expect(install).toHaveBeenCalledWith('UA-142676339-1');
        expect(gtag).toHaveBeenCalledWith('event', 'conversion', {'send_to': 'AW-12345'});
    });

    it('does not throw when gtag itself throws', () => {
        (gtag as unknown as ReturnType<typeof vi.fn>).mockImplementationOnce(() => {
            throw new Error('boom');
        });

        expect(() => sendToConversionTracking('AW-12345')).not.toThrow();
    });
});

describe('tracking event calls', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('trackContactClicked posts a clicked analytics event', () => {
        trackContactClicked('verona-park');

        expect(Api.post).toHaveBeenCalledWith('analytics/contactEvents', {
            property: 'verona-park',
            type: 'clicked'
        });
    });

    it('trackContactSubmitted posts a submitted analytics event', () => {
        trackContactSubmitted('verona-park');

        expect(Api.post).toHaveBeenCalledWith('analytics/contactEvents', {
            property: 'verona-park',
            type: 'submitted'
        });
    });

    it('trackContactInitiated posts an initiated analytics event', () => {
        trackContactInitiated('verona-park');

        expect(Api.post).toHaveBeenCalledWith('analytics/contactEvents', {
            property: 'verona-park',
            type: 'initiated'
        });
    });
});
