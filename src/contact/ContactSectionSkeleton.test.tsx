import {describe, expect, it} from 'vitest';
import {render} from '@testing-library/react';
import {ContactSectionSkeleton} from './ContactSectionSkeleton';

describe('ContactSectionSkeleton', () => {
    it('renders the contact section skeleton layout', () => {
        const {container} = render(<ContactSectionSkeleton/>);

        expect(container.querySelector('.section-contact')).toBeInTheDocument();
        expect(container.querySelector('form')).toBeInTheDocument();
        expect(container.querySelectorAll('.form-element').length).toBeGreaterThan(0);
    });
});
