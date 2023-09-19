import React from "react";
import {LeasingOfficeType, Property} from "./data/Property";
import "./assets/PropertyLocation.scss";
import {MapSection} from "../map/MapSection";
import {addressToGoogleMap, addressToGoogleMapLink, formatPhoneNumber} from "../utils/Utils";
import {PropertyLocationSkeleton} from "./PropertyLocationSkeleton";
import {LeaseOfficeSkeleton} from "./LeaseOfficeSkeleton";
import {getAssetUrl} from "../asset/service/AssetService";

export const PropertyLocation: React.FC<PropertyLocationProps> = (
    {property, isLoading, handleRefToContact}
) => {
    return (
        <div className="container">
            <section className="section-property-location">
                <div className="property-location">
                    {isLoading ?
                        <PropertyLocationSkeleton/> :
                        <>
                            <div className="property-card">
                                <h3>{property.name}</h3>

                                <div className="property--body">
                                    <p><i>Located at:</i><br/>
                                        <a href={addressToGoogleMapLink(property.address, property.zipcode)}
                                           target="_blank">{property.address + ", " + property.zipcode}</a>
                                    </p>
                                    <p><i><a
                                        href={"tel:" + property.phone}>{formatPhoneNumber(property.phone)}</a></i></p>
                                    <p><i><a
                                        href={"sms:" + property.phone}>Text</a>, <a
                                        href={"tel:" + property.phone}>Call</a>, or <a href="#contact"
                                                                                       onClick={handleRefToContact}>Submit
                                        a Contact Form</a> for more information!</i></p>

                                    {property.busRoutes.length > 0 ?
                                        <p><i>Bus Routes: </i><br/>
                                            {property.busRoutes.map((busRoute, index) =>
                                                <span key={"property-bus-route" + index}>
                                                    <a href={busRoute.busRouteLink}
                                                       target="_blank">{busRoute.busRoute}</a>
                                                    {index < property.busRoutes.length - 1 ? ", " : ""}
                                                </span>
                                            )}
                                        </p>
                                        : ""}
                                    {property.leasingOfficeType === LeasingOfficeType.OFF_SITE ?
                                        <p className="property--aside">
                                            *There is NO ON-SITE Office
                                        </p> : ""
                                    }
                                </div>
                            </div>
                            <MapSection
                                src={addressToGoogleMap(property.address, property.zipcode)}/>
                        </>
                    }
                </div>
                <br/>
                <hr/>
                <div className="lease-office">
                    {isLoading ?
                        <LeaseOfficeSkeleton/> :
                        <>
                            <div className="property-card">
                                <h3>Leasing Office
                                    {property.leasingOfficeType === LeasingOfficeType.OFF_SITE ?
                                        <span className="aside">(Off-site)</span> : ""}</h3>

                                <div className="property--body">
                                    <p><i>Located{property.leasingOfficeType === LeasingOfficeType.OFF_SITE ?
                                        <span> (Off-site) </span> : ""} at:</i><br/>
                                        <a href={addressToGoogleMapLink(property.leasingOffice?.address, property.leasingOffice?.zipcode)}
                                           target="_blank">{property.leasingOffice?.address + ", " + property.leasingOffice?.zipcode}</a>
                                    </p>
                                    <p>{property.leasingOffice?.phone ?
                                        <a href={"tel:" + property.leasingOffice?.phone}>
                                            {formatPhoneNumber(property.leasingOffice?.phone)}
                                        </a> : ""}<br/>
                                        {property.leasingOffice?.officeHours}
                                    </p>
                                    <p className="property--aside">
                                        {property.name} {property.leasingOffice?.direction}
                                    </p>
                                </div>
                            </div>
                            <MapSection
                                src={addressToGoogleMap(property.leasingOffice?.address, property.leasingOffice?.zipcode)}/>
                            <div className="div-office-map-image">
                                {property.leasingOffice?.officeMap ?
                                    <img src={getAssetUrl(property.leasingOffice.officeMap, property.id)}
                                         alt={property.leasingOffice.name}/> : ""}

                            </div>
                            <div className="div-office-image-card">
                                <div className="div-office-image">
                                    {property.leasingOffice?.officeImage ?
                                        <img src={getAssetUrl(property.leasingOffice.officeImage, property.id)}
                                             alt={property.leasingOffice.name}/> : ""}
                                </div>
                                <p>
                                    {property.leasingOffice?.officeImageDescription}
                                </p>
                            </div>
                        </>
                    }
                </div>
            </section>

        </div>
    );
};

export interface PropertyLocationProps {
    property: Property;
    isLoading: boolean;
    handleRefToContact: () => void;
}