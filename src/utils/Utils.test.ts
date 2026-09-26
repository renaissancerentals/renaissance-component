import {describe, expect, it} from 'vitest';
import {
    addressToGoogleMap,
    addressToGoogleMapLink,
    availabilityDate,
    capitalizeFirstLetter,
    dateToMoment,
    decode,
    enumToString,
    extractIdFrom,
    formatDate,
    formatPhoneNumber,
    isEmpty,
    isGoogleDriveImage,
    isZipcodeValid,
    minimumMaximum,
    momentToDate,
    rangeFrom,
    renaissanceAddress,
    toNumber,
    toUSD,
    youtubeUrlToEmbedUrl
} from './Utils';

describe('isEmpty', () => {
    it('returns true for null, undefined, empty string, empty array and empty object', () => {
        expect(isEmpty(null)).toBe(true);
        expect(isEmpty(undefined)).toBe(true);
        expect(isEmpty('')).toBe(true);
        expect(isEmpty([])).toBe(true);
        expect(isEmpty({})).toBe(true);
    });

    it('returns false for non-empty values', () => {
        expect(isEmpty('a')).toBe(false);
        expect(isEmpty([1])).toBe(false);
        expect(isEmpty({a: 1})).toBe(false);
    });
});

describe('formatPhoneNumber', () => {
    it('formats a 10-digit phone number', () => {
        expect(formatPhoneNumber('3175551234')).toBe('(317)-555-1234');
    });

    it('returns the original value when it does not match the pattern', () => {
        expect(formatPhoneNumber('12345')).toBe('12345');
    });

    it('returns an empty string when no phone is given', () => {
        expect(formatPhoneNumber(undefined)).toBe('');
        expect(formatPhoneNumber('')).toBe('');
    });
});

describe('renaissanceAddress', () => {
    it('builds a full address string with city/state appended', () => {
        expect(renaissanceAddress('123 Main St', '47401')).toBe('123 Main St, Bloomington,IN 47401');
    });
});

describe('addressToGoogleMapLink', () => {
    it('builds a mapquest search link and strips "apt." from the address', () => {
        const link = addressToGoogleMapLink('123 Main St Apt. 4', '47401');
        expect(link).toBe('https://www.mapquest.com/search/' + encodeURIComponent('123 Main St 4,47401'));
    });
});

describe('addressToGoogleMap', () => {
    it('builds an embeddable mapquest static map url', () => {
        const link = addressToGoogleMap('123 Main St', '47401');
        expect(link).toContain('https://www.mapquestapi.com/staticmap/v5/map?key=');
        expect(link).toContain('center=' + encodeURIComponent('123 Main St,47401'));
    });
});

describe('enumToString', () => {
    it('replaces underscores with spaces and lowercases the value', () => {
        expect(enumToString('ONE_BEDROOM')).toBe('one bedroom');
    });

    it('returns an empty string for empty input', () => {
        expect(enumToString(undefined)).toBe('');
        expect(enumToString('')).toBe('');
    });
});

describe('capitalizeFirstLetter', () => {
    it('capitalizes the first letter and lowercases the rest', () => {
        expect(capitalizeFirstLetter('hELLO')).toBe('Hello');
    });

    it('returns the original (falsy) value unchanged', () => {
        expect(capitalizeFirstLetter('')).toBe('');
    });
});

describe('toUSD', () => {
    it('formats a number as USD currency with no decimals', () => {
        expect(toUSD(1500)).toBe('$1,500');
    });
});

describe('youtubeUrlToEmbedUrl', () => {
    it('converts a youtube watch url into an embed url', () => {
        expect(youtubeUrlToEmbedUrl('https://youtu.be/abc123')).toBe('https://www.youtube.com/embed/abc123?rel=0');
    });
});

