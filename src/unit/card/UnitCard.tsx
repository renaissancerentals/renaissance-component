import React, {useState} from "react";
import "./assets/UnitCard.scss";
import tourIcon from "./assets/360-icon.png";
import videoIcon from "./assets/video-icon.png";
import {Badge, Button, Icon, ItemSlider, NavigateButton, Spinner} from "@contentmunch/muncher-ui";
import {assetUrlFrom, getAssetsFrom, getAssetUrl} from "../../asset/service/AssetService";
import {DEFAULT_IMAGE_URL} from "../../service/AssetApi";
import {addressToGoogleMapLink, availabilityDate, renaissanceAddress} from "../../utils/Utils";
import {Asset, Video} from "../../asset/data/Asset";
import {SpecialOfferButton} from "../../special-offer/SpecialOfferButton";
import {UnitCardData} from "../data/Unit";
import {isUnitAvailable} from "../service/UnitService";
import {FloorplanPrice} from "../../floorplan/card/FloorplanPrice";

export const UnitCard: React.FC<UnitCardProps> = (
    {
        unit,
        size,
        videoClickHandler,
        propertyId
    }) => {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [isAssetLoading, setIsAssetLoading] = useState(false);
    const [isAssetLoaded, setIsAssetLoaded] = useState(false);
    const [showSpecialOffer, setShowSpecialOffer] = useState(false);

    const loadAssets = () => {

        if (unit.photosFolderId) {
            getAssetsFrom(unit.photosFolderId).then(data => {
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
        <div className={size === "small" ? "unit-card unit-card--small" : "unit-card"}>

            {isAssetLoaded && assets.length > 0 ?
                <ItemSlider navButtonSize="medium"
                            sliderItems={assets.map(asset => <img
                                className="card--image"
                                alt="card"
                                src={assetUrlFrom(asset.id, propertyId)}/>)}/> :
                <img className="card--image" alt="cover"
                     src={unit.coverImage ? getAssetUrl(unit.coverImage, propertyId) : DEFAULT_IMAGE_URL}/>}
            {isAssetLoaded ? "" : <NavigateButton direction="right" onClick={loadAssets} size="medium"/>}

            {isAssetLoading ? <Spinner size="medium"/> : <></>}
            <div className="badges--right">
                {
                    unit.featured ? (isUnitAvailable(unit) ? <Badge>Featured & Available Now</Badge> :
                        <Badge>Featured</Badge>) : isUnitAvailable(unit) ? <Badge>Available Now</Badge> : ''
                }
                {
                    unit.webSpecials.length > 0 ?
                        <SpecialOfferButton onMouseEnter={() => setShowSpecialOffer(true)}
                                            onMouseLeave={() => setShowSpecialOffer(false)}/> : <></>
                }
            </div>
            <div className="badges--left">
                {unit.virtualTourLink ?
                    <div className="icon-tour">
                        <Button variant="transparent" size="small" title="tour icon"
                                onClick={() => videoClickHandler({
                                    url: unit.virtualTourLink,
                                    type: "virtual"
                                })}>
                            <img src={tourIcon} alt="tour icon" height={30}/>
                        </Button>

                    </div>
                    : ''}
                {unit.videoTourLink ?
                    <div className="icon-video">
                        <Button variant="transparent" size="small" title="video icon"
                                onClick={() => videoClickHandler({url: unit.videoTourLink, type: "video"})}>
                            <img src={videoIcon} alt="video icon" height={20}/>
                        </Button>
                    </div>
                    : ''}
                {unit.address && unit.zipcode ?
                    <div className="icon-map">

                        <a target="_blank" rel="noreferrer"
                           title={"address:" + renaissanceAddress(unit.address, unit.zipcode)}
                           href={addressToGoogleMapLink(unit.address, unit.zipcode)}>
                            <Icon name="map"
                                  size="small"/></a>
                    </div>
                    : ''}
            </div>
            <a href={"/floorplans/" + unit.floorplanId}
               title={unit.floorplanName + unit.id}>
                <div className="unit-card-content">
                    <div className="unit-card-content--special">
                        {showSpecialOffer && unit.webSpecials.length > 0 ?
                            <div className="content--special">
                                <p>{unit.webSpecials[0]}</p>
                            </div> : <></>}
                    </div>

                    <div className="unit-card-footer">
                        <div className="left">
                            <h3>
                                <span className="truncate">{unit.floorplanName}</span> ({unit.id})

                            </h3>
                            <p>
                                <Icon name="calendar">{availabilityDate(unit.moveInDate)}</Icon>
                            </p>

                            <p>
                                <FloorplanPrice unitRents={[{rent: unit.rent}]} specialRent={unit.specialRent}
                                                specialRentEndDate={unit.specialRentEndDate}
                                                specialRentStartDate={unit.specialRentStartDate}/>
                            </p>

                        </div>
                        <div className="right">
                            <p>{unit.bedroom} bed, {unit.bathroom} bath</p>
                            <p>{unit.squareFoot} sq.</p>
                        </div>
                    </div>

                </div>

            </a>
        </div>
    );
}

export interface UnitCardProps {
    unit: UnitCardData;
    size?: "small" | "large"
    videoClickHandler: (video: Video) => void;
    propertyId: string;
}

