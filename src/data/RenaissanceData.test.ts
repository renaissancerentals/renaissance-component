import {describe, expect, it} from 'vitest';
import {renaissance} from './RenaissanceData';

describe('renaissance', () => {
    it('exposes the expected contact, property and location details', () => {
        expect(renaissance).toEqual({
            contact: {
                number: '8123332280',
                display: '(812) 333-2280'
            },
            propertyId: 'renaissance-rentals',
            city: 'Bloomington',
            state: 'IN'
        });
    });
});
