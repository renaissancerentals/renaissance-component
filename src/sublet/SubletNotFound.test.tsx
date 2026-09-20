import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {SubletNotFound} from './SubletNotFound';

describe('SubletNotFound', () => {
    it('renders a 404 message', () => {
        render(<SubletNotFound/>);

        expect(screen.getByText('Uh-oh, this is a 404')).toBeInTheDocument();
    });
});
