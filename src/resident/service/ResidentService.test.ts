import {beforeEach, describe, expect, it, vi} from 'vitest';
import {getMaintenanceFaqs, getResidentFaqs} from './ResidentService';
import Api from '../../service/Api';

vi.mock('../../service/Api', () => ({
    default: {
        get: vi.fn()
    }
}));

describe('ResidentService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getResidentFaqs', () => {
        it('requests faqs/resident and returns the response data', async () => {
            const faqs = [{id: '1', question: 'Q', answer: 'A', sortOrder: 1, lastModifiedBy: 'x', lastModifiedDate: '2026-01-01'}];
            (Api.get as ReturnType<typeof vi.fn>).mockResolvedValue({data: faqs});

            const result = await getResidentFaqs();

            expect(Api.get).toHaveBeenCalledWith('faqs/resident');
            expect(result).toEqual(faqs);
        });
    });

    describe('getMaintenanceFaqs', () => {
        it('requests faqs/maintenance and returns the response data', async () => {
            const faqs = [{id: '2', question: 'Q2', answer: 'A2', sortOrder: 2, lastModifiedBy: 'y', lastModifiedDate: '2026-01-02'}];
            (Api.get as ReturnType<typeof vi.fn>).mockResolvedValue({data: faqs});

            const result = await getMaintenanceFaqs();

            expect(Api.get).toHaveBeenCalledWith('faqs/maintenance');
            expect(result).toEqual(faqs);
        });
    });
});
