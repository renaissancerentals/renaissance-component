import {beforeEach, describe, expect, it, vi} from 'vitest';
import Api from '../../service/Api';
import {deleteSublet, getSublet, getSublets, postAsset, postSublet, sendMessage} from './SubletService';
import {Sublet} from '../data/Sublet';
import {SubletMessage} from '../data/SubletMessage';

vi.mock('../../service/Api', () => ({
    default: {
        get: vi.fn(),
        post: vi.fn(),
        delete: vi.fn()
    }
}));

const sublet = (overrides: Partial<Sublet> = {}): Sublet => ({
    assetKey: 'asset-1',
    email: 'jane@example.com',
    firstName: 'Jane',
    lastName: 'Doe',
    bedroom: '3',
    availableBedrooms: '1',
    availableFrom: '2026-03-01',
    availableTo: '2026-06-01',
    rent: '1200',
    petsAllowed: true,
    utilitiesIncluded: false,
    address: '123 Main St',
    zipcode: '47401',
    subletFolderId: '',
    photosFolderId: '',
    coverImage: 'cover.jpg',
    title: 'Cozy Room Near Campus',
    description: 'A great place',
    createdDate: '2026-01-01',
    ...overrides
});

describe('SubletService', () => {
    beforeEach(() => {
        vi.mocked(Api.get).mockReset();
        vi.mocked(Api.post).mockReset();
        vi.mocked(Api.delete).mockReset();
    });

    describe('getSublets', () => {
        it('calls the sublets endpoint and returns the data', async () => {
            const data = [sublet()];
            vi.mocked(Api.get).mockResolvedValueOnce({data} as any);

            const result = await getSublets();

            expect(Api.get).toHaveBeenCalledWith('sublets');
            expect(result).toEqual(data);
        });
    });

    describe('getSublet', () => {
        it('calls the sublets endpoint for a specific asset key', async () => {
            const data = sublet();
            vi.mocked(Api.get).mockResolvedValueOnce({data} as any);

            const result = await getSublet('asset-1');

            expect(Api.get).toHaveBeenCalledWith('sublets/asset-1');
            expect(result).toEqual(data);
        });
    });

    describe('postSublet', () => {
        it('posts the sublet payload to the sublets endpoint', async () => {
            const input = sublet();
            const data = sublet({assetKey: 'new-key'});
            vi.mocked(Api.post).mockResolvedValueOnce({data} as any);

            const result = await postSublet(input);

            expect(Api.post).toHaveBeenCalledWith('sublets', {...input});
            expect(result).toEqual(data);
        });
    });

    describe('deleteSublet', () => {
        it('calls delete on the sublets endpoint for the given asset key', async () => {
            vi.mocked(Api.delete).mockResolvedValueOnce({} as any);

            await deleteSublet('asset-1');

            expect(Api.delete).toHaveBeenCalledWith('sublets/asset-1');
        });
    });

    describe('postAsset', () => {
        it('posts a multipart form with the file, name and cover-image flag', async () => {
            const data = {id: 'asset-id'};
            vi.mocked(Api.post).mockResolvedValueOnce({data} as any);
            const file = new File(['content'], 'photo.png', {type: 'image/png'});

            const result = await postAsset('asset-1', file, '0', true);

            expect(Api.post).toHaveBeenCalledWith(
                'sublets/asset-1/assets',
                expect.any(FormData),
                expect.objectContaining({headers: {'Content-Type': 'multipart/form-data'}})
            );
            const formData = vi.mocked(Api.post).mock.calls[0][1] as FormData;
            expect(formData.get('name')).toBe('0');
            expect(formData.get('isCoverImage')).toBe('true');
            expect(formData.get('file')).toBe(file);
            expect(result).toEqual(data);
        });

        it('passes the onUploadProgress callback through to Api.post config', async () => {
            vi.mocked(Api.post).mockResolvedValueOnce({data: {}} as any);
            const file = new File(['content'], 'photo.png', {type: 'image/png'});
            const onUploadProgress = vi.fn();

            await postAsset('asset-1', file, '0', false, onUploadProgress);

            expect(Api.post).toHaveBeenCalledWith(
                'sublets/asset-1/assets',
                expect.any(FormData),
                expect.objectContaining({onUploadProgress})
            );
        });
    });

    describe('sendMessage', () => {
        it('posts the message payload to the sublet messages endpoint', () => {
            const message: SubletMessage = {name: 'Jane', email: 'jane@example.com', message: 'Hi there'};
            vi.mocked(Api.post).mockResolvedValueOnce({} as any);

            sendMessage('asset-1', message);

            expect(Api.post).toHaveBeenCalledWith('sublets/asset-1/messages', {...message});
        });
    });
});
