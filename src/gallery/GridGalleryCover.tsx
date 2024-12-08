import React from "react";
import {Asset} from "../../lib";
import {FloorplanAddress} from "../floorplan/service/FloorplanService";
import {Badge} from "@contentmunch/muncher-ui";
import {SpecialOfferBadge} from "../specialOffer/SpecialOfferBadge";
import {assetUrlFrom} from "../asset/service/AssetService";
import {WebSpecial} from "../floorplan/data/Floorplan";
import './assets/GridGallery.scss';
import {HeroImageCard} from "./HeroImageCard";
import tourIcon from "../floorplan/card/assets/360-icon.png";
import videoIcon from "../floorplan/card/assets/video-icon.png";
import {MapSection} from "../map/MapSection";
import {floorplanAddressToGoogleMap} from "../utils/Utils";

export const GridGalleryCover: React.FC<GridGalleryCoverProps> = (
    {
        assets,
        heroImage,
        videoTourImageBackground,
        virtualTourImageBackground,
        webSpecials,
        isAvailableNow,
        floorplanAddress,
        propertyId,
        imageClickedHandler,
        setCurrentView,
        showOnlyHeroImage
    }) => {
    const cardImageIcon = (tourType: TourType) =>
        <>
            {tourType === "Video Tour" ?
                <img src={videoIcon} alt="tour icon" height="40"/> :
                <img src={tourIcon} alt="tour icon" height="50"/>
            }

            <p>{tourType}</p>
        </>

    return (
        <div className="grid-gallery">
            <div className="badge--info">
                {isAvailableNow ?
                    <Badge variant="secondary">Available Now</Badge>
                    : <></>
                }
                {webSpecials.length > 0 ?
                    <SpecialOfferBadge/> : <></>
                }
            </div>
            {webSpecials.length > 0 ?
                <div className="gallery--information"><p>{webSpecials[0].description}</p></div> : <></>
            }

            <div className="gallery-hero-two-columns">
                {showOnlyHeroImage ?
                    <div className="gallery-hero-one">

                        <img src={assetUrlFrom(heroImage.id, propertyId)}
                             alt={heroImage.name}
                             key={heroImage.id}
                             className="gallery-hero--image"
                             onClick={() => imageClickedHandler(heroImage)}
                        />
                    </div> :
                    <>
                        <div className="gallery-hero-column-one">

                            <img src={assetUrlFrom(heroImage.id, propertyId)}
                                 alt={heroImage.name}
                                 key={heroImage.id}
                                 className="gallery-hero--image"
                                 onClick={() => imageClickedHandler(heroImage)}
                            />
                        </div>

                        <div className="gallery-hero-column-two">
                            {virtualTourImageBackground ? <HeroImageCard backgroundImage={virtualTourImageBackground}
                                                                         onClick={() => {
                                                                             setCurrentView("Virtual Tour");
                                                                         }}>
                                {cardImageIcon("Virtual Tour")}
                            </HeroImageCard> : ""}
                            {videoTourImageBackground ? <HeroImageCard backgroundImage={videoTourImageBackground}
                                                                       onClick={() => {
                                                                           setCurrentView("Video Tour");
                                                                       }}>
                                {cardImageIcon("Video Tour")}
                            </HeroImageCard> : ""}

                            <MapSection
                                src={floorplanAddressToGoogleMap(floorplanAddress)}/>
                            {

                                assets.map((asset) =>
                                    <img src={assetUrlFrom(asset.id, propertyId)}
                                         alt={asset.name}
                                         key={asset.id}
                                         className="gallery-hero--image"
                                         onClick={() => imageClickedHandler(asset)}
                                    />
                                )
                            }
                        </div>
                    </>
                }

            </div>
        </div>
    )
}

export interface GridGalleryCoverProps {
    assets: Asset[];
    heroImage: Asset;
    floorplanAddress: FloorplanAddress;
    isAvailableNow: boolean;
    videoTourImageBackground?: string;
    virtualTourImageBackground?: string;
    propertyId: string;
    webSpecials: WebSpecial[];
    imageClickedHandler: (image: Asset) => void;
    setCurrentView: (view: "photo" | TourType) => void;
    showOnlyHeroImage?: boolean;

}

export type TourType = "Virtual Tour" | "Video Tour";
