import React, {useState} from "react";
import "./assets/ShortTermFloorplansSection.scss";
import {Video} from "../asset/data/Asset";
import {VideoModal} from "../asset/VideoModal";
import {FloorplanShortTerm, ShortTermStyle} from "./data/ShortTerm";
import {shortTermFiltersFrom, sortAndFilter} from "./service/ShortTermService";
import {ShortTermFloorplanCard} from "./ShortTermFloorplanCard";
import {ShortTermFloorplansHeader} from "./ShortTermFloorplansHeader";

export const ShortTermFloorplansSection: React.FC<ShortTermFloorplansSectionProps> = (
    {
        floorplans, title, isCondensed, propertyId,
        defaultFloorplanStyle, defaultBedRooms, defaultMaxRent, defaultMinRent, defaultFloorplanIds
    }) => {
    const [filteredFloorplans, setFilteredFloorplans] = useState<FloorplanShortTerm[]>(sortAndFilter(floorplans, {
        bedroomFilters: defaultBedRooms ? [defaultBedRooms] : [],
        styleFilters: defaultFloorplanStyle ? [defaultFloorplanStyle] : [],
        sortBy: "priceAsc",
        floorplanIds: defaultFloorplanIds ? defaultFloorplanIds : []
    }));

    const [showVideoModal, setShowVideoModal] = useState(false);
    const [video, setVideo] = useState<Video>({} as Video);

    const setCurrentFloorplans = (currentFloorplans: FloorplanShortTerm[]) => {
        setFilteredFloorplans(currentFloorplans);
    }

    const handleVideoClicked = (data: Video) => {
        setVideo(data);
        setShowVideoModal(true);
    };

    return (
        <>
            <section className="section-short-term-floorplans">
                <VideoModal video={video} showModal={showVideoModal} setShowModal={setShowVideoModal}/>
                <div className={isCondensed ? "container" : ""}>
                    <ShortTermFloorplansHeader title={title} filters={shortTermFiltersFrom(floorplans)}
                                               floorplans={floorplans}
                                               setCurrentFloorplans={setCurrentFloorplans}
                                               isCondensed={isCondensed}
                                               currentFloorplansCount={filteredFloorplans.length}
                                               defaultFloorplanStyle={defaultFloorplanStyle}
                                               defaultBedRooms={defaultBedRooms}
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
                                        <ShortTermFloorplanCard floorplan={floorplan} key={i} propertyId={propertyId}
                                                                videoClickHandler={handleVideoClicked}/>))
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export interface ShortTermFloorplansSectionProps extends DefaultShortTermFilters {
    floorplans: FloorplanShortTerm[];
    title?: string;
    isCondensed?: boolean;
    propertyId: string;
}

export interface DefaultShortTermFilters {
    defaultBedRooms?: number;
    defaultFloorplanStyle?: ShortTermStyle;
    defaultMinRent?: number;
    defaultMaxRent?: number;
    defaultFloorplanIds?: string[];
}

ShortTermFloorplansSection.defaultProps = {
    title: "Floor plans",
    isCondensed: true,
}
