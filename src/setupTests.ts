import '@testing-library/jest-dom';
import {cleanup} from '@testing-library/react';
import {afterEach, beforeAll} from 'vitest';
import {PropertyNameIds} from './property/data/Property';

afterEach(() => {
    cleanup();
});

// jsdom does not implement the legacy named-property access on HTMLFormElement
// (e.g. `form.firstName`), which several components rely on to read field values on
// submit (ContactSection, SubletMessageModal, ...). Without this, `form.fieldName` is
// undefined even though `form.checkValidity()` succeeds, throwing inside the component.
// This is test-only: it defines getters on HTMLFormElement.prototype for the field
// names those forms actually use, each delegating to the spec-compliant
// `elements.namedItem(name)`, matching real-browser behavior. No production source
// is modified.
beforeAll(() => {
    const fieldNames = [
        'firstName', 'lastName', 'phone', 'email',
        'emailPreferred', 'phonePreferred', 'textPreferred', 'question',
        'preferredName', 'bedrooms', 'moveInDate', 'amenities', 'pets',
        'floorPlan', 'hearAboutUs', 'fullName', 'message',
        ...Object.keys(PropertyNameIds)
    ];
    fieldNames.forEach(name => {
        if (Object.getOwnPropertyDescriptor(HTMLFormElement.prototype, name)) {
            return;
        }
        Object.defineProperty(HTMLFormElement.prototype, name, {
            configurable: true,
            get(this: HTMLFormElement) {
                return this.elements.namedItem(name);
            }
        });
    });
});
