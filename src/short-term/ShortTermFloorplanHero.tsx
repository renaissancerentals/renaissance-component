import React, {useEffect, useState} from "react";
import "./assets/ShortTermFloorplanHero.scss";
import {Button, Icon, ItemSlider, ShareButton} from "@contentmunch/muncher-ui";
import {FloorplanShortTerm} from "./data/ShortTerm";
import {Asset} from "../asset/data/Asset";
import {extractIdFrom} from "../utils/Utils";
import {assetUrlFrom, getAssetsFrom} from "../asset/service/AssetService";
import {WebSpecial} from "../floorplan/data/Floorplan";
import {renaissance} from "../data/RenaissanceData";
import {GridGallerySkeleton} from "../gallery/GridGallerySkeleton";
import {GalleryModal} from "../gallery/GalleryModal";
import {GridGalleryMobile} from "../gallery/GridGalleryMobile";
import {VideoTours} from "../gallery/VideoTours";
import {VirtualTour} from "../gallery/VirtualTour";
import {HeroBadgeStats} from "../floorplan/section/HeroBadgeStats";
import {AssetModal} from "../asset/AssetModal";
import {GridGalleryCover, TourType} from "../gallery/GridGalleryCover";
import {GridGallery} from "../gallery/GridGallery";

export const ShortTermFloorplanHero: React.FC<ShortTermFloorplanHeroProps> = (
    {floorplan, contactClickHandler, applyClickHandler, handleRefToMap, webSpecials}) => {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [isAssetsLoading, setIsAssetsLoading] = useState(true);
    const [videoTours, setVideoTours] = useState<string[]>([]);
    const [virtualTour, setVirtualTour] = useState<string | undefined>(undefined);

    const [videoTourImageBackground, setVideoTourImageBackground] = useState<string>();
    const [virtualTourImageBackground, setVirtualTourImageBackground] = useState<string>();

    const [showFloorplanModal, setShowFloorplanModal] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [toursCount, setToursCount] = useState(1);
    const [currentView, setCurrentView] = useState<"photo" | TourType>("photo");
    const [assetInFocus, setAssetInFocus] = useState<Asset>({} as Asset);
    const [assetIndex, setAssetIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [firstPageImageCount, setFirstPageImageCount] = useState(4);

    const GRID_SIZE = 8;
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
        const images: Asset[] = [];
        images.push({id: extractIdFrom(floorplan.coverImage), name: "cover image"} as Asset);

        let firstPageCount = firstPageImageCount;

        if (floorplan.photosFolderId) {
            getAssetsFrom(floorplan.photosFolderId).then(galleryAssets => {

                images.push(...galleryAssets);

                if (images.length > 1) {
                    const backgroundImageUrl = assetUrlFrom(images[1].id, floorplan.property.id);
                    if (floorplan.virtualTourLink) {
                        setVirtualTour(floorplan.virtualTourLink);
                        setVirtualTourImageBackground(backgroundImageUrl);
                        firstPageCount -= 1;
                    }

                    const tourLinks = [];
                    if (floorplan.videoTourLink)
                        tourLinks.push(floorplan.videoTourLink);
                    if (floorplan.threeSixtyVideoTourLink)
                        tourLinks.push(floorplan.threeSixtyVideoTourLink);
                    setVideoTours(tourLinks);
                    if (tourLinks.length > 0) {
                        setVideoTourImageBackground(backgroundImageUrl);
                        firstPageCount -= 1;
                    }

                    let otherAssetCounts = (tourLinks.length > 0 ? 1 : 0) + (floorplan.virtualTourLink ? 1 : 0);
                    setToursCount(otherAssetCounts);

                }

            }).finally(() => {

                let pages = 1;

                if (images.length > firstPageCount) {
                    const remaining = images.length - firstPageCount;
                    pages += remaining / 8;
                    if (remaining % 8 > 0)
                        pages += 1;
                }

                setTotalPages(Math.trunc(pages));
                setFirstPageImageCount(firstPageCount);
                setAssets(images);
                setIsAssetsLoading(false);
            });
        } else {
            setAssets(images);
            setIsAssetsLoading(false);
        }

    }, [floorplan,firstPageImageCount])


    const printFloorplanAddress = () => {

        return floorplan.address + ", " + renaissance.city + ", " + renaissance.state + " " + floorplan.zipcode;
    }
    const isFirstSliderPage = (slideIndex: number) => slideIndex === 0;

    const assetsToShow = (slideIndex: number) => {

        if (isFirstSliderPage(slideIndex)) {
            console.log("firstPageImageCount", firstPageImageCount);
            return assets.slice(0, firstPageImageCount - 1);
        }


        const startIndex = firstPageImageCount - 1 + (GRID_SIZE * (slideIndex - 1))
        const endIndex = firstPageImageCount - 1 + (GRID_SIZE * slideIndex)

        return assets.slice(startIndex, endIndex > assets.length ? assets.length : endIndex);
    };
    return (
        <section className="section-short-term-floorplan--hero">
            {isAssetsLoading ? <GridGallerySkeleton/> :
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
                                            (i === 0) ? <GridGalleryCover
                                                    assets={assetsToShow(i)}
                                                    floorplanAddress={{
                                                        address: floorplan.address,
                                                        city: renaissance.city,
                                                        state: renaissance.state,
                                                        zipcode: floorplan.zipcode
                                                    }}
                                                    propertyId={floorplan.property.id}
                                                    heroImage={assets[0]}
                                                    imageClickedHandler={imageClickedHandler}
                                                    webSpecials={webSpecials}
                                                    isAvailableNow={false}
                                                    setCurrentView={setCurrentView}
                                                    videoTourImageBackground={videoTourImageBackground}
                                                    virtualTourImageBackground={virtualTourImageBackground}
                                                    showOnlyHeroImage={assets.length === 1}
                                                /> :
                                                <GridGallery
                                                    imageClickedHandler={imageClickedHandler}
                                                    propertyId={floorplan.property.id}
                                                    assets={assetsToShow(i)}
                                                />
                                        )}/>
                                </div>
                                <div className="photo-view mobile">
                                    <GridGalleryMobile assets={assets} toursCount={toursCount}
                                                       floorplanAddress={{
                                                           address: floorplan.address,
                                                           city: renaissance.city,
                                                           state: renaissance.state,
                                                           zipcode: floorplan.zipcode
                                                       }}
                                                       virtualTour={virtualTour}
                                                       setCurrentView={setCurrentView}
                                                       imageClickedHandler={imageClickedHandler}
                                                       webSpecials={webSpecials}
                                                       isAvailableNow={false}
                                                       propertyId={floorplan.property.id}/>
                                </div>
                            </> : ""
                        }

                        {currentView === "Video Tour" ? <VideoTours videoTourUrls={videoTours}/> : ""}
                        {currentView === "Virtual Tour" ? <VirtualTour virtualTourUrl={virtualTour}/> : ""}
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
                        <h4>${floorplan.shortTerm.priceFor4andMoreMonths} -
                            ${floorplan.shortTerm.priceFor5To13Days}/Day</h4>
                        <p className="floorplan--description">{printFloorplanAddress()}</p>

                        <div className="floorplan--featured">
                            <Button size="small" onClick={() => setShowFloorplanModal(true)}>
                                <Icon name="max" orientation="right">ViewFloorplan</Icon>
                            </Button>
                            |&nbsp;&nbsp;
                            <Button size="small" onClick={() => handleRefToMap()}>
                                <Icon orientation="right" name="map">View on Map</Icon>
                            </Button>
                            {floorplan.property.busRoutes.length > 0 ?
                                <p>Bus Routes:&nbsp;
                                    {floorplan.property.busRoutes.map((busRoute, index) =>
                                        <span key={"bus-route-" + index}>
                                            <a href={busRoute.busRouteLink} target="_blank"
                                               rel="noreferrer">{busRoute.busRoute}</a>
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

export interface ShortTermFloorplanHeroProps {
    floorplan: FloorplanShortTerm;
    webSpecials: WebSpecial[];
    contactClickHandler: () => void;
    applyClickHandler: () => void;
    handleRefToMap: () => void;
}
