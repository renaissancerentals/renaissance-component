import React, {useEffect, useRef, useState} from "react";
import {
    FloorplanFaq,
    FloorplanVariation,
    SimilarFloorplan,
    Testimonial,
    UtilityName,
    UtilityType,
    WebSpecial
} from "../../floorplan/data/Floorplan";
import {
    getFloorplanFaqs,
    getFloorplanVariations,
    getSimilarFloorplans,
    getTestimonials,
    getWebSpecials,
    MONTH_YEAR_FORMAT
} from "../../floorplan/service/FloorplanService";
import "./assets/UnitSection.scss";
import {GridGallerySkeleton} from "../../gallery/GridGallerySkeleton";
import {
    capitalizeFirstLetter,
    dateToMoment,
    enumToString,
    floorplanAddressToGoogleMap,
    formatPhoneNumber,
    toUSD
} from "../../utils/Utils";
import {Card} from "../../card/Card";
import {TestimonialsCard} from "../../floorplan/card/TestimonialsCard";
import {MapSection} from "../../map/MapSection";
import {SimilarFloorplanCard} from "../../floorplan/card/SimilarFloorplanCard";
import {Button, Li, Ul} from "@contentmunch/muncher-ui";
import moment from "moment";
import {LeaseType} from "../../property/data/Property";
import {ShortTermFloorplanSection} from "../../short-term/ShortTermFloorplanSection";
import {FaqsCard} from "../../faq/FaqsCard";
import {addressFromUnit, getUnit, notPermittedPets, permittedPets} from "../service/UnitService";
import {UnitFloorplan} from "../data/Unit";
import {UnitHero} from "./UnitHero";

