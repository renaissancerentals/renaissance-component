import React, {useState} from "react";
import "./assets/FloorplanCard.scss";
import tourIcon from "./assets/360-icon.png";
import videoIcon from "./assets/video-icon.png";
import {Badge, Button, Icon, ItemSlider, NavigateButton, Spinner} from "@contentmunch/muncher-ui";
import {assetUrlFrom, getAssetsFrom, getAssetUrl} from "../../asset/service/AssetService";
import {FloorplanCardData} from "../data/Floorplan";
import {DEFAULT_IMAGE_URL} from "../../service/AssetApi";
import {addressToGoogleMapLink, rangeFrom, renaissanceAddress} from "../../utils/Utils";
import {Asset, Video} from "../../asset/data/Asset";
import {isFloorplanAvailable} from "../service/FloorplanService";
import {FloorplanPrice} from "./FloorplanPrice";
import {SpecialOfferButton} from "../../specialOffer/SpecialOfferButton";

export const FloorplanCard: React.FC<FloorplanCardProps> = ({
                                                                floorplan,
                                                                size,
                                                                videoClickHandler,
                                                                propertyId,
                                                                variant
                                                            }) => {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [isAssetLoading, setIsAssetLoading] = useState(false);
    const [isAssetLoaded, setIsAssetLoaded] = useState(false);
    const [showSpecialOffer, setShowSpecialOffer] = useState(false);

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

            {!variant && isAssetLoaded && assets.length > 0 ?
                <ItemSlider navButtonSize="medium"
                            sliderItems={assets.map(asset => <img
                                className="card--image"
                                alt="card"
                                src={assetUrlFrom(asset.id, propertyId)}/>)}/> :
                <img className="card--image" alt="cover"
                     src={floorplan.coverImage ? getAssetUrl(floorplan.coverImage, propertyId) : DEFAULT_IMAGE_URL}/>}
            {isAssetLoaded ? "" : <NavigateButton direction="right" onClick={loadAssets} size="medium"/>}

            {isAssetLoading ? <Spinner size="medium"/> : <></>}
            <div className="badges--right">
                {
                    floorplan.featured ? (isFloorplanAvailable(floorplan) ? <Badge>Featured & Available Now</Badge> :
                        <Badge>Featured</Badge>) : isFloorplanAvailable(floorplan) ? <Badge>Available Now</Badge> : ''
                }
                {
                    floorplan.webSpecials.length > 0 ?
                        <SpecialOfferButton onMouseEnter={() => setShowSpecialOffer(true)}
                                            onMouseLeave={() => setShowSpecialOffer(false)}/> : <></>
                }
            </div>
            <div className="badges--left">
                {floorplan.virtualTourLink ?
                    <div className="icon-tour">
                        <Button variant="transparent" size="small"
                                onClick={() => videoClickHandler({
                                    url: floorplan.virtualTourLink,
                                    type: "virtual"
                                })}>
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
            </div>
            <a href={"/floorplans/" + floorplan.id}
               title={floorplan.name}>
                <div className="floorplan-card-content">
                    <div className="floorplan-card-content--special">
                        {showSpecialOffer && floorplan.webSpecials.length > 0 ?
                            <div className="content--special">
                                <p>{floorplan.webSpecials[0]}</p>
                            </div> : <></>}
                    </div>
                    {variant === "featured" ?
                        <div className="floorplan-card-footer featured">
                            <div className="left">
                                <h3>
                                    Featured Floorplan
                                </h3>
                                <h3 className="truncate">
                                    {floorplan.name}
                                </h3>
                            </div>
                            <div className="right">
                                <p>{floorplan.bedroom} bed, {floorplan.bathroom} bath</p>
                                <p>{floorplan.units.length > 0 ? <>{rangeFrom(floorplan.units, "squareFoot")} sq.
                                    ft.</> : <>&nbsp;</>}</p>
                                <p>
                                    <FloorplanPrice unitRents={floorplan.units} specialRent={floorplan.specialRent}
                                                    specialRentEndDate={floorplan.specialRentEndDate}
                                                    specialRentStartDate={floorplan.specialRentStartDate}/>
                                </p>
                            </div>
                        </div>
                        :
                        <div className="floorplan-card-footer">
                            <div className="left">
                                <h3 className="truncate">
                                    {floorplan.name}
                                </h3>
                                {floorplan.address && floorplan.zipcode ?
                                    <a className="address-link" target="_blank" rel="noreferrer"
                                       href={addressToGoogleMapLink(floorplan.address, floorplan.zipcode)}>
                                        <Icon name="map" size="small">{renaissanceAddress(floorplan.address, floorplan.zipcode)}</Icon></a> : <></>}
                                <p>
                                    <FloorplanPrice unitRents={floorplan.units} specialRent={floorplan.specialRent}
                                                    specialRentEndDate={floorplan.specialRentEndDate}
                                                    specialRentStartDate={floorplan.specialRentStartDate}/>
                                </p>
                            </div>
                            <div className="right">
                                <p>{floorplan.bedroom} bed, {floorplan.bathroom} bath</p>
                                <p>{floorplan.units.length > 0 ? <>{rangeFrom(floorplan.units, "squareFoot")} sq.
                                    ft.</> : <>&nbsp;</>}</p>
                            </div>
                        </div>
                    }
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
    variant?: "featured"
}

