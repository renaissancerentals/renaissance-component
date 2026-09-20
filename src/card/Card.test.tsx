import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {Card} from './Card';

describe('Card', () => {
    it('renders the title and children when a title is given', () => {
        render(<Card title="Amenities">Pool, gym, and more</Card>);

        expect(screen.getByText('Amenities')).toBeInTheDocument();
        expect(screen.getByText('Pool, gym, and more')).toBeInTheDocument();
    });

    it('omits the header when no title is given', () => {
        const {container} = render(<Card>Body only</Card>);

        expect(container.querySelector('.card-header')).not.toBeInTheDocument();
        expect(screen.getByText('Body only')).toBeInTheDocument();
    });

    it('applies the featured modifier class when featured', () => {
        const {container} = render(<Card featured>Featured content</Card>);

        expect(container.querySelector('.card-body--featured')).toBeInTheDocument();
    });

    it('does not apply the featured modifier class by default', () => {
        const {container} = render(<Card>Default content</Card>);

        expect(container.querySelector('.card-body--featured')).not.toBeInTheDocument();
        expect(container.querySelector('.card-body')).toBeInTheDocument();
    });
});
