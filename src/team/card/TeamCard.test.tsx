import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {TeamCard} from './TeamCard';
import {TeamMember} from '../data/TeamMember';

const member = (overrides: Partial<TeamMember> = {}): TeamMember => ({
    name: 'John Cena',
    jobTitle: 'Wrestler',
    email: 'johncena@gmail.com',
    photoLink: '',
    blogLink: '',
    ...overrides
});

describe('TeamCard', () => {
    it('renders nothing when no member is given', () => {
        const {container} = render(<TeamCard propertyId="verona-park"/>);

        expect(container.querySelector('.team-card')).not.toBeInTheDocument();
    });

    it('renders the member name, job title and email when a member is given', () => {
        render(<TeamCard member={member()} propertyId="verona-park"/>);

        expect(screen.getByText('John Cena')).toBeInTheDocument();
        expect(screen.getByText('Wrestler')).toBeInTheDocument();
        expect(screen.getByText('johncena@gmail.com')).toBeInTheDocument();
    });

    it('links the email as a mailto link', () => {
        render(<TeamCard member={member()} propertyId="verona-park"/>);

        const emailLink = screen.getByText('johncena@gmail.com').closest('a');
        expect(emailLink).toHaveAttribute('href', 'mailto:johncena@gmail.com');
    });

    it('renders the default avatar when no photoLink is given', () => {
        render(<TeamCard member={member({photoLink: ''})} propertyId="verona-park"/>);

        const image = screen.getByAltText('John Cena') as HTMLImageElement;
        expect(image.src).toContain('default-avatar');
    });

    it('renders the member photo when a photoLink is given', () => {
        render(<TeamCard member={member({photoLink: 'https://example.com/photo.jpg'})} propertyId="verona-park"/>);

        const image = screen.getByAltText('John Cena') as HTMLImageElement;
        expect(image.src).toBe('https://example.com/photo.jpg');
    });

    it('renders a "MORE ABOUT ME" link when a blogLink is given', () => {
        render(<TeamCard member={member({blogLink: 'https://myblog.com'})} propertyId="verona-park"/>);

        const moreLink = screen.getByText('MORE ABOUT ME').closest('a');
        expect(moreLink).toHaveAttribute('href', 'https://myblog.com');
    });

    it('does not render a "MORE ABOUT ME" link when no blogLink is given', () => {
        render(<TeamCard member={member({blogLink: ''})} propertyId="verona-park"/>);

        expect(screen.queryByText('MORE ABOUT ME')).not.toBeInTheDocument();
    });
});
