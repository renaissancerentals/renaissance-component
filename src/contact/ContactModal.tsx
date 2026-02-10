import React from 'react';
import {Icon, Modal} from "@contentmunch/muncher-ui";
import "./assets/ContactModal.scss";
import {ContactSection, ContactSectionProps} from "./ContactSection";

export const ContactModal: React.FC<ContactModalProps> = (
    {
        showContactModal, contactModalCloseHandler, propertyId,
        variant, conversionTrackingId2, conversionTrackingId1, contactNumber,
    }) => {

    return (
        <div className="div-contact--modal">
            <Modal show={showContactModal} setShow={contactModalCloseHandler}>
                <div className="close" onClick={contactModalCloseHandler}>
                    <Icon name="close" size="medium"/>
                </div>
                <ContactSection variant={variant}
                                conversionTrackingId1={conversionTrackingId1}
                                conversionTrackingId2={conversionTrackingId2}
                                contactNumber={contactNumber} propertyId={propertyId}
                />
            </Modal>
        </div>
    )
};

export interface ContactModalProps extends ContactSectionProps {
    showContactModal: boolean;
    contactModalCloseHandler: () => void;
}
