import React, {useEffect, useState} from "react";
import "../../floorplan/section/assets/FloorplanHero.scss";
import {Button, Icon, ItemSlider, ShareButton} from "@contentmunch/muncher-ui";
import {Asset} from "../../asset/data/Asset";
import {assetUrlFrom, getAssetsFrom} from "../../asset/service/AssetService";
import {GridGallerySkeleton} from "../../gallery/GridGallerySkeleton";
import {extractIdFrom} from "../../utils/Utils";
import {AssetModal} from "../../asset/AssetModal";
import {VideoTours} from "../../gallery/VideoTours";
import {VirtualTour} from "../../gallery/VirtualTour";
import {GalleryModal} from "../../gallery/GalleryModal";
import {GridGalleryMobile} from "../../gallery/GridGalleryMobile";
import {GridGalleryCover, TourType} from "../../gallery/GridGalleryCover";
import {GridGallery} from "../../gallery/GridGallery";
import {UnitFloorplan} from "../data/Unit";
import {addressFromUnit, isUnitAvailable} from "../service/UnitService";
import {HeroBadgeStats} from "../../floorplan/section/HeroBadgeStats";
import {WebSpecial} from "../../floorplan/data/Floorplan";
import {UnitPrice} from "./UnitPrice";

export const UnitHero: React.FC<UnitHeroProps> = (
    {unit, contactClickHandler, applyClickHandler, handleRefToMap, webSpecials}) => {
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
        if (unit.coverImage)
            images.push({id: extractIdFrom(unit.coverImage), name: "cover image"} as Asset);
        else if (unit.floorplan.coverImage)
            images.push({id: extractIdFrom(unit.floorplan.coverImage), name: "cover image"} as Asset);


        let firstPageCount = firstPageImageCount;

        if (unit.photosFolderId) {
            getAssetsFrom(unit.photosFolderId).then(galleryAssets => {

                images.push(...galleryAssets);

                if (images.length > 1) {
                    const backgroundImageUrl = assetUrlFrom(images[1].id, unit.floorplan.property.id);
                    if (unit.virtualTourLink) {
                        setVirtualTour(unit.virtualTourLink);
                        setVirtualTourImageBackground(backgroundImageUrl);
                        firstPageCount -= 1;
                    }

                    const tourLinks = [];
                    if (unit.videoTourLink)
                        tourLinks.push(unit.videoTourLink);
                    if (unit.threeSixtyVideoTourLink)
                        tourLinks.push(unit.threeSixtyVideoTourLink);
                    setVideoTours(tourLinks);
                    if (tourLinks.length > 0) {
                        setVideoTourImageBackground(backgroundImageUrl);
                        firstPageCount -= 1;
                    }

                    let otherAssetCounts = (tourLinks.length > 0 ? 1 : 0) + (unit.virtualTourLink ? 1 : 0);
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

    }, [unit])


    const printUnitAddress = () => {
        const address = addressFromUnit(unit);

        let printAddress = "";
        if (address.address) {
            printAddress += address.address + ", ";
        }
        printAddress += address.city + ", " + address.state + " " + address.zipcode;
        return printAddress;
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
        <section className="section-floorplan--hero">
            {isAssetsLoading ? <GridGallerySkeleton/> :
                <>
                    <div className="gallery-hero">
                        <GalleryModal assets={assets} assetInFocus={assetInFocus}
                                      setAssetInFocus={setAssetInFocus} showModal={showModal}
                                      assetIndex={assetIndex} setAssetIndex={setAssetIndex}
                                      modalCloseHandler={modalCloseHandler} propertyId={unit.floorplan.property.id}/>
                        {currentView === "photo" ?
                            <>
                                <div className="photo-view main">
                                    <ItemSlider
                                        sliderItems={[...Array(totalPages)].map((x, i) =>
                                            (i == 0) ?
                                                <GridGalleryCover
                                                    assets={assetsToShow(i)}
                                                    address={addressFromUnit(unit)}
                                                    propertyId={unit.floorplan.property.id}
                                                    heroImage={assets[0]}
                                                    imageClickedHandler={imageClickedHandler}
                                                    webSpecials={webSpecials}
                                                    isAvailableNow={isUnitAvailable(unit)}
                                                    setCurrentView={setCurrentView}
                                                    videoTourImageBackground={videoTourImageBackground}
                                                    virtualTourImageBackground={virtualTourImageBackground}
                                                    showOnlyHeroImage={assets.length === 1}
                                                />
                                                :
                                                <GridGallery
                                                    imageClickedHandler={imageClickedHandler}
                                                    propertyId={unit.floorplan.property.id}
                                                    assets={assetsToShow(i)}
                                                />
                                        )}/>
                                </div>
                                <div className="photo-view mobile">
                                    <GridGalleryMobile assets={assets} toursCount={toursCount}
                                                       address={addressFromUnit(unit)}
                                                       virtualTour={virtualTour}
                                                       setCurrentView={setCurrentView}
                                                       imageClickedHandler={imageClickedHandler}
                                                       webSpecials={webSpecials}
                                                       isAvailableNow={isUnitAvailable(unit)}
                                                       propertyId={unit.floorplan.property.id}/>
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
            <AssetModal assetUrl={unit.floorplanImage ? unit.floorplanImage : unit.floorplan.photo}
                        assetTitle="Floorplan image" showModal={showFloorplanModal}
                        setShowModal={setShowFloorplanModal} propertyId={unit.floorplan.property.id}/>
            <div className="container">
                <div className="floorplan--two-columns">
                    <div className="floorplan-column-left">
                        <h3>{unit.floorplan.name}</h3>
                        <h4><UnitPrice unit={unit} invertColor={true}/></h4>
                        <p className="floorplan--description">{printUnitAddress()}</p>

                        <div className="floorplan--featured">
                            <Button size="small" onClick={() => setShowFloorplanModal(true)}>
                                <Icon name="max" orientation="right">ViewFloorplan</Icon>
                            </Button>
                            |&nbsp;&nbsp;
                            <Button size="small" onClick={() => handleRefToMap()}>
                                <Icon orientation="right" name="map">View on Map</Icon>
                            </Button>
                            {unit.floorplan.property.busRoutes.length > 0 ?
                                <p>Bus Routes:&nbsp;
                                    {unit.floorplan.property.busRoutes.map((busRoute, index) =>
                                        <span key={"bus-route-" + index}>
                                            <a href={busRoute.busRouteLink} target="_blank"
                                               rel="noreferrer">{busRoute.busRoute}</a>
                                            {index < unit.floorplan.property.busRoutes.length - 1 ? ", " : ""}
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

export interface UnitHeroProps {
    unit: UnitFloorplan;
    webSpecials: WebSpecial[];
    contactClickHandler: () => void;
    applyClickHandler: () => void;
    handleRefToMap: () => void;
}
