import React, {useState} from 'react';
import {Button, Icon, Input, Modal, Spinner, Textarea} from "@contentmunch/muncher-ui";
import "./assets/SubletMessageModal.scss";
import {Sublet} from "./data/Sublet";
import {SubletMessage} from "./data/SubletMessage";
import {sendMessage} from "./services/SubletService";

export const SubletMessageModal: React.FC<SubletMessageModalProps> = ({sublet, showModal, modalCloseHandler}) => {
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionError, setSubmissionError] = useState(false);
    const [submissionErrorMessage, setSubmissionErrorMessage] = useState("Message Failed!");
    const [submissionComplete, setSubmissionComplete] = useState(false);

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
            const form = event.currentTarget;
            event.preventDefault();
            event.stopPropagation();

            if (form.checkValidity()) {
                setSubmitted(true);

                setIsSubmitting(true);
                const subletMessage: SubletMessage = {
                    name: form.fullName.value,
                    email: form.email.value,
                    message: form.message.value
                };
                sendMessage(sublet.assetKey, subletMessage).then(() => {
                    setSubmissionComplete(true);
                }).catch((e: any) => {
                    if (e.response && e.response.data) {
                        setSubmissionErrorMessage(e.response.data.message);
                    }
                    setSubmissionError(true);
                }).finally(() => {
                    setIsSubmitting(false);
                });
            }
        }
    ;
    return (
        <div className="div-message--modal">
            <Modal show={showModal} setShow={modalCloseHandler}>
                <div className="close" onClick={modalCloseHandler}>
                    <Icon name="close" size="medium"/>
                </div>
                <section className="section-message">
                    <div className="container">
                        <h2 className="heading">Contact for</h2>
                        <h2 className="heading"><span className="emphasized">"{sublet.title}"</span></h2>
                        <form onSubmit={submitHandler}>
                            <div className="form-element form-element--long">
                                <Input label="Name" name="fullName" icon="user" required/>
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
                            <div className="form-element form-element--long">
                                <Input label="Email" name="email" icon="mail" type="email" required/>
                            </div>

                            <div className="form-element form-element--long">
                                <Textarea
                                    label="Message"
                                    name="message"
                                    required={true}
                                />
                            </div>

                            <div className="form-element">
                                {submissionComplete ?
                                    <p className="text-success message">Message Sent!</p> : ""}
                                {submissionError ?
                                    <p className="text-danger message">{submissionErrorMessage}</p> : ""}
                            </div>

                            <div className="form-element form-submit">
                                <Button variant="primary" size="large" type="submit" disabled={submitted}>
                                    Submit
                                </Button>
                                {isSubmitting ? <Spinner size="small"/> : ""}
                            </div>

                        </form>
                    </div>

                </section>
            </Modal>
        </div>
    )
};

export interface SubletMessageModalProps {
    sublet: Sublet;
    showModal: boolean;
    modalCloseHandler: () => void;
}
