import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import {ResidentFaqSection} from './ResidentFaqSection';
import {getMaintenanceFaqs, getResidentFaqs} from '../resident/service/ResidentService';

vi.mock('../resident/service/ResidentService', () => ({
    getResidentFaqs: vi.fn(),
    getMaintenanceFaqs: vi.fn()
}));

const mockedGetResidentFaqs = vi.mocked(getResidentFaqs);
const mockedGetMaintenanceFaqs = vi.mocked(getMaintenanceFaqs);

describe('ResidentFaqSection', () => {
    it('renders the section heading and both faq card titles', () => {
        mockedGetResidentFaqs.mockReturnValue(new Promise(() => {
        }));
        mockedGetMaintenanceFaqs.mockReturnValue(new Promise(() => {
        }));

        render(<ResidentFaqSection/>);

        expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
        expect(screen.getByText('General Questions')).toBeInTheDocument();
        expect(screen.getByText('Maintenance Questions')).toBeInTheDocument();
    });

    it('fetches resident and maintenance faqs and renders them sorted, in their own cards', async () => {
        mockedGetResidentFaqs.mockResolvedValue([
            {id: '2', question: 'Resident second', answer: 'Resident answer 2', sortOrder: 2},
            {id: '1', question: 'Resident first', answer: 'Resident answer 1', sortOrder: 1}
        ]);
        mockedGetMaintenanceFaqs.mockResolvedValue([
            {id: '3', question: 'Maintenance question', answer: 'Maintenance answer', sortOrder: 1}
        ]);

        render(<ResidentFaqSection/>);

        expect(await screen.findByText('Resident first')).toBeInTheDocument();
        expect(screen.getByText('Resident second')).toBeInTheDocument();
        expect(screen.getByText('Maintenance question')).toBeInTheDocument();

        expect(mockedGetResidentFaqs).toHaveBeenCalled();
        expect(mockedGetMaintenanceFaqs).toHaveBeenCalled();
    });
});
