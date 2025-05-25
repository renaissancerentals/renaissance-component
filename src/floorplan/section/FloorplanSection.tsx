import React, {useEffect, useRef, useState} from "react";
import {
    Floorplan,
    FloorplanVariation,
    SimilarFloorplan,
    Testimonial,
    UtilityName,
    UtilityType,
    WebSpecial
} from "../data/Floorplan";
import {
    floorplanAddress,
    getFloorplan,
    getFloorplanVariations,
    getSimilarFloorplans,
    getTestimonials,
    getWebSpecials,
    MONTH_YEAR_FORMAT,
    notPermittedPets,
    permittedPets,
    petPolicy
} from "../service/FloorplanService";
import "./assets/FloorplanSection.scss";
import {GridGallerySkeleton} from "../../gallery/GridGallerySkeleton";
import {FloorplanHero} from "./FloorplanHero";
import {
    capitalizeFirstLetter,
    dateToMoment,
    enumToString,
    floorplanAddressToGoogleMap,
    formatPhoneNumber,
    rangeFrom,
    toUSD
} from "../../utils/Utils";
import {Card} from "../../card/Card";
import {TestimonialsCard} from "../card/TestimonialsCard";
import {MapSection} from "../../map/MapSection";
import {SimilarFloorplanCard} from "../card/SimilarFloorplanCard";
import {Button, Li, Ul} from "@contentmunch/muncher-ui";
import moment from "moment";
import {LeaseType} from "../../property/data/Property";
import {ShortTermFloorplanSection} from "../../short-term/ShortTermFloorplanSection";

