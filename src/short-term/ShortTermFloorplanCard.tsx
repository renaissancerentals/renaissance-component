import React, {useState} from "react";
import "./assets/ShortTermFloorplanCard.scss"
import {Asset, Video} from "../asset/data/Asset";
import {assetUrlFrom, getAssetsFrom, getAssetUrl} from "../asset/service/AssetService";
import {Button, ItemSlider, NavigateButton, Spinner} from "@contentmunch/muncher-ui";
import {DEFAULT_IMAGE_URL} from "../service/AssetApi";
import tourIcon from "../floorplan/card/assets/360-icon.png";
import videoIcon from "../floorplan/card/assets/video-icon.png";
import {toUSD} from "../utils/Utils";
import {FloorplanShortTerm} from "./data/ShortTerm";

export const ShortTermFloorplanCard: React.FC<ShortTermFloorplanCardProps> = (
    {
        floorplan,
        size,
        videoClickHandler,
        propertyId
    }) => {

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
        <div
            className={size === "small" ? "short-term-floorplan-card short-term-floorplan-card--small" : "short-term-floorplan-card"}>

            {isAssetLoaded && assets.length > 0 ? <ItemSlider navButtonSize="medium"
                                                              sliderItems={assets.map(asset => <img
                                                                  className="card--image"
                                                                  alt="card"
                                                                  src={assetUrlFrom(asset.id, propertyId)}/>)}/> :
                <img className="card--image" alt="cover"
                     src={floorplan.coverImage ? getAssetUrl(floorplan.coverImage, propertyId) : DEFAULT_IMAGE_URL}/>}
            {isAssetLoaded ? "" : <NavigateButton direction="right" onClick={loadAssets} size="medium"/>}


            {isAssetLoading ? <Spinner size="medium"/> : <></>}
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

            <a href={"/floorplans/" + floorplan.id}>
                <div className="floorplan-card-footer">
                    <div className="left">
                        <h3 className="truncate">
                            {floorplan.name}
                        </h3>
                        <p className="small"> {toUSD(floorplan.shortTerm.priceFor5To13Days)}/day (5-13
                            Days), {toUSD(floorplan.shortTerm.priceFor14To29Days)}/day (14-29 Days)</p>
                        <p className="small">{toUSD(floorplan.shortTerm.priceFor1To4Months)}/day (1-4
                            Months), {toUSD(floorplan.shortTerm.priceFor4andMoreMonths)}/day (4+ Months) </p>

                    </div>
                    <div className="right">

                        <p>{floorplan.bedroom} bed, {floorplan.bathroom} bath</p>
                        <p>{floorplan.shortTerm.squareFoot} sq.ft.</p>
                    </div>
                </div>
            </a>
        </div>
    );
};

export interface ShortTermFloorplanCardProps {
    floorplan: FloorplanShortTerm;
    size?: "small" | "large"
    videoClickHandler: (video: Video) => void;
    propertyId: string;
}
