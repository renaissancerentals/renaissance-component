import React from 'react';
import {Icon, Modal} from "@contentmunch/contentmunch-ui";
import "./assets/ApplicationModal.css";
import {ApplicationSection, ApplicationSectionProps} from "./ApplicationSection";

export const ApplicationModal: React.FC<ApplicationModalProps> = (
    {
        showApplicationModal, applicationModalCloseHandler, propertyId, community, contactClickHandler
    }) => {

    return (
        <div className="div-contact--modal">
            <Modal show={showApplicationModal} setShow={applicationModalCloseHandler}>
                <div className="close" onClick={applicationModalCloseHandler}>
                    <Icon name="close" size="medium"/>
                </div>
                <ApplicationSection contactClickHandler={contactClickHandler}
                                    propertyId={propertyId}
                                    community={community}/>
            </Modal>
        </div>
    )
};

export interface ApplicationModalProps extends ApplicationSectionProps {
    showApplicationModal: boolean;
    applicationModalCloseHandler: () => void;
}
