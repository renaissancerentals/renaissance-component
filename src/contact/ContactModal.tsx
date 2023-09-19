import React from 'react';
import {Icon, Modal} from "@contentmunch/muncher-ui";
import "./assets/ContactModal.scss";
import {ContactSection, ContactSectionProps} from "./ContactSection";

export const ContactModal: React.FC<ContactModalProps> = (
    {
        showContactModal, contactModalCloseHandler, to, subject,
        variant, conversionTrackingId2, conversionTrackingId1, contactNumber,
    }) => {

    return (
        <div className="div-contact--modal">
            <Modal show={showContactModal} setShow={contactModalCloseHandler}>
                <div className="close" onClick={contactModalCloseHandler}>
                    <Icon name="close" size="medium"/>
                </div>
                <ContactSection subject={subject} variant={variant} to={to}
                                conversionTrackingId1={conversionTrackingId1}
                                conversionTrackingId2={conversionTrackingId2}
                                contactNumber={contactNumber}
                />
            </Modal>
        </div>
    )
};

export interface ContactModalProps extends ContactSectionProps {
    showContactModal: boolean;
    contactModalCloseHandler: () => void;
}
