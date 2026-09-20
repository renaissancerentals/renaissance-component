import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {TestimonialsCard} from './TestimonialsCard';
import {Testimonial} from '../data/Floorplan';

const testimonials: Testimonial[] = [
    {testimonial: 'Great place to live!', tenant: 'Jane Doe'},
    {testimonial: 'Loved the amenities.', tenant: 'John Smith'}
];

describe('TestimonialsCard', () => {
    it('renders every testimonial quote and its tenant', () => {
        render(<TestimonialsCard testimonials={testimonials}/>);

        expect(screen.getByText('Great place to live!')).toBeInTheDocument();
        expect(screen.getByText('- Jane Doe, former resident')).toBeInTheDocument();
        expect(screen.getByText('Loved the amenities.')).toBeInTheDocument();
        expect(screen.getByText('- John Smith, former resident')).toBeInTheDocument();
    });

    it('renders inside a featured card', () => {
        const {container} = render(<TestimonialsCard testimonials={testimonials}/>);

        expect(container.querySelector('.testimonials-card')).toBeInTheDocument();
        expect(container.querySelector('.card-body--featured')).toBeInTheDocument();
    });

    it('navigates to the next testimonial when the right nav button is clicked', async () => {
        const user = userEvent.setup();
        render(<TestimonialsCard testimonials={testimonials}/>);

        const nextButton = screen.getByTitle('Navigate Right');
        await user.click(nextButton);

        expect(screen.getByTitle('Navigate Left')).toBeInTheDocument();
    });

    it('renders no navigation buttons for a single testimonial', () => {
        render(<TestimonialsCard testimonials={[testimonials[0]]}/>);

        expect(screen.queryByTitle('Navigate Left')).not.toBeInTheDocument();
        expect(screen.queryByTitle('Navigate Right')).not.toBeInTheDocument();
    });
});
