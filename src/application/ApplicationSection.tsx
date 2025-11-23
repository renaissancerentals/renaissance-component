import React, {useState} from "react";
import {Button, Input, Select, Spinner, Textarea} from "@contentmunch/muncher-ui";
import "./assets/ApplicationSection.scss";
import {sendRentalApplicationRequest} from "./service/ApplicationService";
import {RentalApplication} from "./data/RentalApplication";
import {PropertiesEmail} from "../property/data/Property";
import {SubmissionRequestBanner} from "../banner/SubmissionRequestBanner";

export const ApplicationSection: React.FC<ApplicationSectionProps> = ({
                                                                          contactClickHandler,
                                                                          propertyName,
                                                                          propertyEmail
                                                                      }) => {


    const [submissionState, setSubmissionState] = useState<SubmissionState>("init");
    const [errorMessage, setErrorMessage] = useState("");
    const [rentalApplication, setRentalApplication] = useState<RentalApplication>({
        subject: "Rental Application Request",
        property: propertyName ? propertyName : "",
    } as RentalApplication);

    const isFormValid = (): boolean => {
        return rentalApplication.property != null
            && rentalApplication.email != null && rentalApplication.name != null
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setSubmissionState("start");
        if (isFormValid()) {
            setSubmissionState("submitting");
            sendRentalApplicationRequest({...rentalApplication, currentPage: window.location.href})
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

    return (
        <section className="section-application">
            <div className="container">
                <div className="application-heading">
                    <h2 className="heading">
                        <span className="emphasized">Rental Application Request Form</span></h2>
                    <p>If you are ready to apply for your next apartment, please fill out the short form below
                        (Applications are always FREE).</p>
                    <p>If you have general inquiries or would like more information about our apartments, please use
                        our <Button
                            variant="transparent" onClick={contactClickHandler}>CONTACT FORM</Button>.</p>
                </div>
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
                    {propertyEmail ? "" :
                        <div className="form-element">
                            <Select name="neighborhood" options={Object.keys(PropertiesEmail)}
                                    label="Community where you would like to apply"
                                    onChange={e => {
                                        setRentalApplication({...rentalApplication, property: e.target.value})
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
                        {submissionState === "complete" ?
                            <p className="text-success message">Rental Application Request Complete!</p> : ""}
                        {submissionState === "submissionError" || submissionState === "formInvalid" ?
                            <p className="text-danger message">{errorMessage}</p> : ""}
                    </div>
                    <div className="form-element form-submit">
                        <Button variant="primary" size="large" type="submit" disabled={submissionState === "complete"}>
                            Submit
                        </Button>
                        {submissionState === "submitting" ? <Spinner size="small"/> : ""}
                    </div>
                </form>
            </div>
            <SubmissionRequestBanner/>
        </section>
    );
}

export interface ApplicationSectionProps {
    propertyName?: string;
    propertyEmail?: string;
    contactClickHandler: () => void;
}

export type SubmissionState = "init" | "start" | "submitting" | "complete" | "submissionError" | "formInvalid";
