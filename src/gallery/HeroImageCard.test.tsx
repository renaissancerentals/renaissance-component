import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {HeroImageCard} from './HeroImageCard';

describe('HeroImageCard', () => {
    it('renders the background image and children', () => {
        render(
            <HeroImageCard backgroundImage="https://example.com/hero.jpg" onClick={vi.fn()}>
                <p>Virtual Tour</p>
            </HeroImageCard>
        );

        const img = screen.getByAltText('hero card') as HTMLImageElement;
        expect(img.src).toBe('https://example.com/hero.jpg');
        expect(screen.getByText('Virtual Tour')).toBeInTheDocument();
    });

    it('uses the desktop class by default', () => {
        const {container} = render(<HeroImageCard backgroundImage="hero.jpg" onClick={vi.fn()}/>);

        expect(container.querySelector('.gallery-hero--image.hero-image-card')).toBeInTheDocument();
        expect(container.querySelector('.gallery-hero-mobile--image')).not.toBeInTheDocument();
    });

    it('uses the mobile class when isForMobile is true', () => {
        const {container} = render(<HeroImageCard backgroundImage="hero.jpg" onClick={vi.fn()} isForMobile/>);

        expect(container.querySelector('.gallery-hero-mobile--image.hero-image-card')).toBeInTheDocument();
    });

    it('calls onClick when clicked', async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        const {container} = render(<HeroImageCard backgroundImage="hero.jpg" onClick={onClick}/>);

        await user.click(container.querySelector('.hero-image-card') as Element);

        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
