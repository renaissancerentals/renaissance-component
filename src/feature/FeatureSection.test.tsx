import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {FeatureSection} from './FeatureSection';

describe('FeatureSection', () => {
    it('renders its children inside a section', () => {
        const {container} = render(
            <FeatureSection>
                <h3>Featured Section</h3>
                <p>Some feature copy</p>
            </FeatureSection>
        );

        expect(screen.getByText('Featured Section')).toBeInTheDocument();
        expect(screen.getByText('Some feature copy')).toBeInTheDocument();
        expect(container.querySelector('section.section-feature')).toBeInTheDocument();
    });
});
