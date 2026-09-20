import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {Footer} from './Footer';

const nav = (
    <ul>
        <li><a href="/apply">apply</a></li>
        <li><a href="/contact">contact</a></li>
    </ul>
);

describe('Footer', () => {
    it('renders the nav content and defaults the accessibility link', () => {
        const {container} = render(<Footer nav={nav}/>);

        expect(screen.getAllByText('apply').length).toBeGreaterThan(0);
        expect(screen.getAllByText('contact').length).toBeGreaterThan(0);

        const accessibilityLinks = container.querySelectorAll(
            'a[href="https://www.renaissancerentals.com/accessibility"]'
        );
        expect(accessibilityLinks.length).toBeGreaterThan(0);
    });

    it('uses a custom accessibility link when provided', () => {
        const {container} = render(
            <Footer nav={nav} accessibilityLink="https://example.com/a11y"/>
        );

        const accessibilityLinks = container.querySelectorAll('a[href="https://example.com/a11y"]');
        expect(accessibilityLinks.length).toBeGreaterThan(0);
        expect(container.querySelectorAll('a[href="https://www.renaissancerentals.com/accessibility"]').length).toBe(0);
    });

    it('renders both the mobile and main layout wrappers', () => {
        const {container} = render(<Footer nav={nav}/>);

        expect(container.querySelector('div.mobile')).toBeInTheDocument();
        expect(container.querySelector('div.main')).toBeInTheDocument();
    });
});
