import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {FaqsSection} from './FaqsSection';
import {Faq} from './data/Faq';

const faqs: Faq[] = [
    {id: '1', question: 'What is included in rent?', answer: 'Water, trash, and sewer.', sortOrder: 1},
    {id: '2', question: 'Is parking available?', answer: 'Yes, one spot per unit.', sortOrder: 2}
];

describe('FaqsSection', () => {
    it('renders a fold for every faq with its question as the heading', () => {
        const {container} = render(<FaqsSection faqs={faqs}/>);

        expect(container.querySelectorAll('.fold')).toHaveLength(2);
        expect(screen.getByText('What is included in rent?')).toBeInTheDocument();
        expect(screen.getByText('Is parking available?')).toBeInTheDocument();
    });

    it('renders every fold collapsed by default', () => {
        const {container} = render(<FaqsSection faqs={faqs}/>);

        container.querySelectorAll('.fold').forEach(fold => {
            expect(fold).toHaveAttribute('aria-expanded', 'false');
        });
    });

    it('toggles a fold open and closed when its heading is clicked', async () => {
        const user = userEvent.setup();
        render(<FaqsSection faqs={faqs}/>);

        const heading = screen.getByText('Is parking available?');
        const fold = heading.closest('.fold');

        await user.click(heading);
        expect(fold).toHaveAttribute('aria-expanded', 'true');
        expect(screen.getByText('Yes, one spot per unit.')).toBeInTheDocument();

        await user.click(heading);
        expect(fold).toHaveAttribute('aria-expanded', 'false');
    });

    it('renders no folds for an empty faqs list', () => {
        const {container} = render(<FaqsSection faqs={[]}/>);

        expect(container.querySelectorAll('.fold')).toHaveLength(0);
    });
});
