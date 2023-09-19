import React, {useState} from "react";
import "./assets/SubletCard.scss";
import {Sublet} from "./data/Sublet";
import {Button, Icon, Paper} from "@contentmunch/muncher-ui";
import {SubletImage} from "./SubletImage";
import {SubletMessageModal} from "./SubletMessageModal";
import {addressToGoogleMapLink, decode, formatDate, toUSD} from "../utils/Utils";

export const SubletCard: React.FC<SubletCardProps> = ({sublet}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <section className="section-card-sublet">
            <Paper showHoverEffect={true}>
                <SubletMessageModal sublet={sublet} showModal={showModal}
                                    modalCloseHandler={() => setShowModal(false)}/>
                <SubletImage sublet={sublet}/>
                <div className="sublet-card--content">
                    <h3 className="sublet-title">{sublet.title}</h3>

                    <p className="sublet-metadata">
                        <Icon name="map"><a
                            href={addressToGoogleMapLink(sublet.address, sublet.zipcode)}>{sublet.address + " " + sublet.zipcode}</a></Icon>
                    </p>
                    <p className="sublet-metadata">
                        <Icon
                            name="bed">{sublet.availableBedrooms} of {sublet.bedroom} bed(s) {toUSD(+sublet.rent)}/month </Icon>
                    </p>

                    <p className="sublet-metadata">
                        Available from {formatDate(sublet.availableFrom)} to {formatDate(sublet.availableTo)}
                    </p>

                    <p className="sublet-metadata">
                        <Button variant="secondary" size="small" onClick={() => {
                            setShowModal(true)
                        }}><Icon name="mail"> Contact</Icon></Button> &nbsp;&nbsp;
                        <Icon name={sublet.petsAllowed ? "thumbs-up" : "thumbs-down"}>(Pets)</Icon> &nbsp;
                        <Icon name={sublet.utilitiesIncluded ? "thumbs-up" : "thumbs-down"}>(Utilities included)</Icon>
                    </p>
                    <p className="sublet-description">{decode(sublet.description)}</p>

                </div>
            </Paper>
        </section>
    );
}

export interface SubletCardProps {
    sublet: Sublet;
}