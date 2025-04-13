import React, {useState} from "react";
import {VideoModal} from "../../asset/VideoModal";
import {Video} from "../../asset/data/Asset";
import "./assets/UnitsSection.scss";
import {UnitCardData} from "../data/Unit";
import {filtersFromUnits, sortAndFilterUnits} from "../service/UnitService";
import {UnitCard} from "../card/UnitCard";
import {defaultAvailabilityToMonthYear} from "../../floorplan/service/FloorplanService";
import {MAX_RENT, MIN_RENT} from "../../floorplan/data/Floorplan";
import {DefaultFloorplanFilters} from "../../floorplan/section/FloorplansSection";
import {UnitsHeader} from "./UnitsHeader";

export const UnitsSection: React.FC<UnitsSectionProps> = (
    {
        units, title, isCondensed, propertyId,
        defaultFloorplanStyle, defaultBedRooms, defaultAvailability, defaultMaxRent, defaultMinRent, defaultFloorplanIds
    }) => {
    const [filteredUnits, setFilteredUnits] = useState<UnitCardData[]>(sortAndFilterUnits(units, {
        bedroomFilters: defaultBedRooms ? [defaultBedRooms] : [],
        availabilityFilters: defaultAvailability ? [defaultAvailabilityToMonthYear(defaultAvailability)] : [],
        styleFilters: defaultFloorplanStyle ? [defaultFloorplanStyle] : [],
        minRent: defaultMinRent ? defaultMinRent : MIN_RENT,
        maxRent: defaultMaxRent ? defaultMaxRent : MAX_RENT,
        sortBy: "featured",
        floorplanIds: defaultFloorplanIds ? defaultFloorplanIds : []
    }));

    const [showVideoModal, setShowVideoModal] = useState(false);
    const [video, setVideo] = useState<Video>({} as Video);

    const setCurrentUnits = (currentUnits: UnitCardData[]) => {
        setFilteredUnits(currentUnits);
    }

    const handleVideoClicked = (data: Video) => {
        setVideo(data);
        setShowVideoModal(true);
    };

    return (
        <>
            <section className="section-units">
                <VideoModal video={video} showModal={showVideoModal} setShowModal={setShowVideoModal}/>
                <div className={isCondensed ? "container" : ""}>
                    <UnitsHeader title={title} filters={filtersFromUnits(units)} units={units}
                                 setCurrentUnits={setCurrentUnits} currentUnitCounts={0}
                                 isCondensed={isCondensed}
                                 defaultFloorplanStyle={defaultFloorplanStyle}
                                 defaultBedRooms={defaultBedRooms}
                                 defaultAvailability={defaultAvailability}
                                 defaultMaxRent={defaultMaxRent}
                                 defaultMinRent={defaultMinRent}
                                 defaultFloorplanIds={defaultFloorplanIds}
                    />

                    <div className={isCondensed ? "" : "container"}>
                        <div className="units-body">

                            {
                                filteredUnits.length === 0 ?
                                    <>
                                        <p className="units-banner">No matches found...</p>
                                    </> :
                                    filteredUnits.map((unit, i) => (
                                        <UnitCard unit={unit} key={i} propertyId={propertyId}
                                                  videoClickHandler={handleVideoClicked}/>))
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export interface UnitsSectionProps extends DefaultFloorplanFilters {
    units: UnitCardData[];
    title?: string;
    isCondensed?: boolean;
    propertyId: string;
}

UnitsSection.defaultProps = {
    title: "Units",
    isCondensed: true,
}
