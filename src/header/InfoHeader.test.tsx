import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {InfoHeader} from './InfoHeader';

describe('InfoHeader', () => {
    it('renders its children inside a header.header-info > .container', () => {
        const {container} = render(
            <InfoHeader>
                <p>This is info header</p>
            </InfoHeader>
        );

        expect(screen.getByText('This is info header')).toBeInTheDocument();
        expect(container.querySelector('header.header-info')).toBeInTheDocument();
        expect(container.querySelector('header.header-info > .container')).toContainElement(
            screen.getByText('This is info header')
        );
    });
});
