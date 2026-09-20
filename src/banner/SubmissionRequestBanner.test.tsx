import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {SubmissionRequestBanner} from './SubmissionRequestBanner';

describe('SubmissionRequestBanner', () => {
    it('renders the submission trouble message with a mailto link', () => {
        const {container} = render(<SubmissionRequestBanner/>);

        expect(container.querySelector('p.submission-request-banner')).toBeInTheDocument();
        expect(screen.getByText(/If you have trouble/)).toBeInTheDocument();

        const link = screen.getByRole('link', {name: 'email us'});
        expect(link).toHaveAttribute('href', 'mailto:inquiries@renaissancerentals.com');
    });
});
