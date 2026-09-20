import {describe, expect, it, vi} from 'vitest';
import {render, screen, waitFor} from '@testing-library/react';
import {PropertyFaqSection} from './PropertyFaqSection';
import {getPropertyFaqs} from '../property/service/PropertyService';

vi.mock('../property/service/PropertyService', () => ({
    getPropertyFaqs: vi.fn()
}));

const mockedGetPropertyFaqs = vi.mocked(getPropertyFaqs);

describe('PropertyFaqSection', () => {
    it('renders nothing while there are no faqs', () => {
        mockedGetPropertyFaqs.mockReturnValue(new Promise(() => {
        }));

        const {container} = render(<PropertyFaqSection propertyId="covenanter-hill"/>);

        expect(container).toBeEmptyDOMElement();
    });

    it('fetches faqs for the given property and renders them sorted by sortOrder', async () => {
        mockedGetPropertyFaqs.mockResolvedValue([
            {id: '2', question: 'Second question', answer: 'Second answer', sortOrder: 2},
            {id: '1', question: 'First question', answer: 'First answer', sortOrder: 1}
        ]);

        render(<PropertyFaqSection propertyId="covenanter-hill"/>);

        expect(await screen.findByText('Frequently Asked Questions')).toBeInTheDocument();
        expect(mockedGetPropertyFaqs).toHaveBeenCalledWith('covenanter-hill');

        const headings = await screen.findAllByRole('button');
        expect(headings[0]).toHaveTextContent('First question');
        expect(headings[1]).toHaveTextContent('Second question');
    });

    it('renders nothing when the property has no faqs', async () => {
        mockedGetPropertyFaqs.mockResolvedValue([]);

        const {container} = render(<PropertyFaqSection propertyId="covenanter-hill"/>);

        await waitFor(() => expect(mockedGetPropertyFaqs).toHaveBeenCalled());
        expect(container).toBeEmptyDOMElement();
    });
});
