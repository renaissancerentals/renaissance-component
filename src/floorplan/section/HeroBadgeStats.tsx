import React from "react";
import {Badge, Button} from "@contentmunch/muncher-ui";
import cameraIcon from "../card/assets/camera-icon.png";
import tourIcon from "../card/assets/360-icon.png";
import videoIcon from "../card/assets/video-icon.png";
import "./assets/HeroBadgeStats.scss";
import {TourType} from "../../gallery/GridGalleryCover";

export const HeroBadgeStats: React.FC<HeroBadgeStatsProps> = (
    {currentView, setCurrentView, totalAssets, virtualTour, videoTours}) => {
    const makePlural = (length: number) => length > 1 ? "s" : "";
    return (
        <div className="hero-badge--stats">
            <Badge variant="tertiary">
                <div className={currentView === "photo" ? "item selected" : "item"}>
                    <Button size="small" variant="primary" rounded={true}
                            onClick={() => {
                                setCurrentView("photo");
                            }}><img className="camera-icon" src={cameraIcon} alt="camera icon"/><p>{totalAssets}</p>
                    </Button>
                    <p className="main">{totalAssets} Photo{makePlural(totalAssets)}</p>
                </div>
                {virtualTour ?
                    <div className={currentView === "Virtual Tour" ? "item selected" : "item"}>
                        <Button size="small" variant="primary" rounded={true}
                                onClick={() => {
                                    setCurrentView("Virtual Tour");
                                }}>
                            <img className="virtual-tour-icon" src={tourIcon} alt="virtual tour icon"/>
                            <p>1</p>
                        </Button>
                        <p className="main">1 Virtual Tour</p>
                    </div> : ""}
                {videoTours.length > 0 ?
                    <div className={currentView === "Video Tour" ? "item selected" : "item"}>
                        <Button size="small" variant="primary" rounded={true}
                                onClick={() => {
                                    setCurrentView("Video Tour");
                                }}>
                            <img className="video-tour-icon" src={videoIcon} alt="video tour icon"/>
                            <p>{videoTours.length}</p>
                        </Button>
                        <p className="main">{videoTours.length} Video Tour{makePlural(videoTours.length)}</p>
                    </div> : ""}
            </Badge>
        </div>
    );
};

export interface HeroBadgeStatsProps {
    currentView: "photo" | TourType;
    setCurrentView: (currentView: "photo" | TourType) => void;
    totalAssets: number;
    virtualTour?: string;
    videoTours: string[];
}