describe('isGoogleDriveImage', () => {
    it('detects google drive image urls', () => {
        expect(isGoogleDriveImage('https://drive.google.com/file/d/abc')).toBe(true);
        expect(isGoogleDriveImage('https://example.com/image.jpg')).toBe(false);
    });
});

describe('extractIdFrom', () => {
    it('extracts the id query param from a url', () => {
        expect(extractIdFrom('https://drive.google.com/uc?id=abc123&export=view')).toBe('abc123');
    });

    it('returns an empty string when there is no id param or url', () => {
        expect(extractIdFrom('https://drive.google.com/uc?export=view')).toBe('');
        expect(extractIdFrom(null)).toBe('');
    });
});

describe('minimumMaximum', () => {
    it('computes the min/max of a numeric field across active items', () => {
        const items = [{rent: 1000, active: true}, {rent: '$1500'}, {rent: 800, active: false}];
        expect(minimumMaximum(items, 'rent')).toEqual({min: 1000, max: 1500});
    });

    it('returns MIN_VALUE for both when there are no valid values', () => {
        expect(minimumMaximum([], 'rent')).toEqual({min: 0, max: 0});
        expect(minimumMaximum(undefined, 'rent')).toEqual({min: 0, max: 0});
    });
});

describe('rangeFrom', () => {
    it('renders a single value when min equals max', () => {
        expect(rangeFrom([{rent: 1200}], 'rent')).toBe('1200');
    });

    it('renders a "min - max" range when they differ', () => {
        expect(rangeFrom([{rent: 1000}, {rent: 1500}], 'rent')).toBe('1000 - 1500');
    });

    it('renders "-" for an empty array', () => {
        expect(rangeFrom([], 'rent')).toBe('-');
    });
});

describe('date helpers', () => {
    it('round-trips a date through dateToMoment/momentToDate', () => {
        expect(momentToDate(dateToMoment('2026-03-05'))).toBe('2026-03-05');
    });

    it('formats a date into a human-readable string', () => {
        expect(formatDate('2026-03-05')).toBe('Mar 05, 2026');
    });

    it('availabilityDate returns today formatted when the move-in date is today or in the past', () => {
        const today = momentToDate(dateToMoment(new Date().toISOString().slice(0, 10)));
        expect(availabilityDate(today)).toBe(formatDate(today));
    });

    it('availabilityDate returns the formatted future date unchanged', () => {
        const future = '2099-01-01';
        expect(availabilityDate(future)).toBe(formatDate(future));
    });
});

describe('decode', () => {
    it('decodes a single html entity token', () => {
        expect(decode('&amp;')).toBe('&');
        expect(decode('&#38;')).toBe('&');
    });

    it('leaves plain text without a full entity token unchanged', () => {
        expect(decode('Tom &amp; Jerry')).toBe('Tom &amp; Jerry');
    });
});

describe('isZipcodeValid', () => {
    it('accepts a 5-digit zipcode', () => {
        expect(isZipcodeValid('47401')).toBe(true);
    });

    it('rejects a malformed zipcode', () => {
        expect(isZipcodeValid('4740')).toBe(false);
        expect(isZipcodeValid('abcde')).toBe(false);
    });

    it('treats an empty zipcode as valid (optional field)', () => {
        expect(isZipcodeValid(undefined)).toBe(true);
        expect(isZipcodeValid('')).toBe(true);
    });
});

describe('toNumber', () => {
    it('parses plain numbers and numeric strings', () => {
        expect(toNumber(42)).toBe(42);
        expect(toNumber('42')).toBe(42);
    });

    it('strips currency symbols and commas', () => {
        expect(toNumber('$1,234.50')).toBe(1234.5);
    });

    it('returns null for null/undefined/empty/non-numeric input', () => {
        expect(toNumber(null)).toBeNull();
        expect(toNumber(undefined)).toBeNull();
        expect(toNumber('')).toBeNull();
        expect(toNumber('abc')).toBeNull();
        expect(toNumber(NaN)).toBeNull();
    });
});
