import React from 'react';
import {Icon, Modal} from "@contentmunch/muncher-ui";
import "./assets/ApplicationModal.scss";
import {ApplicationSection, ApplicationSectionProps} from "./ApplicationSection";

export const ApplicationModal: React.FC<ApplicationModalProps> = (
    {
        showApplicationModal, applicationModalCloseHandler, propertyName, propertyEmail, contactClickHandler
    }) => {

    return (
        <div className="div-contact--modal">
            <Modal show={showApplicationModal} setShow={applicationModalCloseHandler}>
                <div className="close" onClick={applicationModalCloseHandler}>
                    <Icon name="close" size="medium"/>
                </div>
                <ApplicationSection contactClickHandler={contactClickHandler} propertyEmail={propertyEmail}
                                    propertyName={propertyName}/>
            </Modal>
        </div>
    )
};

export interface ApplicationModalProps extends ApplicationSectionProps {
    showApplicationModal: boolean;
    applicationModalCloseHandler: () => void;
}
