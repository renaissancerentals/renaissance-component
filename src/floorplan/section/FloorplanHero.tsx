import React, {useEffect, useState} from "react";
import "./assets/FloorplanHero.scss";
import {Button, Icon, ItemSlider, ShareButton} from "@contentmunch/muncher-ui";
import {Asset} from "../../asset/data/Asset";
import {getAssetsFrom} from "../../asset/service/AssetService";
import {GalleryHeroSkeleton} from "../../gallery/GalleryHeroSkeleton";
import {GalleryHeroMain} from "../../gallery/GalleryHeroMain";
import {extractIdFrom, rangeFrom} from "../../utils/Utils";
import {Floorplan} from "../data/Floorplan";
import {AssetModal} from "../../asset/AssetModal";
import {isFloorplanAvailable} from "../service/FloorplanService";
import {VideoTours} from "../../gallery/VideoTours";
import {VirtualTour} from "../../gallery/VirtualTour";
import {GalleryModal} from "../../gallery/GalleryModal";
import {GalleryHeroMobile} from "../../gallery/GalleryHeroMobile";
import {HeroBadgeStats} from "./HeroBadgeStats";

export const FloorplanHero: React.FC<FloorplanProps> = (
    {floorplan, contactClickHandler, applyClickHandler, handleRefToMap}) => {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [isAssetsLoading, setIsAssetsLoading] = useState(true);
    const [videoTours, setVideoTours] = useState<string[]>([]);
    const [virtualTour, setVirtualTour] = useState<string | undefined>(undefined);
    const [showFloorplanModal, setShowFloorplanModal] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [toursCount, setToursCount] = useState(0);
    const [currentView, setCurrentView] = useState<"photo" | "virtual tour" | "video tour">("photo");
    const [assetInFocus, setAssetInFocus] = useState<Asset>({} as Asset);
    const [assetIndex, setAssetIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const imageClickedHandler = (image: Asset) => {
        setShowModal(true);
        setAssetInFocus(image);
        setAssetIndex(assets.findIndex(value => value.id === image.id));
    };
    const modalCloseHandler = () => {
        setShowModal(false);
        setAssetInFocus({} as Asset);
    };
    useEffect(() => {
        if (floorplan.virtualTourLink)
            setVirtualTour(floorplan.virtualTourLink);
        const tourLinks = [];
        if (floorplan.videoTourLink)
            tourLinks.push(floorplan.videoTourLink);
        if (floorplan.threeSixtyVideoTourLink)
            tourLinks.push(floorplan.threeSixtyVideoTourLink);
        setVideoTours(tourLinks);

        let count = (tourLinks.length > 0 ? 1 : 0) + (floorplan.virtualTourLink ? 1 : 0);
        setToursCount(count);
        const currentAssets: Asset[] = [];
        currentAssets.push({id: extractIdFrom(floorplan.coverImage), name: "cover image"} as Asset);

        if (floorplan.photosFolderId) {
            getAssetsFrom(floorplan.photosFolderId).then(galleryAssets => {
                currentAssets.push(...galleryAssets);

                let total = 0;
                let totalToShow = currentAssets.length + count;

                if (totalToShow > 5) {
                    setTotalPages(Math.trunc(total + ((totalToShow - 5) / 8) + 1));
                }

            }).finally(() => {
                setAssets(currentAssets);
                setIsAssetsLoading(false);
            });
        } else {
            setAssets(currentAssets);
            setIsAssetsLoading(false);
        }

    }, [floorplan])

    const assetsToShow = (i: number) => {

        if (i === 0)
            return assets.slice(0, assets.length >= (5 - toursCount) ? 5 - toursCount : assets.length);
        else {
            let prevCount = i * 8 + (i - 1) - (8 - toursCount - 1);
            return assets.slice(prevCount, prevCount + 8);
        }

    };

    return (
        <section className="section-floorplan--hero">
            {isAssetsLoading ? <GalleryHeroSkeleton/> :
                <>
                    <div className="gallery-hero">
                        <GalleryModal assets={assets} assetInFocus={assetInFocus}
                                      setAssetInFocus={setAssetInFocus} showModal={showModal}
                                      assetIndex={assetIndex} setAssetIndex={setAssetIndex}
                                      modalCloseHandler={modalCloseHandler} propertyId={floorplan.property.id}/>
                        {currentView === "photo" ?
                            <>
                                <div className="photo-view main">
                                    <ItemSlider
                                        sliderItems={[...Array(totalPages)].map((x, i) =>
                                            <GalleryHeroMain isAvailableNow={isFloorplanAvailable(floorplan)}
                                                             virtualTour={virtualTour} isFirst={i === 0}
                                                             toursCount={toursCount}
                                                             setCurrentView={setCurrentView}
                                                             imageClickedHandler={imageClickedHandler}
                                                             assetsToShow={assetsToShow(i)}
                                                             propertyId={floorplan.property.id}/>
                                        )}/>
                                </div>
                                <div className="photo-view mobile">
                                    <GalleryHeroMobile assets={assets} toursCount={toursCount}
                                                       virtualTour={virtualTour}
                                                       setCurrentView={setCurrentView}
                                                       imageClickedHandler={imageClickedHandler}
                                                       propertyId={floorplan.property.id}/>
                                </div>
                            </> : ""
                        }

                        {currentView === "video tour" ? <VideoTours videoTourUrls={videoTours}/> : ""}
                        {currentView === "virtual tour" ? <VirtualTour virtualTourUrl={virtualTour}/> : ""}
                        <HeroBadgeStats currentView={currentView} setCurrentView={setCurrentView}
                                        totalAssets={assets?.length} videoTours={videoTours} virtualTour={virtualTour}/>

                    </div>
                </>

            }
            <AssetModal assetUrl={floorplan.photo} assetTitle="Floorplan image" showModal={showFloorplanModal}
                        setShowModal={setShowFloorplanModal} propertyId={floorplan.property.id}/>
            <div className="container">
                <div className="floorplan--two-columns">
                    <div className="floorplan-column-left">
                        <h3>{floorplan.name}</h3>
                        {floorplan.units.length > 0 ? <>
                            <h4>${rangeFrom(floorplan.units, "rent")}/mo</h4>
                            <p className="floorplan--description">{floorplan.units[0]?.address}, {floorplan.units[0]?.zipcode}</p>

                        </> : ""}

                        <div className="floorplan--featured">
                            <Button size="small" onClick={() => setShowFloorplanModal(true)}><Icon name="max"
                                                                                                   orientation="right">View
                                Floorplan</Icon> </Button>|&nbsp;&nbsp;<Button size="small"
                                                                               onClick={() => handleRefToMap()}><Icon
                            orientation="right"
                            name="map">View
                            on Map</Icon> </Button>
                            {floorplan.property.busRoutes.length > 0 ?
                                <p>Bus Routes:&nbsp;

                                    {floorplan.property.busRoutes.map((busRoute, index) =>
                                        <span key={"bus-route-" + index}>
                                            <a href={busRoute.busRouteLink} target="_blank">{busRoute.busRoute}</a>
                                            {index < floorplan.property.busRoutes.length - 1 ? ", " : ""}
                                        </span>
                                    )}
                                </p>
                                : ""}
                        </div>

                    </div>
                    <div className="main">
                        <div className=" floorplan-column-right">
                            <Button variant="primary" size="medium" onClick={contactClickHandler}>contact us</Button>
                            <Button variant="tertiary" size="medium" onClick={applyClickHandler}>apply</Button>
                            <ShareButton title="Check out this apartment" size="large"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export interface FloorplanProps {
    floorplan: Floorplan;
    contactClickHandler: () => void;
    applyClickHandler: () => void;
    handleRefToMap: () => void;
}