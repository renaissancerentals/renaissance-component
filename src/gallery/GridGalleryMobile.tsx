import React, {ReactElement, useState} from "react";
import './assets/GridGalleryMobile.scss';
import {Asset} from "../asset/data/Asset";
import {assetUrlFrom} from "../asset/service/AssetService";
import {Badge, ItemSlider} from "@contentmunch/muncher-ui";
import {HeroImageCard} from "./HeroImageCard";
import tourIcon from "../floorplan/card/assets/360-icon.png";
import videoIcon from "../floorplan/card/assets/video-icon.png";
import {WebSpecial} from "../floorplan/data/Floorplan";
import {SpecialOfferButton} from "../special-offer/SpecialOfferButton";
import {TourType} from "./GridGalleryCover";
import {FloorplanAddress} from "../floorplan/service/FloorplanService";
import {MapSection} from "../map/MapSection";
import {floorplanAddressToGoogleMap} from "../utils/Utils";

export const GridGalleryMobile: React.FC<GridGalleryMobileProps> = (
    {
        assets, virtualTour, setCurrentView, toursCount, floorplanAddress,
        imageClickedHandler, isAvailableNow, propertyId, webSpecials,
    }) => {
    const [showSpecialOffer, setShowSpecialOffer] = useState(false);

    const createImageItem = (asset: Asset, index: number) =>

        <>
            {index === 0 ?
                <>
                    <div className="badge--info">
                        {isAvailableNow ?
                            <Badge variant="secondary">Available Now</Badge> : <></>}
                        {webSpecials.length > 0 ? <SpecialOfferButton onMouseEnter={() => setShowSpecialOffer(true)}
                                                                      onMouseLeave={() => setShowSpecialOffer(false)}/> : <></>}
                    </div>
                    {showSpecialOffer ?
                        <div className="gallery--information"><p>{webSpecials[0].description}</p></div> : <></>}
                </> : <></>
            }
            <img src={assetUrlFrom(asset.id, propertyId)}
                 alt={asset.name}
                 key={asset.id}
                 className="gallery-hero-mobile--image"
                 onClick={() => imageClickedHandler(asset)}/>
        </>;

    const sliderItems = () => {
        const cardImageIcon = (i: number) => virtualTour && i === 0 ?
            <>
                <img src={tourIcon} alt="tour icon" height={40}/>
                <p>Virtual Tour</p>
            </> :
            <>
                <img src={videoIcon} alt="video icon" height={30}/>
                <p>Video Tour</p>
            </>
        const items: ReactElement[] = [];
        items.push(createImageItem(assets[0], 0));
        [...Array(toursCount)].forEach((x, i) => {
                items.push(
                    <HeroImageCard backgroundImage={assetUrlFrom(assets[i].id, propertyId)}
                                   isForMobile={true}
                                   key={"tour" + i}
                                   onClick={() => {
                                       virtualTour && i === 0 ? setCurrentView("Virtual Tour") : setCurrentView("Video Tour");
                                   }}
                    >
                        {cardImageIcon(i)}
                    </HeroImageCard>
                )
            }
        );
        items.push(<MapSection
            src={floorplanAddressToGoogleMap(floorplanAddress)}/>)
        assets.slice(1, assets.length).forEach((asset, index) => {
            items.push(createImageItem(asset, index + 1));
        });

        return items;
    };


    return (
        <div className="grid-gallery--mobile">
                <div className="gallery-hero-column">
                    <ItemSlider sliderItems={sliderItems()}/>

                </div>
            </div>
    );
};

export interface GridGalleryMobileProps {
    assets: Asset[];
    floorplanAddress: FloorplanAddress;
    virtualTour?: string;
    toursCount: number;
    webSpecials: WebSpecial[];
    setCurrentView: (view: "photo" | TourType) => void;
    imageClickedHandler: (image: Asset) => void;
    propertyId: string;
    isAvailableNow: boolean;
}
