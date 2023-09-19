import React from "react";
import "./assets/FloorplanCard.scss";
import {getAssetUrl} from "../../asset/service/AssetService";
import {FloorplanDetails} from "../data/Floorplan";
import {DEFAULT_IMAGE_URL} from "../../service/AssetApi";
import {rangeFrom} from "../../utils/Utils";
import {Video} from "../../asset/data/Asset";
import {Button} from "@contentmunch/muncher-ui";
import tourIcon from "./assets/360-icon.png";
import videoIcon from "./assets/video-icon.png";

export const FloorplanSliderCard: React.FC<FloorplanSliderCardProps> = (
    {
        floorplan, size, videoClickHandler, propertyId
    }) => {

    return (
        <div className={size === "small" ? "floorplan-card floorplan-card--small" : "floorplan-card"}
             style={{backgroundImage: `url(${floorplan.coverImage ? getAssetUrl(floorplan.coverImage, propertyId) : DEFAULT_IMAGE_URL})`}}>

            {floorplan.virtualTourLink ?
                <div className="icon-tour">
                    <Button variant="transparent" size="small"
                            onClick={() => videoClickHandler({
                                url: floorplan.virtualTourLink,
                                type: "virtual"
                            } as Video)}
                    >
                        <img src={tourIcon} alt="tour icon" height={30}/>
                    </Button>

                </div>
                : ''}
            {floorplan.videoTourLink ?
                <div className="icon-video">
                    <Button variant="transparent" size="small"
                            onClick={() => videoClickHandler({url: floorplan.videoTourLink, type: "video"} as Video)}
                    >
                        <img src={videoIcon} alt="video icon" height={20}/>
                    </Button>
                </div>
                : ''}


            <a href={"/floorplans/" + floorplan.id}>
                <div className="floorplan-card-footer featured">

                    <div className="left">
                        <h3>
                            Featured Floorplan
                        </h3>
                        <h3 className="truncate">
                            {floorplan.name} ››
                        </h3>

                    </div>
                    <div className="right">
                        <p>{floorplan.bedroom} bed, {floorplan.bathroom} bath</p>
                        <p>{floorplan.units.length > 0 ? <>{rangeFrom(floorplan.units, "squareFoot")} sq.
                            ft.</> : <>&nbsp;</>}</p>
                        <p>{floorplan.units.length > 0 ? <>${rangeFrom(floorplan.units, "rent")}/mo</> : <>&nbsp;</>}</p>
                    </div>
                </div>
            </a>
        </div>
    );
}

export interface FloorplanSliderCardProps {
    floorplan: FloorplanDetails;
    size?: "small" | "large";
    videoClickHandler: (video: Video) => void;
    propertyId: string;
}
