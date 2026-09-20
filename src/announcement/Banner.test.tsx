import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import {act} from 'react';
import {Banner} from './Banner';

describe('Banner', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('does not render its children before the delay has elapsed', () => {
        const {container} = render(<Banner delay={3000}>Hello there</Banner>);

        expect(screen.queryByText('Hello there')).not.toBeInTheDocument();
        expect(container.querySelector('.section-announcement')).not.toBeInTheDocument();
    });

    it('renders its children after the default 3000ms delay', () => {
        render(<Banner>Hello there</Banner>);

        act(() => {
            vi.advanceTimersByTime(3000);
        });

        expect(screen.getByText('Hello there')).toBeInTheDocument();
    });

    it('renders its children after a custom delay', () => {
        render(<Banner delay={500}>Custom delay content</Banner>);

        act(() => {
            vi.advanceTimersByTime(499);
        });
        expect(screen.queryByText('Custom delay content')).not.toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(1);
        });
        expect(screen.getByText('Custom delay content')).toBeInTheDocument();
    });
});
