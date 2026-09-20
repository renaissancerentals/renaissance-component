import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {TeamSection} from './TeamSection';
import {TeamMember} from './data/TeamMember';

const member = (overrides: Partial<TeamMember> = {}): TeamMember => ({
    name: 'John Cena',
    jobTitle: 'Wrestler',
    email: 'johncena@gmail.com',
    photoLink: '',
    blogLink: '',
    ...overrides
});

describe('TeamSection', () => {
    it('renders the section heading', () => {
        render(<TeamSection teamMembers={[]} isLoading={false} propertyId="verona-park"/>);

        expect(screen.getByText('Meet Our Team')).toBeInTheDocument();
    });

    it('renders three skeleton cards while loading', () => {
        const {container} = render(<TeamSection teamMembers={[]} isLoading={true} propertyId="verona-park"/>);

        expect(container.querySelectorAll('.team-card').length).toBe(3);
        expect(container.querySelectorAll('.react-loading-skeleton').length).toBeGreaterThan(0);
    });

    it('renders a card for each team member once loaded', () => {
        const teamMembers = [member({name: 'John Cena'}), member({name: 'Jane Doe', email: 'jane@example.com'})];

        render(<TeamSection teamMembers={teamMembers} isLoading={false} propertyId="verona-park"/>);

        expect(screen.getByText('John Cena')).toBeInTheDocument();
        expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    });

    it('renders no member cards when the team is empty and not loading', () => {
        const {container} = render(<TeamSection teamMembers={[]} isLoading={false} propertyId="verona-park"/>);

        expect(container.querySelectorAll('.team-card').length).toBe(0);
    });
});
