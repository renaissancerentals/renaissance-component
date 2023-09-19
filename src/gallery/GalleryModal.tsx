import React, {useState} from "react";
import {Icon, Modal, Spinner} from "@contentmunch/muncher-ui";
import {assetUrlFrom} from "../asset/service/AssetService";
import {Asset} from "../asset/data/Asset";
import "./assets/GalleryModal.scss";

export const GalleryModal: React.FC<GalleryModalProps> = (
    {assets, assetIndex, setAssetIndex, assetInFocus, setAssetInFocus, showModal, modalCloseHandler, propertyId}) => {


    const [sliderImageLoaded, setSliderImageLoaded] = useState(false);

    const rightClickHandler = () => {
        setSliderImageLoaded(false);
        let currentIndex = assetIndex + 1;
        currentIndex = currentIndex >= assets.length ? 0 : currentIndex;
        setAssetIndex(currentIndex);
        setAssetInFocus(assets[currentIndex]);
    };
    const leftClickHandler = () => {
        setSliderImageLoaded(false);
        let currentIndex = assetIndex - 1;
        currentIndex = currentIndex < 0 ? assets.length - 1 : currentIndex;
        setAssetIndex(currentIndex);
        setAssetInFocus(assets[currentIndex]);
    };


    const imageLoaded = () => {
        setSliderImageLoaded(true);
    };
    return (
        <div className="gallery-modal">
            <Modal show={showModal} setShow={modalCloseHandler}>
                <div className="image-slider">
                    <div className="close" onClick={modalCloseHandler}>
                        <Icon name="close" size="large"/>
                    </div>
                    {assets.length > 1 ?
                        <div className="left" onClick={leftClickHandler}>
                            <Icon name="arrow-left" size="large"/>
                        </div> : ""}

                    {
                        sliderImageLoaded ? "" : <Spinner/>
                    }
                    {showModal ?
                        <img src={assetUrlFrom(assetInFocus.id, propertyId)} alt={assetInFocus.name}
                             onLoad={imageLoaded}/> : <></>}

                    {assets.length > 1 ?
                        <div className="right" onClick={rightClickHandler}>
                            <Icon name="arrow-right" size="large"/>
                        </div> : ""}
                </div>
            </Modal>
        </div>
    );
};

export interface GalleryModalProps {
    assets: Asset[];
    assetInFocus: Asset;
    assetIndex: number;
    setAssetIndex: (index: number) => void;
    setAssetInFocus: (asset: Asset) => void;
    showModal: boolean;
    modalCloseHandler: () => void;
    propertyId: string;
}