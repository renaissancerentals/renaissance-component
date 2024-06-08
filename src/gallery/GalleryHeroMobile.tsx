import React, {ReactElement} from "react";
import './assets/GalleryHero.scss';
import {Asset} from "../asset/data/Asset";
import {assetUrlFrom} from "../asset/service/AssetService";
import {Badge, ItemSlider} from "@contentmunch/muncher-ui";
import {HeroImageCard} from "./HeroImageCard";
import tourIcon from "../floorplan/card/assets/360-icon.png";
import videoIcon from "../floorplan/card/assets/video-icon.png";
import {WebSpecial} from "../floorplan/data/Floorplan";

export const GalleryHeroMobile: React.FC<GalleryHeroMobileProps> = (
    {
        assets, virtualTour, setCurrentView, toursCount,
        imageClickedHandler, isAvailableNow, propertyId, webSpecials,
    }) => {

    const createImageItem = (asset: Asset, index: number) =>

        <>
            {index === 0 ?
                <>
                    {isAvailableNow ?
                        <div className="badge--info"><Badge variant="secondary">Available Now</Badge></div> : <></>}
                    {webSpecials.length > 0 ?
                        <div className="gallery--information"><Badge variant="secondary">
                            <p>{webSpecials[0].description}</p>
                        </Badge></div> : <></>}
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
                                       virtualTour && i === 0 ? setCurrentView("virtual tour") : setCurrentView("video tour");
                                   }}
                    >
                        {cardImageIcon(i)}
                    </HeroImageCard>
                )
            }
        );
        assets.slice(1, assets.length).forEach((asset, index) => {
            items.push(createImageItem(asset, index+1));
        });

        return items;
    };


    return (
        <div className="div-gallery">
            <div className="gallery-hero-two-columns">
                <div className="gallery-hero-column">
                    <ItemSlider sliderItems={sliderItems()}/>

                </div>
            </div>


        </div>
    );
};

export interface GalleryHeroMobileProps {
    assets: Asset[];
    virtualTour?: string;
    toursCount: number;
    webSpecials: WebSpecial[];
    setCurrentView: (view: "photo" | "virtual tour" | "video tour") => void;
    imageClickedHandler: (image: Asset) => void;
    propertyId: string;
    isAvailableNow: boolean;
}
