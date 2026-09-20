import {describe, expect, it, vi} from 'vitest';
import {render, screen, waitFor} from '@testing-library/react';
import {ReviewSection} from './ReviewSection';
import {PropertyDetails} from '../property/data/Property';
import {Testimonial} from '../floorplan/data/Floorplan';
import {getTestimonials} from '../floorplan/service/FloorplanService';

vi.mock('../floorplan/service/FloorplanService', () => ({
    getTestimonials: vi.fn()
}));

vi.mock('../asset/service/AssetService', () => ({
    getAssetUrl: vi.fn(() => 'https://example.com/cover.jpg')
}));

const mockedGetTestimonials = vi.mocked(getTestimonials);

const testimonial = (tenant: string): Testimonial => ({
    testimonial: `${tenant} loved living here`,
    tenant
});

const baseProperty = (overrides: Partial<PropertyDetails> = {}): PropertyDetails => ({
    id: 'property-1',
    floorplans: [{id: 'fp-1'} as any],
    rating: 0,
    ratingLink: '',
    coverImage: null,
    ...overrides
} as PropertyDetails);

describe('ReviewSection', () => {
    it('does not render review content while testimonials are loading', () => {
        mockedGetTestimonials.mockReturnValue(new Promise(() => {
        }));

        const {container} = render(<ReviewSection property={baseProperty()}/>);

        expect(container.querySelector('.review-content')).not.toBeInTheDocument();
    });

    it('renders paired testimonials once loaded', async () => {
        mockedGetTestimonials.mockResolvedValue([
            testimonial('Alice'), testimonial('Bob'), testimonial('Carol')
        ]);

        render(<ReviewSection property={baseProperty()}/>);

        await waitFor(() => {
            expect(screen.getByText('Alice loved living here')).toBeInTheDocument();
        });

        expect(screen.getByText('-Alice | resident')).toBeInTheDocument();
        expect(screen.getByText('Bob loved living here')).toBeInTheDocument();
        expect(screen.getByText('-Bob | resident')).toBeInTheDocument();
        // Carol has no pair (odd count) so should not be rendered
        expect(screen.queryByText('Carol loved living here')).not.toBeInTheDocument();
    });

    it('does not render the rating footer when the property has no rating', async () => {
        mockedGetTestimonials.mockResolvedValue([testimonial('Alice'), testimonial('Bob')]);

        const {container} = render(<ReviewSection property={baseProperty({rating: 0})}/>);

        await waitFor(() => {
            expect(container.querySelector('.review-content')).toBeInTheDocument();
        });

        expect(container.querySelector('.review-footer')).not.toBeInTheDocument();
    });

    it('renders the rating as plain text when there is no rating link', async () => {
        mockedGetTestimonials.mockResolvedValue([testimonial('Alice'), testimonial('Bob')]);

        render(<ReviewSection property={baseProperty({rating: 4.5, ratingLink: ''})}/>);

        await waitFor(() => {
            expect(screen.getByText('4.5 Stars on Google')).toBeInTheDocument();
        });

        expect(screen.queryByRole('link', {name: /Stars on Google/})).not.toBeInTheDocument();
    });

    it('renders the rating as a link to Google when a rating link is provided', async () => {
        mockedGetTestimonials.mockResolvedValue([testimonial('Alice'), testimonial('Bob')]);

        render(
            <ReviewSection
                property={baseProperty({rating: 4.5, ratingLink: 'https://google.com/reviews'})}
            />
        );

        const link = await screen.findByRole('link', {name: '4.5 Stars on Google'});
        expect(link).toHaveAttribute('href', 'https://google.com/reviews');
        expect(link).toHaveAttribute('target', '_blank');
    });

    it('requests testimonials for every floorplan on the property', async () => {
        mockedGetTestimonials.mockResolvedValue([]);

        render(
            <ReviewSection
                property={baseProperty({floorplans: [{id: 'fp-1'} as any, {id: 'fp-2'} as any]})}
            />
        );

        await waitFor(() => {
            expect(mockedGetTestimonials).toHaveBeenCalledTimes(2);
        });
        expect(mockedGetTestimonials).toHaveBeenCalledWith('fp-1');
        expect(mockedGetTestimonials).toHaveBeenCalledWith('fp-2');
    });
});
