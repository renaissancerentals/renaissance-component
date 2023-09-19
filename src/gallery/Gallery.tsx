import React, {useState} from 'react';
import './assets/Gallery.scss';
import {Icon, Modal, Spinner} from "@contentmunch/muncher-ui";
import {ImageCard} from "./ImageCard";
import {ImageCardSkeleton} from "./ImageCardSkeleton";
import {assetUrlFrom} from "../asset/service/AssetService";
import {Asset} from "../asset/data/Asset";

export const Gallery: React.FC<GalleryProps> = ({type, images, isLoading, showName, allImages, propertyId}) => {
    const [showModal, setShowModal] = useState(false);
    const [imageInFocus, setImageInFocus] = useState<Asset>({} as Asset);
    const [imageIndex, setImageIndex] = useState(-1);

    const [sliderImageLoaded, setSliderImageLoaded] = useState(false);


    const rightClickHandler = () => {
        setSliderImageLoaded(false);
        let currentIndex = imageIndex + 1;
        currentIndex = allImages ? (currentIndex >= allImages.length ? 0 : currentIndex) : (currentIndex >= images.length ? 0 : currentIndex);
        setImageIndex(currentIndex);
        setImageInFocus(allImages ? allImages[currentIndex] : images[currentIndex]);
    };
    const leftClickHandler = () => {
        setSliderImageLoaded(false);
        let currentIndex = imageIndex - 1;
        currentIndex = allImages ? (currentIndex < 0 ? allImages.length - 1 : currentIndex) : (currentIndex < 0 ? images.length - 1 : currentIndex);
        setImageIndex(currentIndex);
        setImageInFocus(allImages ? allImages[currentIndex] : images[currentIndex]);

    };
    const imageClickedHandler = (image: Asset, index: number) => {
        setShowModal(true);
        setImageInFocus(image);
        setImageIndex(index);
    };
    const modalCloseHandler = () => {
        setShowModal(false);
        setImageInFocus({} as Asset);
    };
    const imageLoaded = () => {
        setSliderImageLoaded(true);
    };
    return (
        <div className="div-gallery">
            <Modal show={showModal} setShow={modalCloseHandler}>
                <div className="image-slider">
                    <div className="close" onClick={modalCloseHandler}>
                        <Icon name="close" size="large"/>
                    </div>
                    <div className="left" onClick={leftClickHandler}>
                        <Icon name="arrow-left" size="large"/>
                    </div>

                    {
                        sliderImageLoaded ? "" : <Spinner/>
                    }
                    <img src={assetUrlFrom(imageInFocus.id, propertyId)} alt={imageInFocus.name} onLoad={imageLoaded}/>
                    {showName ? <p>{imageInFocus.name}</p> : ""}
                    <div className="right" onClick={rightClickHandler}>
                        <Icon name="arrow-right" size="large"/>
                    </div>
                </div>
            </Modal>
            {"grid" === type ?
                <div className="gallery--grid">
                    {isLoading ?
                        [...Array(20)].map((_, i) => (
                            <ImageCardSkeleton key={i} width={150} height={200}/>
                        )) :
                        images.map((image, index) => (
                            <ImageCard key={index} image={image} onClick={() => imageClickedHandler(image, index)}
                                       propertyId={propertyId}/>
                        ))
                    }
                </div> :
                <div className="gallery">
                    <figure>
                        {isLoading ?
                            [...Array(6)].map((_, i) => (
                                <span className="gallery--image" key={i}>
                                    <ImageCardSkeleton width={300} height={200}/>
                                </span>
                            )) :
                            images.map((image, index) => (
                                <img src={assetUrlFrom(image.id, propertyId)}
                                     alt={image.name}
                                     key={image.name}
                                     className="gallery--image"
                                     onClick={() => imageClickedHandler(image, index)}
                                />
                            ))
                        }
                    </figure>
                </div>
            }
        </div>
    );
}
export type GalleryType = "grid" | "simple";

export interface GalleryProps {
    type?: GalleryType;
    images: Asset[];
    allImages?: Asset[];
    isLoading: boolean;
    showName?: boolean;
    propertyId: string;
}

Gallery.defaultProps = {
    type: "simple",
    isLoading: false,
    showName: true
};
