import React, {useState} from "react";
import "./assets/FloorplanCard.scss";
import tourIcon from "./assets/360-icon.png";
import videoIcon from "./assets/video-icon.png";
import {Badge, Button, ItemSlider, NavigateButton, Spinner} from "@contentmunch/muncher-ui";
import {assetUrlFrom, getAssetsFrom, getAssetUrl} from "../../asset/service/AssetService";
import {FloorplanCardData} from "../data/Floorplan";
import {DEFAULT_IMAGE_URL} from "../../service/AssetApi";
import {Asset, Video} from "../../asset/data/Asset";
import {isFloorplanAvailable} from "../service/FloorplanService";
import {rangeFrom} from "../../utils/Utils";
import {FloorplanPrice} from "./FloorplanPrice";

export const FloorplanCard: React.FC<FloorplanCardProps> = ({floorplan, size, videoClickHandler, propertyId}) => {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [isAssetLoading, setIsAssetLoading] = useState(false);
    const [isAssetLoaded, setIsAssetLoaded] = useState(false);
    const loadAssets = () => {

        if (floorplan.photosFolderId) {
            getAssetsFrom(floorplan.photosFolderId).then(data => {
                setAssets(data);
            }).catch(() => {
                console.log("invalid folderId");
            }).finally(() => {
                setIsAssetLoaded(true);
                setIsAssetLoading(false);
            });
        } else {
            setIsAssetLoaded(true);
            setIsAssetLoading(false);
        }

    };
    return (
        <div className={size === "small" ? "floorplan-card floorplan-card--small" : "floorplan-card"}>

            {isAssetLoaded && assets.length > 0 ? <ItemSlider navButtonSize="medium"
                                                              sliderItems={assets.map(asset => <img
                                                                  className="card--image"
                                                                  alt="card"
                                                                  src={assetUrlFrom(asset.id, propertyId)}/>)}/> :
                <img className="card--image" alt="cover"
                     src={floorplan.coverImage ? getAssetUrl(floorplan.coverImage, propertyId) : DEFAULT_IMAGE_URL}/>}
            {isAssetLoaded ? "" : <NavigateButton direction="right" onClick={loadAssets} size="medium"/>}


            {isAssetLoading ? <Spinner size="medium"/> : <></>}
            {floorplan.featured ? (isFloorplanAvailable(floorplan) ? <Badge>Featured & Available Now</Badge> :

                <Badge>Featured</Badge>) : isFloorplanAvailable(floorplan) ? <Badge>Available Now</Badge> : ''}
            {floorplan.virtualTourLink ?
                <div className="icon-tour">
                    <Button variant="transparent" size="small"
                            onClick={() => videoClickHandler({url: floorplan.virtualTourLink, type: "virtual"})}>
                        <img src={tourIcon} alt="tour icon" height={30}/>
                    </Button>

                </div>
                : ''}
            {floorplan.videoTourLink ?
                <div className="icon-video">
                    <Button variant="transparent" size="small"
                            onClick={() => videoClickHandler({url: floorplan.videoTourLink, type: "video"})}>
                        <img src={videoIcon} alt="video icon" height={20}/>
                    </Button>
                </div>
                : ''}
            <a href={"/floorplans/" + floorplan.id}
               title={floorplan.name}>
                <div className="floorplan-card-footer">
                    <div className="left">
                        <h3 className="truncate">
                            {floorplan.name}
                        </h3>
                        <p><FloorplanPrice units={floorplan.units}/></p>
                    </div>
                    <div className="right">
                        <p>{floorplan.bedroom} bed, {floorplan.bathroom} bath</p>
                        <p>{floorplan.units.length > 0 ? <>{rangeFrom(floorplan.units, "squareFoot")} sq.
                            ft.</> : <>&nbsp;</>}</p>
                    </div>
                </div>
            </a>
        </div>
    );
}

export interface FloorplanCardProps {
    floorplan: FloorplanCardData;
    size?: "small" | "large"
    videoClickHandler: (video: Video) => void;
    propertyId: string;
}

