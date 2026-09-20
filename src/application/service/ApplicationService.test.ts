import {beforeEach, describe, expect, it, vi} from 'vitest';
import {sendRentalApplicationRequest} from './ApplicationService';
import Api from '../../service/Api';
import {RentalApplication} from '../data/RentalApplication';

vi.mock('../../service/Api', () => ({
    default: {
        post: vi.fn()
    }
}));

describe('ApplicationService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('sendRentalApplicationRequest', () => {
        it('posts to applicationRequest with the given message and returns the response data', async () => {
            const message: RentalApplication = {
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'jane@example.com',
                property: 'scholars-rooftop',
                currentPage: 'https://example.com/apply',
                community: 'Scholar\'s Rooftop'
            };
            const responseData = {id: '123', status: 'received'};
            (Api.post as ReturnType<typeof vi.fn>).mockResolvedValue({data: responseData});

            const result = await sendRentalApplicationRequest(message);

            expect(Api.post).toHaveBeenCalledWith('applicationRequest', message);
            expect(result).toEqual(responseData);
        });

        it('propagates a rejection when the request fails', async () => {
            const message: RentalApplication = {
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'jane@example.com',
                property: 'scholars-rooftop',
                currentPage: 'https://example.com/apply',
                community: 'Scholar\'s Rooftop'
            };
            const error = {response: {data: {message: 'Bad Request'}}};
            (Api.post as ReturnType<typeof vi.fn>).mockRejectedValue(error);

            await expect(sendRentalApplicationRequest(message)).rejects.toEqual(error);
        });
    });
});
