import React, {useEffect, useState} from "react";
import {Button, Input, Select, Spinner, Textarea} from "@contentmunch/muncher-ui";
import "./assets/ApplicationSection.scss";
import {sendRentalApplicationRequest} from "./service/ApplicationService";
import {defaultRentalApplication, RentalApplication} from "./data/RentalApplication";
import {PropertyNameIds} from "../property/data/Property";
import {SubmissionRequestBanner} from "../banner/SubmissionRequestBanner";
import {ContactPropertyIds} from "../contact/ContactSection";
import {StepContainer} from "@contentmunch/muncher-ui/lib/step/StepContainer";
import {Step} from "@contentmunch/muncher-ui/lib/step/Step";
import {StepLine} from "@contentmunch/muncher-ui/lib/step/StepLine";
import {LargeRoundedBadge} from "@contentmunch/muncher-ui/lib/badge/LargeRoundedBadge";
import {ApplicationCompletion} from "./ApplicationCompletion";

export const ApplicationSection: React.FC<ApplicationSectionProps> = ({
                                                                          contactClickHandler,
                                                                          propertyId,
                                                                          community
                                                                      }) => {


    const [submissionState, setSubmissionState] = useState<SubmissionState>("complete");
    const [errorMessage, setErrorMessage] = useState("");
    const [rentalApplication, setRentalApplication] = useState<RentalApplication>(community ? {
        ...defaultRentalApplication,
        community: community
    } : defaultRentalApplication);

    const isFormValid = (): boolean => {
        return rentalApplication.property != null
            && rentalApplication.email != null && rentalApplication.name != null
    }
    const resolvePropertyId = (): string => {
        const isUmbrellaSiteId = () =>
            propertyId === "renaissance-rentals" ||
            propertyId === "apartments-in-bloomington" ||
            propertyId === "bloomington-apartments"
        if (!isUmbrellaSiteId()) {
            return propertyId;
        }

        return PropertyNameIds[rentalApplication.community] || propertyId;

    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setSubmissionState("start");
        if (isFormValid()) {
            setSubmissionState("submitting");
            sendRentalApplicationRequest({
                ...rentalApplication,
                property: resolvePropertyId(),
                currentPage: window.location.href
            })
                .then((response) => {
                    setSubmissionState("complete");
                }).catch((e) => {
                if (e.response && e.response.data) {
                    setErrorMessage(e.response.data.message);
                } else {
                    setErrorMessage("Rental Application Request Failed!");

                }
                setSubmissionState("submissionError");
            });
        } else {
            setSubmissionState("formInvalid");

            setErrorMessage("Fill all the required fields");
        }
    }
    const isEmpty = (field: string | null | undefined) => {
        return field === undefined || field === null || field === "";
    }

    useEffect(() => {
        setSubmissionState("init");
    }, []);
    return (
        submissionState === "complete" ? <ApplicationCompletion/> :
            <section className="section-application">
                <div className="application-heading">
                    <h2 className="heading">
                        <span className="emphasized">Request An Application</span>
                    </h2>
                    <div className="banner">
                        <h3>***Please Note***</h3>
                        <p className="emphasized">The form below is NOT a Contact Form for general inquiries.</p>
                        <p>Please
                            use our Contact Form for general questions.</p>
                        <div>
                            <Button
                                variant="primary" size="large" onClick={contactClickHandler}>CONTACT FORM</Button>
                        </div>
                    </div>
                    <div className="container">
                        <p className="info">Please follow the steps below to start the application process.</p>
                        <StepContainer>
                            <Step active={true} label="You are here">1</Step>
                            <StepLine/>
                            <Step>2</Step>
                            <StepLine/>
                            <Step>3</Step>
                        </StepContainer>
                        <div className="step-banner">
                            <LargeRoundedBadge>
                                <div className="badge-content"><p>Step</p><p className="emphasized">1</p></div>
                            </LargeRoundedBadge>
                        </div>
                        <p className="emphasized-info">Kindly, fill out the request form</p>
                    </div>
                </div>
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-element">
                            <Input label="Name" name="fullName" icon="user"
                                   onChange={e => {
                                       setRentalApplication({...rentalApplication, name: e.target.value})
                                   }}
                                   error={
                                       submissionState === "formInvalid" && isEmpty(rentalApplication.name) ?
                                           "Please provide Name" : ""
                                   }
                                   required/>
                        </div>
                        <div className="hp-form-item">
                            <label htmlFor="preferredName">Preferred Name</label>
                            <input
                                type="text"
                                id="preferredName"
                                name="preferredName"
                                autoComplete="off"
                                tabIndex={-1}
                            />
                        </div>
                        <div className="form-element">
                            <Input label="Email" name="email" icon="mail" type="email"
                                   onChange={e => {
                                       setRentalApplication({...rentalApplication, email: e.target.value})
                                   }}
                                   error={
                                       submissionState === "formInvalid" && isEmpty(rentalApplication.name) ?
                                           "Please provide Email" : ""
                                   }
                                   required/>
                        </div>

                        <div className="form-element">
                            <Input label="Phone" name="phone" type="number" icon="phone"
                                   onChange={e => {
                                       setRentalApplication({...rentalApplication, phone: e.target.value})
                                   }}
                            />
                        </div>
                        {community ? "" :
                            <div className="form-element">
                                <Select name="neighborhood" options={Object.keys(PropertyNameIds)}
                                        label="Community where you would like to apply"
                                        onChange={e => {
                                            setRentalApplication({...rentalApplication, community: e.target.value})
                                        }}
                                        error={
                                            submissionState === "formInvalid" && isEmpty(rentalApplication.property) ?
                                                "Please select Neighborhood" : ""
                                        }
                                        required/>

                            </div>}

                        <div className="form-element">
                            <Input label="Address or Floor plan you are applying for" name="address" icon="map"
                                   onChange={e => {
                                       setRentalApplication({...rentalApplication, address: e.target.value})
                                   }}/>
                        </div>
                        <div className="form-element">
                            <Textarea
                                label="Additional Information or Questions"
                                name="question"
                                onChange={e => {
                                    setRentalApplication({...rentalApplication, questions: e.target.value})
                                }}
                            />
                        </div>

                        <div className="form-element">
                            {submissionState === "submissionError" || submissionState === "formInvalid" ?
                                <p className="text-danger message">{errorMessage}</p> : ""}
                        </div>
                        <div className="form-element form-submit">
                            <Button variant="primary" size="large" type="submit">
                                Request Application
                            </Button>
                            {submissionState === "submitting" ? <Spinner size="small"/> : ""}
                        </div>
                    </form>
                </div>
                <SubmissionRequestBanner/>
                <div className="step-banner">
                    <LargeRoundedBadge variant="secondary">
                        <div className="badge-content"><p>Step</p><p className="emphasized">2</p></div>
                    </LargeRoundedBadge>
                </div>

                <p className="emphasized-info">Receive a link</p>
                <p className="info">You'll receive a secure link within the next business day to complete your
                    application.</p>
                <p className="info">We'll contact you if additional information is needed.</p>


                <div className="step-banner">
                    <LargeRoundedBadge variant="primary">
                        <div className="badge-content"><p>Step</p><p className="emphasized">3</p></div>
                    </LargeRoundedBadge>
                </div>
                <p className="emphasized-info">Submit</p>
                <p className="info">Submit your official application for our team to review.</p>
            </section>
    );
}

export interface ApplicationSectionProps {
    propertyId: ContactPropertyIds;
    community?: string;
    contactClickHandler: () => void;
}

export type SubmissionState = "init" | "start" | "submitting" | "complete" | "submissionError" | "formInvalid";
