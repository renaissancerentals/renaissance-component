import {beforeEach, describe, expect, it, vi} from 'vitest';

vi.mock('axios', () => ({
    default: {
        get: vi.fn(),
        create: vi.fn(() => ({}))
    }
}));

import axios from 'axios';
import ApiInstance, {DEFAULT_IMAGE_URL, get, getBaseUrl, REACT_APP_DATA_BASE_URLS} from './Api';

describe('Api', () => {
    beforeEach(() => {
        sessionStorage.clear();
        vi.clearAllMocks();
    });

    describe('getBaseUrl', () => {
        it('returns the first base url on the first call', () => {
            expect(getBaseUrl()).toBe(REACT_APP_DATA_BASE_URLS[0]);
        });

        it('round-robins through the base urls across calls', () => {
            const results = REACT_APP_DATA_BASE_URLS.map(() => getBaseUrl());
            expect(results).toEqual(REACT_APP_DATA_BASE_URLS);
        });

        it('wraps back to the first url after cycling through all of them', () => {
            for (let i = 0; i < REACT_APP_DATA_BASE_URLS.length; i++) {
                getBaseUrl();
            }
            expect(getBaseUrl()).toBe(REACT_APP_DATA_BASE_URLS[0]);
        });

        it('persists the next index back to sessionStorage', () => {
            getBaseUrl();
            expect(sessionStorage.getItem('baseUrlIndex')).toBe('1');
        });
    });

    describe('get', () => {
        it('calls axios.get with the computed base url, api segment and given url', async () => {
            (axios.get as ReturnType<typeof vi.fn>).mockResolvedValue({data: []});
            const expectedBaseUrl = REACT_APP_DATA_BASE_URLS[0];

            await get('faqs/resident');

            expect(axios.get).toHaveBeenCalledWith(`${expectedBaseUrl}api/faqs/resident`);
        });

        it('advances the round-robin index on each call', async () => {
            (axios.get as ReturnType<typeof vi.fn>).mockResolvedValue({data: []});

            await get('one');
            await get('two');

            expect(axios.get).toHaveBeenNthCalledWith(1, `${REACT_APP_DATA_BASE_URLS[0]}api/one`);
            expect(axios.get).toHaveBeenNthCalledWith(2, `${REACT_APP_DATA_BASE_URLS[1]}api/two`);
        });
    });

    describe('DEFAULT_IMAGE_URL', () => {
        it('is one of the base urls suffixed with img/default.png', () => {
            const matchesABaseUrl = REACT_APP_DATA_BASE_URLS.some(
                baseUrl => DEFAULT_IMAGE_URL === `${baseUrl}img/default.png`
            );
            expect(matchesABaseUrl).toBe(true);
        });

        it('ends with the expected image path', () => {
            expect(DEFAULT_IMAGE_URL).toMatch(/img\/default\.png$/);
        });
    });

    describe('default export', () => {
        it('is the axios instance created via axios.create', () => {
            expect(ApiInstance).toBeDefined();
        });
    });
});