export const FloorplanSection: React.FC<FloorplanSectionProps> = (
    {
        contactClickHandler,
        applyClickHandler,
        floorplanId,
        locationRef,
        handleRefToLocation,
        handleHtmlTitleUpdate
    }) => {
    const [floorplan, setFloorplan] = useState<Floorplan>({} as Floorplan);
    const [similarFloorplans, setSimilarFloorplans] = useState<SimilarFloorplan[]>([]);
    const [floorplanVariations, setFloorplanVariations] = useState<FloorplanVariation[]>([]);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [webSpecials, setWebSpecials] = useState<WebSpecial[]>([]);

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
        getFloorplan(floorplanId).then(floorplanData => {
            setFloorplan(floorplanData);

            if (handleHtmlTitleUpdate) {
                handleHtmlTitleUpdate(floorplanData.htmlTitle);
            }

            floorplanData.units = floorplanData.units.filter(unit => unit.active);
            if (LeaseType.SHORT_TERM === floorplanData.property.leaseType) {
                setIsLoading(false);
            } else {
                Promise.all([
                    getFloorplanVariations(floorplanId),
                    getSimilarFloorplans(floorplanId),
                    getTestimonials(floorplanId),
                    getWebSpecials(floorplanId)
                ])
                    .then((data) => {
                        const today = moment();
                        setFloorplanVariations(data[0]);
                        setSimilarFloorplans(data[1]);
                        setTestimonials(data[2]);
                        const validWebSpecials: WebSpecial[] = [];
                        data[3].forEach(webSpecial => {
                            if (dateToMoment(webSpecial.startDate).isBefore(today) &&
                                dateToMoment(webSpecial.endDate).isAfter(today)
                            ) {
                                validWebSpecials.push(webSpecial);
                            }
                        });
                        setWebSpecials(validWebSpecials);
                    })
                    .catch(() => {
                        setErrorLoading(true);
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            }
        }).catch(() => {
            setErrorLoading(true);
            setIsLoading(false);
        });

    }, [floorplanId]);

    const availableDates = (): string[] => {
        const sortAvailableDates = (a: string, b: string) => moment(a, MONTH_YEAR_FORMAT).diff(moment(b, MONTH_YEAR_FORMAT));
        const dates = new Set<string>();
        const today = moment();

        const tomorrow = today.add(1, "day");
        const isAvailableNow = (moveInDate: moment.Moment) => moveInDate.isBefore(tomorrow);

        floorplan.units.forEach(unit => {
            const moveInDate = dateToMoment(unit.moveInDate);
            if (isAvailableNow(moveInDate)) {
                dates.add(today.format(MONTH_YEAR_FORMAT));
                if (unit.availabilityExtensionMonths && unit.availabilityExtensionMonths > 0) {
                    for (let i = 1; i <= unit.availabilityExtensionMonths; i++) {
                        let extensionDate = moment().add(i, 'month');
                        dates.add(extensionDate.format(MONTH_YEAR_FORMAT));
                    }
                }
            } else {
                dates.add(moveInDate.format(MONTH_YEAR_FORMAT));
                if (unit.availabilityExtensionMonths && unit.availabilityExtensionMonths > 0) {
                    for (let i = 1; i <= unit.availabilityExtensionMonths; i++) {
                        let extensionDate = dateToMoment(unit.moveInDate).add(i, 'month');
                        dates.add(extensionDate.format(MONTH_YEAR_FORMAT));
                    }
                }
            }

        });

        return Array.from(dates).sort(sortAvailableDates);
    }

    const residentUtilityDetails = (utility: UtilityName) =>
        utility.averageMonthlyBill ?
            capitalizeFirstLetter(utility.name) + " - Avg/Mo " + toUSD(utility.averageMonthlyBill)
            : capitalizeFirstLetter(utility.name);

    const isAverageMonthlyBillPresent = () => floorplan.utilities.filter(utility => utility.type === UtilityType.RESIDENT_UTILITY).some(utility => utility.averageMonthlyBill != null);


    const isWithinTwelveMonths = (date: string) => {
        const current = moment(date, "MMM YYYY");
        const twelveMonthsFromNow = moment().add(1, "year");
        return current.isBefore(twelveMonthsFromNow);
    }

    return (
        LeaseType.SHORT_TERM === floorplan.property?.leaseType ?
            <ShortTermFloorplanSection contactClickHandler={contactClickHandler} applyClickHandler={applyClickHandler}
                                       floorplanId={floorplanId}/> :
            <section className="section-floorplan">
                {
                    isLoading ? <section className="section-floorplan--hero"><GridGallerySkeleton/></section> : <>
                        {errorLoading ?
                            <section className="div-full--center">
                                <h2>Uh-oh, this is a 404</h2>
                            </section> :
                            <>
                                <FloorplanHero floorplan={floorplan} contactClickHandler={contactClickHandler}
                                               webSpecials={webSpecials}
                                               applyClickHandler={applyClickHandler} handleRefToMap={handleRefToMap}/>
                                <div className="container">
                                    <div className="floorplan--cards">
                                        <Card title="Details">
                                            <p className="floorplan-card--featured">
                                                {floorplan.bedroom} Bedroom
                                                | {floorplan.bathroom} Bathroom {enumToString(floorplan.style)}
                                            </p>
                                            {floorplan.units.length > 0 ? <>
                                                <p className="floorplan-card--featured">
                                                    {rangeFrom(floorplan.units, "squareFoot")} Square Feet
                                                </p>
                                                <p className="floorplan-card--featured">
                                                    ${rangeFrom(floorplan.units, "rent")}/mo
                                                </p>
                                                <p className="floorplan-card--featured">
                                                    ${rangeFrom(floorplan.units, "deposit")} Security Deposit
                                                </p>
                                            </> : ""}
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
                                                    {
                                                        floorplanVariations.length > 0 ?
                                                            <>
                                                                <h5>Variations</h5>
                                                                <Ul>
                                                                    {
                                                                        floorplanVariations.map((variation, i) =>
                                                                            <Li key={"floorplan-variation-" + i}>
                                                                                {variation.variation}
                                                                            </Li>
                                                                        )
                                                                    }
                                                                </Ul>

                                                            </> : ""}

                                                </Card> : <></>
                                        }

                                        {
                                            testimonials.length > 0 ?
                                                <TestimonialsCard testimonials={testimonials}/> : <></>
                                        }


                                        <Card title="Pets">
                                            <h5>Permitted</h5>
                                            <Ul>
                                                {
                                                    permittedPets(floorplan).map((pet, i) =>
                                                        <Li key={"floorplan-permitted-pet-" + i} bulletIcon="check"
                                                            bulletColor="green">
                                                            {pet}
                                                        </Li>
                                                    )
                                                }
                                            </Ul>
                                            {notPermittedPets(floorplan).length > 0 ?
                                                <><h5>Not Permitted</h5>
                                                    <Ul>
                                                        {
                                                            notPermittedPets(floorplan).map((pet, i) =>
                                                                <Li key={"floorplan-not-permitted-pet-" + i}
                                                                    bulletColor="brown" bulletIcon="close">
                                                                    {pet}
                                                                </Li>
                                                            )
                                                        }
                                                    </Ul>
                                                </> : ""}

                                            {
                                                petPolicy(floorplan) ?
                                                    <>
                                                        <h5>Additional Information</h5>
                                                        <p>{petPolicy(floorplan)}</p>
                                                    </> : ""

                                            }

                                        </Card>
                                        {floorplan.units.length > 0 ? <>
                                            <Card title="Availability">
                                                <Ul>
                                                    {
                                                        availableDates().filter(availableDate => isWithinTwelveMonths(availableDate)).map(availableDate =>
                                                            <Li key={"floorplan-unit-availability-" + availableDate}
                                                                bulletIcon="calendar">
                                                                Available
                                                                in <strong>{capitalizeFirstLetter(availableDate)}</strong>
                                                            </Li>
                                                        )
                                                    }
                                                </Ul>

                                            </Card>

                                            <Card title="Utilities">
                                                <h5>Paid By Landlord</h5>
                                                <Ul>
                                                    {
                                                        floorplan.utilities.filter(utility => utility.type === UtilityType.INCLUDED_UTILITY).map(utility =>
                                                            <Li key={"floorplan-included-utility-" + utility.id}
                                                                bulletIcon="home">
                                                                {capitalizeFirstLetter(utility.name)}
                                                            </Li>
                                                        )
                                                    }
                                                </Ul>
                                                <h5>Paid By Resident</h5>
                                                <Ul>
                                                    {
                                                        floorplan.utilities.filter(utility => utility.type === UtilityType.RESIDENT_UTILITY).map(utility =>
                                                            <Li key={"floorplan-resident-utility-" + utility.id}
                                                                bulletIcon="dollar">
                                                                {residentUtilityDetails(utility)}
                                                            </Li>
                                                        )
                                                    }
                                                </Ul>
                                                {isAverageMonthlyBillPresent() ? <p><i>
                                                    **Average utilities shown above are an estimate. Actual monthly
                                                    utility
                                                    costs can vary significantly based on individual usage, time of
                                                    year,
                                                    the weather, and other factors
                                                </i></p> : ""}

                                            </Card>
                                        </> : ""}
                                        {similarFloorplans.length > 0 ?
                                            <SimilarFloorplanCard similarFloorplans={similarFloorplans}/> : ""}

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
                                    <Card>
                                        <div ref={locationRef ? locationRef : mapRef} id="location"
                                             className="reference">

                                        </div>
                                        <MapSection
                                            src={floorplanAddressToGoogleMap(floorplanAddress(floorplan))}/>
                                    </Card>
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
    handleHtmlTitleUpdate?: (title: string) => void;
}
