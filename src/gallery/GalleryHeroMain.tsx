import React from "react";
import './assets/GalleryHero.scss';
import {Asset} from "../asset/data/Asset";
import {assetUrlFrom} from "../asset/service/AssetService";
import {Badge} from "@contentmunch/muncher-ui";
import {HeroImageCard} from "./HeroImageCard";
import tourIcon from "../floorplan/card/assets/360-icon.png";
import videoIcon from "../floorplan/card/assets/video-icon.png";

export const GalleryHeroMain: React.FC<GalleryHeroProps> = (
    {
        virtualTour, setCurrentView, isAvailableNow,
        assetsToShow, isFirst, toursCount, imageClickedHandler, propertyId
    }) => {

    const cardImageIcon = (i: number) => virtualTour && i === 0 ?
        <>
            <img src={tourIcon} alt="tour icon" height={50}/>
            <p>Virtual Tour</p>
        </> :
        <>
            <img src={videoIcon} alt="video icon" height={40}/>
            <p>Video Tour</p>
        </>

    return (
        <div className="div-gallery">
            {isFirst && isAvailableNow ?
                <div className="badge--info"><Badge variant="secondary">Available Now</Badge></div> : <></>}

            <div className="gallery-hero-two-columns">
                {isFirst ?
                    <div
                        className={assetsToShow.length < 2 ? "gallery-hero-one" : "gallery-hero-column-one"}>
                        {
                            assetsToShow.slice(0, 1).map((asset) =>
                                <img src={assetUrlFrom(asset.id, propertyId)}
                                     alt={asset.name}
                                     key={asset.id}
                                     className="gallery-hero--image"
                                     onClick={() => imageClickedHandler(asset)}
                                />
                            )
                        }
                    </div> : <></>}
                {assetsToShow.length > 1 ?
                    <div className={isFirst ? "gallery-hero-column-two" : "gallery-hero-column"}>
                        {isFirst ?
                            [...Array(toursCount)].map((x, i) =>

                                <HeroImageCard backgroundImage={assetUrlFrom(assetsToShow[i].id, propertyId)}
                                               key={"tour" + i}
                                               onClick={() => {
                                                   virtualTour && i === 0 ? setCurrentView("virtual tour") : setCurrentView("video tour");
                                               }}>
                                    {cardImageIcon(i)}
                                </HeroImageCard>
                            ) : <></>
                        }
                        {

                            assetsToShow.slice(isFirst ? 1 : 0, assetsToShow.length).map((asset) =>
                                <img src={assetUrlFrom(asset.id, propertyId)}
                                     alt={asset.name}
                                     key={asset.id}
                                     className="gallery-hero--image"
                                     onClick={() => imageClickedHandler(asset)}
                                />
                            )
                        }
                    </div> : <></>
                }

            </div>
        </div>
    );
};


export interface GalleryHeroProps {

    assetsToShow: Asset[];
    virtualTour?: string;
    isAvailableNow?: boolean;
    isFirst: boolean;
    toursCount: number;

    setCurrentView: (view: "photo" | "virtual tour" | "video tour") => void;
    imageClickedHandler: (image: Asset) => void;
    propertyId: string;

}