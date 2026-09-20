import {describe, expect, it} from 'vitest';
import {fullMonths, Month} from './Calendar';

describe('fullMonths', () => {
    it('maps abbreviated month names to their 1-based month number', () => {
        expect(fullMonths.Jan).toBe(1);
        expect(fullMonths.Jun).toBe(6);
        expect(fullMonths.Dec).toBe(12);
    });

    it('contains exactly the 12 months', () => {
        expect(Object.keys(fullMonths)).toHaveLength(12);
    });

    it('allows a Month key to index the map', () => {
        const month: Month = 'Sep';
        expect(fullMonths[month]).toBe(9);
    });
});
