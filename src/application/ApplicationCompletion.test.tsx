import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {ApplicationCompletion} from './ApplicationCompletion';

describe('ApplicationCompletion', () => {
    it('renders the completion message', () => {
        render(<ApplicationCompletion/>);

        expect(screen.getByText('Thank you for submitting your application request.')).toBeInTheDocument();
    });

    it('renders all three steps of the process', () => {
        render(<ApplicationCompletion/>);

        expect(screen.getByText('Receive a link')).toBeInTheDocument();
        expect(screen.getByText('Submit')).toBeInTheDocument();
        expect(screen.getByText('You\'ll receive a secure link within the next business day to complete your application.')).toBeInTheDocument();
        expect(screen.getByText('Submit your official application for our team to review.')).toBeInTheDocument();
    });

    it('shows the Complete badge', () => {
        render(<ApplicationCompletion/>);

        expect(screen.getAllByText('Complete').length).toBeGreaterThan(0);
    });
});
