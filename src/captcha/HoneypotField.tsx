import React from "react";

/**
 * A field real visitors never see (it is moved off screen, see `.hp-form-item` in form.css) but that form-filling bots
 * fill in. The server rejects a request whose `preferredName` is not empty (HoneyPot validator).
 *
 * The input is named `website`, not `preferredName`: browsers and password managers autofill fields whose name
 * looks like a name, which would lock real people out. The value travels as `preferredName` in the request, see
 * `honeypotValue` for forms that read their fields from the form element.
 */
export const HONEYPOT_FIELD = "website";

export const HoneypotField: React.FC<HoneypotFieldProps> = ({onChange}) => (
    <div className="hp-form-item" aria-hidden="true">
        <label htmlFor={HONEYPOT_FIELD}>Website</label>
        <input
            type="text"
            id={HONEYPOT_FIELD}
            name={HONEYPOT_FIELD}
            autoComplete="off"
            tabIndex={-1}
            data-lpignore="true"
            data-1p-ignore="true"
            onChange={event => onChange?.(event.currentTarget.value)}
        />
    </div>
);

/** What a bot typed into the honeypot of this form, "" when untouched. */
export const honeypotValue = (form: HTMLFormElement): string => {
    const field = form.elements.namedItem(HONEYPOT_FIELD);
    return field instanceof HTMLInputElement ? field.value : "";
};

export interface HoneypotFieldProps {
    onChange?: (value: string) => void;
}
