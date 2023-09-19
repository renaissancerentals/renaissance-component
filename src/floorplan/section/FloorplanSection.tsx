import React, {useEffect, useRef, useState} from "react";
import {
    Floorplan,
    FloorplanVariation,
    SimilarFloorplan,
    Testimonial,
    UtilityName,
    UtilityType
} from "../data/Floorplan";
import {
    getFloorplan,
    getFloorplanVariations,
    getSimilarFloorplans,
    getTestimonials,
    notPermittedPets,
    permittedPets,
    petPolicy
} from "../service/FloorplanService";
import "./assets/FloorplanSection.scss";
import {GalleryHeroSkeleton} from "../../gallery/GalleryHeroSkeleton";
import {FloorplanHero} from "./FloorplanHero";
import {
    addressToGoogleMap,
    capitalizeFirstLetter,
    dateToMoment,
    enumToString,
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

export const FloorplanSection: React.FC<FloorplanSectionProps> = (
    {
        contactClickHandler,
        applyClickHandler,
        floorplanId,
        locationRef,
        handleRefToLocation
    }) => {
    const [floorplan, setFloorplan] = useState<Floorplan>({} as Floorplan);
    const [similarFloorplans, setSimilarFloorplans] = useState<SimilarFloorplan[]>([]);
    const [floorplanVariations, setFloorplanVariations] = useState<FloorplanVariation[]>([]);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
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
        Promise.all([
            getFloorplan(floorplanId),
            getFloorplanVariations(floorplanId),
            getSimilarFloorplans(floorplanId),
            getTestimonials(floorplanId)
        ])
            .then((data) => {
                const floorplanData = {...data[0]};
                const activeUnits = floorplanData.units.filter(unit => unit.active);
                floorplanData.units = activeUnits;
                setFloorplan(floorplanData);
                setFloorplanVariations(data[1]);
                setSimilarFloorplans(data[2]);
                setTestimonials(data[3]);
            })
            .catch(() => {
                setErrorLoading(true);
            })
            .finally(() => {
                setIsLoading(false);
            });

    }, [floorplanId]);

    const availableDates = (): string[] => {
        const sortAvailabileDates = (a: string, b: string) => moment(a, "MMMM YYYY").diff(moment(b, "MMMM YYYY"));
        const dates = new Set<string>();
        floorplan.units.forEach(unit => {
            dates.add(dateToMoment(unit.moveInDate).format("MMMM YYYY"));
        });

        return Array.from(dates).sort(sortAvailabileDates);
    }

    const residentUtilityDetails = (utility: UtilityName) =>

        utility.averageMonthlyBill ? capitalizeFirstLetter(utility.name) + " - Avg/Mo " + toUSD(utility.averageMonthlyBill) : capitalizeFirstLetter(utility.name);

    const isAverageMonthlyBillPresent = () => floorplan.utilities.filter(utility => utility.type === UtilityType.RESIDENT_UTILITY).some(utility => utility.averageMonthlyBill != null);


    const isWithinTwelveMonths = (date: string) => {
        const current = moment(date, "MMM YYYY");
        const twelveMonthsFromNow = moment().add(1, "year");
        return current.isBefore(twelveMonthsFromNow);
    }
    return (
        <section className="section-floorplan">
            {
                isLoading ? <section className="section-floorplan--hero"><GalleryHeroSkeleton/></section> : <>
                    {errorLoading ?
                        <section className="div-full--center">
                            <h2>Uh-oh, this is a 404</h2>
                        </section> :
                        <>
                            <FloorplanHero floorplan={floorplan} contactClickHandler={contactClickHandler}
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
                                    <Card>
                                        <div ref={locationRef ? locationRef : mapRef} id="location"
                                             className="reference">

                                        </div>
                                        <MapSection
                                            src={
                                                floorplan.address ?
                                                    addressToGoogleMap(floorplan.address, floorplan.zipcode)
                                                    :
                                                    addressToGoogleMap(floorplan.property.address, floorplan.property.zipcode)
                                            }/>
                                    </Card>

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
                                                **Average utilities shown above are an estimate. Actual monthly utility
                                                costs can vary significantly based on individual usage, time of year,
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
