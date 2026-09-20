import {beforeEach, describe, expect, it, vi} from 'vitest';
import {getAllTeamMembers} from './TeamService';
import Api from '../../service/Api';

vi.mock('../../service/Api', () => ({
    default: {
        get: vi.fn()
    }
}));

describe('TeamService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getAllTeamMembers', () => {
        it('requests teamMembers and returns the response data', async () => {
            const teamMembers = [
                {name: 'John Cena', jobTitle: 'Wrestler', email: 'johncena@gmail.com', photoLink: '', blogLink: ''}
            ];
            (Api.get as ReturnType<typeof vi.fn>).mockResolvedValue({data: teamMembers});

            const result = await getAllTeamMembers();

            expect(Api.get).toHaveBeenCalledWith('teamMembers');
            expect(result).toEqual(teamMembers);
        });

        it('propagates a rejection when the request fails', async () => {
            const error = {response: {data: {message: 'Bad Request'}}};
            (Api.get as ReturnType<typeof vi.fn>).mockRejectedValue(error);

            await expect(getAllTeamMembers()).rejects.toEqual(error);
        });
    });
});
