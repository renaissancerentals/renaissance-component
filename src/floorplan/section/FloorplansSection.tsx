import React, {useState} from "react";
import {FloorplanCardData, FloorplanStyle, MAX_RENT, MIN_RENT} from "../data/Floorplan";
import {FloorplansHeader} from "./FloorplansHeader";
import {filtersFrom, sortAndFilter} from "../service/FloorplanService";
import {FloorplanCard} from "../card/FloorplanCard";
import {VideoModal} from "../../asset/VideoModal";
import {Video} from "../../asset/data/Asset";
import "./assets/FloorplansSection.scss";

export const FloorplansSection: React.FC<FloorplansSectionProps> = (
    {
        floorplans, title, isCondensed, propertyId,
        defaultFloorplanStyle, defaultBedRooms, defaultAvailability, defaultMaxRent, defaultMinRent, defaultFloorplanIds
    }) => {
    const [filteredFloorplans, setFilteredFloorplans] = useState<FloorplanCardData[]>(sortAndFilter(floorplans, {
        bedroomFilters: defaultBedRooms ? [defaultBedRooms] : [],
        availabilityFilters: defaultAvailability ? [defaultAvailability] : [],
        styleFilters: defaultFloorplanStyle ? [defaultFloorplanStyle] : [],
        minRent: defaultMinRent ? defaultMinRent : MIN_RENT,
        maxRent: defaultMaxRent ? defaultMaxRent : MAX_RENT,
        sortBy: "featured",
        floorplanIds: defaultFloorplanIds ? defaultFloorplanIds : []
    }));

    const [showVideoModal, setShowVideoModal] = useState(false);
    const [video, setVideo] = useState<Video>({} as Video);

    const setCurrentFloorplans = (currentFloorplans: FloorplanCardData[]) => {
        setFilteredFloorplans(currentFloorplans);
    }

    const handleVideoClicked = (data: Video) => {
        setVideo(data);
        setShowVideoModal(true);
    };

    return (
        <>
            <section className="section-floorplans">
                <VideoModal video={video} showModal={showVideoModal} setShowModal={setShowVideoModal}/>
                <div className={isCondensed ? "container" : ""}>
                    <FloorplansHeader title={title} filters={filtersFrom(floorplans)} floorplans={floorplans}
                                      setCurrentFloorplans={setCurrentFloorplans}
                                      isCondensed={isCondensed}
                                      currentFloorplansCount={filteredFloorplans.length}
                                      defaultFloorplanStyle={defaultFloorplanStyle}
                                      defaultBedRooms={defaultBedRooms}
                                      defaultAvailability={defaultAvailability}
                                      defaultMaxRent={defaultMaxRent}
                                      defaultMinRent={defaultMinRent}
                                      defaultFloorplanIds={defaultFloorplanIds}
                    />

                    <div className={isCondensed ? "" : "container"}>
                        <div className="floorplans-body">

                            {
                                filteredFloorplans.length === 0 ?
                                    <>
                                        <p className="floorplan-banner">No matches found...</p>
                                    </> :
                                    filteredFloorplans.map((floorplan, i) => (
                                        <FloorplanCard floorplan={floorplan} key={i} propertyId={propertyId}
                                                       videoClickHandler={handleVideoClicked}/>))
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export interface FloorplansSectionProps extends DefaultFloorplanFilters {
    floorplans: FloorplanCardData[];
    title?: string;
    isCondensed?: boolean;
    propertyId: string;
}

export interface DefaultFloorplanFilters {
    defaultBedRooms?: number;
    defaultAvailability?: string;
    defaultFloorplanStyle?: FloorplanStyle;
    defaultMinRent?: number;
    defaultMaxRent?: number;
    defaultFloorplanIds?: string[];
}

FloorplansSection.defaultProps = {
    title: "Floor plans",
    isCondensed: true,
}