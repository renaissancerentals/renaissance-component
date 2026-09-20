import {describe, expect, it} from 'vitest';
import {render} from '@testing-library/react';
import {SortFields} from './SortField';

describe('SortFields', () => {
    it('defines the expected sort keys with their sortField and order', () => {
        expect(SortFields.featured).toMatchObject({sortField: 'featured', order: 'desc'});
        expect(SortFields.priceAsc).toMatchObject({sortField: 'minRate', order: 'asc'});
        expect(SortFields.priceDesc).toMatchObject({sortField: 'minRate', order: 'desc'});
        expect(SortFields.bedroomsAsc).toMatchObject({sortField: 'bedroom', order: 'asc'});
        expect(SortFields.bedroomsDesc).toMatchObject({sortField: 'bedroom', order: 'desc'});
        expect(SortFields.availabilityAsc).toMatchObject({sortField: 'moveInDate', order: 'asc'});
        expect(SortFields.availabilityDesc).toMatchObject({sortField: 'moveInDate', order: 'desc'});
    });

    it('has exactly 7 sort options', () => {
        expect(Object.keys(SortFields)).toHaveLength(7);
    });

    it('provides a renderable icon element for each sort field', () => {
        Object.values(SortFields).forEach(sortField => {
            const {container} = render(sortField.element);
            expect(container.querySelector('svg, [class*="icon"]') || container.firstChild).toBeTruthy();
        });
    });
});
