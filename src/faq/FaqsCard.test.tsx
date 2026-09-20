import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {FaqsCard} from './FaqsCard';
import {Faq} from './data/Faq';

const faqs: Faq[] = [
    {id: '1', question: 'What is included in rent?', answer: 'Water, trash, and sewer.', sortOrder: 1},
    {id: '2', question: 'Is parking available?', answer: 'Yes, one spot per unit.', sortOrder: 2}
];

describe('FaqsCard', () => {
    it('renders the card title', () => {
        render(<FaqsCard title="Frequently Asked Questions" faqs={faqs}/>);

        expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    });

    it('renders a fold heading for each faq', () => {
        render(<FaqsCard title="FAQs" faqs={faqs}/>);

        expect(screen.getByText('What is included in rent?')).toBeInTheDocument();
        expect(screen.getByText('Is parking available?')).toBeInTheDocument();
    });

    it('renders no folds when there are no faqs', () => {
        const {container} = render(<FaqsCard title="FAQs" faqs={[]}/>);

        expect(container.querySelectorAll('.fold')).toHaveLength(0);
    });

    it('expands an answer when its question is clicked', async () => {
        const user = userEvent.setup();
        render(<FaqsCard title="FAQs" faqs={faqs}/>);

        const fold = screen.getByText('What is included in rent?').closest('.fold');
        expect(fold).toHaveAttribute('aria-expanded', 'false');

        await user.click(screen.getByText('What is included in rent?'));

        expect(fold).toHaveAttribute('aria-expanded', 'true');
        expect(screen.getByText('Water, trash, and sewer.')).toBeInTheDocument();
    });
});
