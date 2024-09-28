import React, {useEffect, useRef, useState} from "react";
import "./assets/ShortTermFloorplanSection.scss";
import {Button, Li, Ul} from "@contentmunch/muncher-ui";
import {FloorplanShortTerm} from "./data/ShortTerm";
import {getShortTermFloorplan} from "./service/ShortTermService";
import {GalleryHeroSkeleton} from "../gallery/GalleryHeroSkeleton";
import {ShortTermFloorplanHero} from "./ShortTermFloorplanHero";
import {Card} from "../card/Card";
import {enumToString, floorplanAddressToGoogleMap, formatPhoneNumber, toUSD} from "../utils/Utils";
import {MapSection} from "../map/MapSection";
import {renaissance} from "../data/RenaissanceData";

export const ShortTermFloorplanSection: React.FC<FloorplanSectionProps> = (
    {
        contactClickHandler,
        applyClickHandler,
        floorplanId,
        locationRef,
        handleRefToLocation
    }) => {
    const [floorplan, setFloorplan] = useState<FloorplanShortTerm>({} as FloorplanShortTerm);
    const [isLoading, setIsLoading] = useState(true);
    const [errorLoading, setErrorLoading] = useState(false);

    const mapRef: React.Ref<HTMLDivElement> = useRef<HTMLDivElement>(null);
    const handleRefToMap = () => {
        if (handleRefToLocation)
            handleRefToLocation();
        else {
            mapRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

    };
    useEffect(() => {
        getShortTermFloorplan(floorplanId)
            .then((data) => {
                setFloorplan(data)
            })
            .catch(() => {
                setErrorLoading(true);
            })
            .finally(() => {
                setIsLoading(false);
            });

    }, [floorplanId]);
    const generatePricing = (price: number, includeMonthly?: boolean) => price
        ? `${toUSD(price)}/day${includeMonthly ? `/ ${toUSD(price * 30)}/mo` : " + tax"}`
        : "-";

    return (
        <section className="section-short-term-floorplan">
            {
                isLoading ? <section className="section-floorplan--hero"><GalleryHeroSkeleton/></section> : <>
                    {errorLoading ?
                        <section className="div-full--center">
                            <h2>Uh-oh, this is a 404</h2>
                        </section> :
                        <>
                            <ShortTermFloorplanHero floorplan={floorplan} contactClickHandler={contactClickHandler}
                                                    webSpecials={[]}
                                                    applyClickHandler={applyClickHandler}
                                                    handleRefToMap={handleRefToMap}/>
                            <div className="container">
                                <div className="floorplan--cards">
                                    <Card title="Details">
                                        <p className="floorplan-card--featured">
                                            {floorplan.bedroom} Bedroom
                                            | {floorplan.bathroom} Bathroom {enumToString(floorplan.style)}
                                        </p>
                                        <p className="floorplan-card--featured">
                                            {floorplan.shortTerm.squareFoot} Square Feet
                                        </p>


                                        <div className="row-content">
                                            <h4 className="row-title">Pricing:</h4>
                                            <p className="floorplan-card--featured">
                                                <span className="key">5-13 days:</span>
                                                <span className="value">
                                                    {generatePricing(floorplan.shortTerm.priceFor5To13Days)}
                                                </span>
                                            </p>
                                            <p className="floorplan-card--featured">
                                                <span className="key">14-29 days:</span>
                                                <span className="value">
                                                    {generatePricing(floorplan.shortTerm.priceFor14To29Days)}
                                                </span>
                                            </p>
                                            <p className="floorplan-card--featured">
                                                <span className="key">1-4 months:</span>
                                                <span className="value">
                                                    {generatePricing(floorplan.shortTerm.priceFor1To4Months, true)}
                                                </span>
                                            </p>
                                            <p className="floorplan-card--featured">
                                                <span className="key">4+ months:</span>
                                                <span className="value">
                                                    {generatePricing(floorplan.shortTerm.priceFor4andMoreMonths, true)}
                                                </span>
                                            </p>
                                        </div>

                                        <p>
                                            {floorplan.description}
                                        </p>
                                    </Card>


                                    {
                                        floorplan.amenities.length > 0 ?
                                            <Card title="Amenities">
                                                <Ul>
                                                    {
                                                        floorplan.amenities.filter(amenity => amenity.featured).map(amenity =>
                                                            <Li key={"floorplan-amenity-" + amenity.id}
                                                                bulletIcon="star"
                                                                isFeatured={true}>
                                                                {amenity.name}

                                                            </Li>
                                                        )}
                                                    {
                                                        floorplan.amenities.filter(amenity => !amenity.featured).map(amenity =>
                                                            <Li key={"floorplan-amenity-" + amenity.id}
                                                                bulletIcon="dot">
                                                                {amenity.name}

                                                            </Li>
                                                        )
                                                    }
                                                </Ul>

                                            </Card> : <></>
                                    }


                                    {isLoading ? "" :
                                        <Card>
                                            <div ref={locationRef ? locationRef : mapRef} id="location"
                                                 className="reference">

                                            </div>
                                            <MapSection
                                                src={floorplanAddressToGoogleMap({
                                                    city: renaissance.city,
                                                    state: renaissance.state,
                                                    address: floorplan.address,
                                                    zipcode: floorplan.zipcode
                                                })}/>
                                        </Card>
                                    }


                                    <div className="contact-card">
                                        <Card featured={true}>
                                            <p><i>Questions?</i></p>
                                            <p><i>Call or text us anytime:</i></p>
                                            {floorplan.property?.phone ?
                                                <p><a
                                                    href={"tel:" + floorplan.property.phone}>{formatPhoneNumber(floorplan.property.phone)}</a>
                                                </p>
                                                : ""}
                                            <Button variant="tertiary" onClick={contactClickHandler} size="large">Contact
                                                Us
                                                »</Button>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </>
                    }

                </>
            }

        </section>
    );
};

export interface FloorplanSectionProps {
    contactClickHandler: () => void;
    applyClickHandler: () => void;
    floorplanId: string;
    locationRef?: React.Ref<HTMLDivElement>;
    handleRefToLocation?: () => void;
}