export const UnitSection: React.FC<UnitSectionProps> = (
    {
        contactClickHandler,
        applyClickHandler,
        unitId,
        locationRef,
        handleRefToLocation,
        handleHtmlTitleUpdate
    }) => {
    const [unitFloorplan, setUnitFloorplan] = useState<UnitFloorplan>({} as UnitFloorplan);
    const [similarFloorplans, setSimilarFloorplans] = useState<SimilarFloorplan[]>([]);
    const [floorplanVariations, setFloorplanVariations] = useState<FloorplanVariation[]>([]);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [webSpecials, setWebSpecials] = useState<WebSpecial[]>([]);
    const [floorplanFaqs, setFloorplanFaqs] = useState<FloorplanFaq[]>([]);

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
        getUnit(unitId).then(unitData => {
            setUnitFloorplan(unitData);

            if (handleHtmlTitleUpdate) {
                handleHtmlTitleUpdate(unitData.floorplan.htmlTitle);
            }

            if (LeaseType.SHORT_TERM === unitData.floorplan.property.leaseType) {
                setIsLoading(false);
            } else {
                Promise.all([
                    getFloorplanVariations(unitData.floorplan.id),
                    getSimilarFloorplans(unitData.floorplan.id),
                    getTestimonials(unitData.floorplan.id),
                    getWebSpecials(unitData.floorplan.id),
                    getFloorplanFaqs(unitData.floorplan.id),
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
                        setFloorplanFaqs(data[4].sort((a, b) => a.sortOrder - b.sortOrder));
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

    }, [unitId]);

    const availableDates = (): string[] => {
        const sortAvailableDates = (a: string, b: string) => moment(a, MONTH_YEAR_FORMAT).diff(moment(b, MONTH_YEAR_FORMAT));
        const dates = new Set<string>();
        const today = moment();

        const tomorrow = today.add(1, "day");
        const isAvailableNow = (moveInDate: moment.Moment) => moveInDate.isBefore(tomorrow);


        const moveInDate = dateToMoment(unitFloorplan.moveInDate);
        if (isAvailableNow(moveInDate)) {
            dates.add(today.format(MONTH_YEAR_FORMAT));
            if (unitFloorplan.availabilityExtensionMonths && unitFloorplan.availabilityExtensionMonths > 0) {
                for (let i = 1; i <= unitFloorplan.availabilityExtensionMonths; i++) {
                    let extensionDate = moment().add(i, 'month');
                    dates.add(extensionDate.format(MONTH_YEAR_FORMAT));
                }
            }
        } else {
            dates.add(moveInDate.format(MONTH_YEAR_FORMAT));
            if (unitFloorplan.availabilityExtensionMonths && unitFloorplan.availabilityExtensionMonths > 0) {
                for (let i = 1; i <= unitFloorplan.availabilityExtensionMonths; i++) {
                    let extensionDate = dateToMoment(unitFloorplan.moveInDate).add(i, 'month');
                    dates.add(extensionDate.format(MONTH_YEAR_FORMAT));
                }
            }
        }


        return Array.from(dates).sort(sortAvailableDates);
    }

    const residentUtilityDetails = (utility: UtilityName) =>
        utility.averageMonthlyBill ?
            capitalizeFirstLetter(utility.name) + " - Avg/Mo " + toUSD(utility.averageMonthlyBill)
            : capitalizeFirstLetter(utility.name);

    const isAverageMonthlyBillPresent = () => unitFloorplan.floorplan.utilities.filter(utility => utility.type === UtilityType.RESIDENT_UTILITY).some(utility => utility.averageMonthlyBill != null);


    const isWithinTwelveMonths = (date: string) => {
        const current = moment(date, "MMM YYYY");
        const twelveMonthsFromNow = moment().add(1, "year");
        return current.isBefore(twelveMonthsFromNow);
    }

    return (

        LeaseType.SHORT_TERM === unitFloorplan.floorplan?.property?.leaseType ?
            <ShortTermFloorplanSection contactClickHandler={contactClickHandler} applyClickHandler={applyClickHandler}
                                       floorplanId={unitId}/> :
            <section className="section-unit">
                {
                    isLoading ? <section className="section-floorplan--hero"><GridGallerySkeleton/></section> : <>
                        {errorLoading ?
                            <section className="div-full--center">
                                <h2>Uh-oh, this is a 404</h2>
                            </section> :
                            <>
                                <UnitHero unit={unitFloorplan} contactClickHandler={contactClickHandler}
                                          webSpecials={webSpecials}
                                          applyClickHandler={applyClickHandler} handleRefToMap={handleRefToMap}/>
                                <div className="container">
                                    <div className="unit--cards">
                                        <Card title="Details">
                                            <p className="unit-card--featured">
                                                {unitFloorplan.floorplan.bedroom} Bedroom
                                                | {unitFloorplan.floorplan.bathroom} Bathroom {enumToString(unitFloorplan.floorplan.style)}
                                            </p>

                                            <p className="unit-card--featured">
                                                ${unitFloorplan.squareFoot} Square Feet
                                            </p>
                                            <p className="unit-card--featured">
                                                ${unitFloorplan.rent} /mo
                                            </p>
                                            <p className="unit-card--featured">
                                                ${unitFloorplan.deposit} Security Deposit
                                            </p>
                                            <p>
                                                {unitFloorplan.floorplan.description}
                                            </p>
                                        </Card>
                                        {
                                            unitFloorplan.floorplan.amenities.length > 0 ?
                                                <Card title="Amenities">
                                                    <Ul>
                                                        {
                                                            unitFloorplan.floorplan.amenities.filter(amenity => amenity.featured).map(amenity =>
                                                                <Li key={"unitFloorplan-amenity-" + amenity.id}
                                                                    bulletIcon="star"
                                                                    isFeatured={true}>
                                                                    {amenity.name}

                                                                </Li>
                                                            )}
                                                        {
                                                            unitFloorplan.floorplan.amenities.filter(amenity => !amenity.featured).map(amenity =>
                                                                <Li key={"unitFloorplan-amenity-" + amenity.id}
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
                                                                            <Li key={"unitFloorplan-variation-" + i}>
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
                                                    permittedPets(unitFloorplan).map((pet, i) =>
                                                        <Li key={"unitFloorplan-permitted-pet-" + i} bulletIcon="check"
                                                            bulletColor="green">
                                                            {pet}
                                                        </Li>
                                                    )
                                                }
                                            </Ul>
                                            {notPermittedPets(unitFloorplan).length > 0 ?
                                                <><h5>Not Permitted</h5>
                                                    <Ul>
                                                        {
                                                            notPermittedPets(unitFloorplan).map((pet, i) =>
                                                                <Li key={"unitFloorplan-not-permitted-pet-" + i}
                                                                    bulletColor="brown" bulletIcon="close">
                                                                    {pet}
                                                                </Li>
                                                            )
                                                        }
                                                    </Ul>
                                                </> : ""}

                                            {
                                                unitFloorplan.petPolicy ?
                                                    <>
                                                        <h5>Additional Information</h5>
                                                        <p>{unitFloorplan.petPolicy}</p>
                                                    </> : ""

                                            }

                                        </Card>

                                        <Card title="Availability">
                                            <Ul>
                                                {
                                                    availableDates().filter(availableDate => isWithinTwelveMonths(availableDate)).map(availableDate =>
                                                        <Li key={"unitFloorplan-unit-availability-" + availableDate}
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
                                                    unitFloorplan.floorplan.utilities.filter(utility => utility.type === UtilityType.INCLUDED_UTILITY).map(utility =>
                                                        <Li key={"unitFloorplan-included-utility-" + utility.id}
                                                            bulletIcon="home">
                                                            {capitalizeFirstLetter(utility.name)}
                                                        </Li>
                                                    )
                                                }
                                            </Ul>
                                            <h5>Paid By Resident</h5>
                                            <Ul>
                                                {
                                                    unitFloorplan.floorplan.utilities.filter(utility => utility.type === UtilityType.RESIDENT_UTILITY).map(utility =>
                                                        <Li key={"unitFloorplan-resident-utility-" + utility.id}
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


                                        {similarFloorplans.length > 0 ?
                                            <SimilarFloorplanCard similarFloorplans={similarFloorplans}/> : ""}
                                        {floorplanFaqs.length > 0 ?
                                            <FaqsCard faqs={floorplanFaqs} title="Frequently Asked Questions"/> : ""}

                                        <div className="contact-card">
                                            <Card featured={true}>
                                                <p><i>Questions?</i></p>
                                                <p><i>Call or text us anytime:</i></p>
                                                {unitFloorplan.floorplan.property?.phone ?
                                                    <p><a
                                                        href={"tel:" + unitFloorplan.floorplan.property.phone}>{formatPhoneNumber(unitFloorplan.floorplan.property.phone)}</a>
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
                                            src={floorplanAddressToGoogleMap(addressFromUnit(unitFloorplan))}/>
                                    </Card>
                                </div>
                            </>
                        }

                    </>
                }
            </section>
    );
};

export interface UnitSectionProps {
    contactClickHandler: () => void;
    applyClickHandler: () => void;
    unitId: string;
    locationRef?: React.Ref<HTMLDivElement>;
    handleRefToLocation?: () => void;
    handleHtmlTitleUpdate?: (title: string) => void;
}
