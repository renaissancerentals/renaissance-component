import React, {useState} from "react";
import "./assets/FloorplanCardSlider.scss";
import {FloorplanDetails} from "../data/Floorplan";
import {ItemSlider} from "@contentmunch/muncher-ui";
import {VideoModal} from "../../asset/VideoModal";
import {Video} from "../../asset/data/Asset";
import {FloorplanCard} from "./FloorplanCard";
import {convertToFloorplanCardData} from "../service/FloorplanService";

export const FloorplanCardSlider: React.FC<FloorplanCardSliderProps> = (
    {
        floorplans, size, propertyId
    }) => {
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [video, setVideo] = useState<Video>({} as Video);
    const handleVideoClicked = (data: Video) => {
        setVideo(data);
        setShowVideoModal(true);
    };
    return (
        <div
            className={size === "small" ? "floorplan-card--slider floorplan-card-slider--small" : "floorplan-card--slider "}>
            <VideoModal video={video} showModal={showVideoModal} setShowModal={setShowVideoModal}/>
            <ItemSlider navButtonSize="medium"
                        sliderItems={floorplans.map(floorplan =>
                            <FloorplanCard floorplan={convertToFloorplanCardData(floorplan)} size={size}
                                           variant="featured"
                                           videoClickHandler={handleVideoClicked} propertyId={propertyId}/>
                        )}/>
        </div>
    );
}

export interface FloorplanCardSliderProps {
    floorplans: FloorplanDetails[];
    size?: "small" | "large";
    propertyId: string;
}
