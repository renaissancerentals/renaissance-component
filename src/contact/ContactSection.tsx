import React, {useEffect, useState} from 'react';
import './assets/ContactSection.scss';
import {formatPhoneNumber} from "../utils/Utils";
import {GoogleReCaptchaProvider, useGoogleReCaptcha} from "react-google-recaptcha-v3";
import {Badge, Button, Checkbox, Icon, Input, RangeSlider, Spinner, Textarea} from "@contentmunch/muncher-ui";
import {PropertiesEmail, PropertyId} from "../property/data/Property";
import {MAX_RENT, MIN_RENT} from "../floorplan/data/Floorplan";
import {ContactMessage, defaultContactMessage} from "./data/ContactMessage";
import {sendContactMail, sendToConversionTracking, trackContactSubmitted} from "./service/ContactService";


const Contact: React.FC<ContactSectionProps> = ({
                                                    propertyId,
                                                    subject,
                                                    to,
                                                    contactNumber,
                                                    conversionTrackingId1,
                                                    conversionTrackingId2,
                                                }) => {
    const {executeRecaptcha} = useGoogleReCaptcha();
    const [token, setToken] = useState('');
    const [isFirstStep, setIsFirstStep] = useState(true);
    const [lowerRent, setLowerRent] = useState(0);
    const [upperRent, setUpperRent] = useState(4000);
    const [hasContactError, setHasContactError] = useState(false);
    const [contactMessage, setContactMessage] = useState(defaultContactMessage)
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionError, setSubmissionError] = useState(false);
    const [submissionErrorMessage, setSubmissionErrorMessage] = useState("Message Failed!");
    const [submissionComplete, setSubmissionComplete] = useState(false);
    const nextButtonHandler = (event: React.FormEvent<HTMLFormElement>) => {

        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        setHasContactError(false);
        if (form.checkValidity()) {
            const currentMessage: ContactMessage = {
                to, subject, captchaResponse: token,
                name: form.fullName.value,
                phone: form.phone.value,
                email: form.email.value,
                emailPreferred: form.emailPreferred.checked,
                phonePreferred: form.phonePreferred.checked,
                textPreferred: form.textPreferred.checked,
                question: form.question.value,
                currentPage: window.location.href,
                communities: Object.keys(PropertiesEmail).filter(value => form[value] && form[value].checked).join(", ")
            };

            if (!currentMessage.emailPreferred && !currentMessage.phonePreferred && !currentMessage.textPreferred) {

                setHasContactError(true);

            } else {
                setContactMessage(currentMessage);
                setIsFirstStep(false);
            }
        }
    }
    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {

        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity()) {
            const contactMessageToSubmit: ContactMessage = ({
                ...contactMessage, additionalInfo: {
                    bedrooms: form.bedrooms ? form.bedrooms.value : null,
                    moveInDate: form.moveInDate ? form.moveInDate.value : null,
                    amenities: form.amenities ? form.amenities.value : null,
                    pets: form.pets ? form.pets.value : null,
                    floorPlan: form.floorPlan ? form.floorPlan.value : null,
                    hearAboutUs: form.hearAboutUs ? form.hearAboutUs.value : null,
                    lowerRent, upperRent
                }
            });

            setSubmitted(true);
            setIsSubmitting(true);
            trackContactSubmitted(propertyId);
            sendContactMail(contactMessageToSubmit)
                .then(() => {
                    setSubmissionComplete(true);
                })
                .catch((e: any) => {
                    if (e.response && e.response.data) {
                        setSubmissionErrorMessage(e.response.data.message);
                    }
                    setSubmissionError(true);
                })
                .finally(() => {
                    if (conversionTrackingId1)
                        sendToConversionTracking(conversionTrackingId1);

                    if (conversionTrackingId2)
                        sendToConversionTracking(conversionTrackingId2);
                    setIsSubmitting(false);
                });
        }
    }
    useEffect(() => {
        if (!executeRecaptcha) {
            return;
        }
        executeRecaptcha().then(result => {
            setToken(result);
        });

    }, [executeRecaptcha]);
    return (
        <section className="section-contact">

            <div className="container">
                <div className="left">
                    <h2 className="heading"><span className="emphasized">Contact Us</span></h2>

                    {contactNumber ?
                        <p className="information">Text or call us at <a
                            href={"tel:" + contactNumber}>{formatPhoneNumber(contactNumber)}</a>
                        </p>
                        : ""}
                    <p className="information">Please fill the contact form to get in touch with a member
                        of our professional leasing team. We can't wait to meet you!</p>
                    <br/>
                    <div className="step-div">
                        <div className={isFirstStep ? "active" : "inactive"}>
                            <Badge variant="primary">1.</Badge>
                            <p><i>Step 1 of 2</i></p>
                            <p><b>*Required Fields</b></p>
                        </div>
                        <div className={isFirstStep ? "inactive" : "active"}>
                            <Badge variant="primary">2.</Badge>
                            <p><i>Step 2 of 2</i></p>
                            <p><b>Optional Fields</b></p>
                            <p className="information">Additional info that helps us learn about your needs and assists
                                us
                                in finding you the perfect home.</p>
                        </div>
                    </div>

                </div>
                <div className="right">
                    {isFirstStep ?
                        <form onSubmit={nextButtonHandler}>
                            <div className="form-item">
                                <div className="item-left">
                                    <p><i>Step 1 of 2</i></p>
                                </div>
                                <div className="item-right">
                                    <p><b> *Required Fields</b></p>
                                </div>
                            </div>
                            <div className="form-item">
                                <div className="item-left">
                                    <label htmlFor="fullName">Name*</label>
                                </div>
                                <div className="item-right">
                                    <Input name="fullName" icon="user" required/>
                                </div>
                            </div>
                            <div className="form-item">
                                <div className="item-left">
                                    <label htmlFor="email">Email*</label>
                                </div>
                                <div className="item-right">
                                    <Input name="email" icon="mail" type="email" required/>
                                </div>
                            </div>
                            <div className="form-item">
                                <div className="item-left">
                                    <label htmlFor="phone">Phone*</label>
                                </div>
                                <div className="item-right">
                                    <Input name="phone" icon="phone" type="number" required/>
                                </div>
                            </div>
                            <div className="form-item">
                                <div className="item-left">
                                    <p className={hasContactError ? "error" : ""}>Preferred Contact*</p>
                                </div>
                                <div className="item-right">
                                    <div className="items-inline error">
                                        <Checkbox label="phone call" name="phonePreferred"/>
                                        <Checkbox label="text" name="textPreferred"/>
                                        <Checkbox label="email" name="emailPreferred" checked={true}/>
                                    </div>
                                    {hasContactError ? <div className="error">
                                        <Icon name="alert">Please check one of the boxes</Icon>
                                    </div> : <></>}
                                </div>
                            </div>
                            <div className="form-item">
                                <div className="item-left">
                                    <label htmlFor="question">Question*</label>
                                </div>
                                <div className="item-right">
                                    <Textarea
                                        name="question"
                                        required={true}
                                    />
                                </div>
                            </div>


                            <div className="submit-button--div first--step">
                                <Button variant="primary" size="large" type="submit">
                                    NEXT &gt; <i>step 2 of 2</i>
                                </Button>

                            </div>
                        </form> :
                        <form onSubmit={submitHandler}>
                            <div className="form-item">
                                <div className="item-left">
                                    <p><i>Step 2 of 2</i></p>
                                </div>
                                <div className="item-right">
                                    <p><b> Optional Fields</b></p>
                                </div>
                            </div>

                            <div className="form-item">
                                <div className="with-sub">
                                    <div className="sub-item item--small">
                                        <label htmlFor="bedrooms"># Bedrooms</label>
                                        <Input name="bedrooms" type="number"/>
                                    </div>
                                    <div className="sub-item item--medium">
                                        <label htmlFor="moveInDate">Move-In Date</label>
                                        <Input name="moveInDate" type="date"
                                               placeholder="format: mm/dd/yyyy"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-element">
                                <label>Desired Price Range</label>
                                <RangeSlider min={MIN_RENT} max={MAX_RENT}
                                             minValue={lowerRent} maxValue={upperRent} setMinValue={setLowerRent}
                                             setMaxValue={setUpperRent}
                                >
                                    <i>click and drag to adjust price range</i>
                                </RangeSlider>
                            </div>


                            <div className="form-item long">
                                <Input
                                    label="Which amenities and features are most important to you in your next home?"
                                    name="amenities" icon="type"/>
                            </div>
                            <div className="form-item long">
                                <Input label="Please list any pets that will be living with you" name="pets"
                                       icon="type"/>
                            </div>
                            <div className="form-item long">
                                <Input label="Is there a particular floor plan style that you are
                                    most interested in? (Please list all that apply)" name="floorPlan"
                                       icon="type"/>
                            </div>
                            <div className="form-item long">
                                <Input label="How did you hear about us?" name="hearAboutUs"
                                       icon="type"/>
                            </div>
                            <div>
                                <p>Which community are you interested in? (<i>check all that apply</i>)</p>
                                <div className="checkboxes">
                                    {Object.keys(PropertiesEmail).map(value =>
                                        <Checkbox label={value} name={value} key={value}/>
                                    )}
                                </div>
                            </div>
                            <div className="form-element">
                                {submissionComplete ?
                                    <p className="text-success message">Message Sent!</p> : ""}
                                {submissionError ?
                                    <p className="text-danger message">{submissionErrorMessage}</p> : ""}
                            </div>

                            <div className="submit-button--div button-right">
                                {isSubmitting ? <Spinner size="tiny"/> : ""}
                                <Button variant="primary" size="large" type="submit" disabled={submitted}>
                                    SUBMIT &gt;
                                </Button>

                            </div>
                        </form>
                    }
                </div>
            </div>
        </section>
    )
};

export const ContactSection: React.FC<ContactSectionProps> = (
    {
        propertyId,
        subject,
        to,
        contactNumber,
        conversionTrackingId1, conversionTrackingId2
    }) => {

    return (
        <GoogleReCaptchaProvider
            reCaptchaKey="6LfHwKIpAAAAAFdFDbvQiBrBn6DJv9q-cIN9GO7S">
            <Contact contactNumber={contactNumber} to={to} conversionTrackingId1={conversionTrackingId1}
                     conversionTrackingId2={conversionTrackingId2} subject={subject} propertyId={propertyId}/>
        </GoogleReCaptchaProvider>

    );
};


export interface ContactSectionProps {
    propertyId: AllPropertyId
    subject?: string;
    to?: string;
    variant?: "long";
    contactNumber?: string;
    conversionTrackingId1?: string
    conversionTrackingId2?: string
}

export type AllPropertyId = PropertyId | "renaissance-rentals" | "apartments-in-bloomington" | "bloomington-apartments";
