import React, {useEffect, useState} from "react";
import {Gallery, GalleryType} from "./Gallery";
import {Button} from "@contentmunch/muncher-ui";
import "./assets/DriveGallery.scss";
import {getAssetsFrom} from "../asset/service/AssetService";
import {Asset} from "../asset/data/Asset";

export const DriveGallery: React.FC<DriveGalleryProps> = ({driveId, type, initialSize, showName, propertyId}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [images, setImages] = useState<Asset[]>([]);
    const [currentImages, setCurrentImages] = useState<Asset[]>([]);
    const [showButton, setShowButton] = useState<boolean>(true);

    useEffect(() => {
        if (driveId) {
            getAssetsFrom(driveId).then(galleryImages => {

                setImages(galleryImages);
                if (initialSize && initialSize < galleryImages.length) {
                    setCurrentImages(galleryImages.slice(0, initialSize));
                } else {
                    setCurrentImages(galleryImages);
                }

            }).catch(() => {
                console.log("Invalid driveId", driveId);
            }).finally(() => {
                setIsLoading(false);
            });
        } else {
            setIsLoading(false);
        }

    }, [driveId, initialSize]);

    const handleButtonClick = () => {
        setShowButton(false);
        setCurrentImages(images);
    };

    return (
        <div className="drive-gallery">
            <Gallery allImages={images} images={currentImages} isLoading={isLoading} type={type} showName={showName}
                     propertyId={propertyId}/>
            {showButton ? <Button variant={"secondary"} onClick={handleButtonClick}>More Pictures »</Button> : ""}
        </div>

    );
};

export interface DriveGalleryProps {
    driveId: string;
    type?: GalleryType;
    initialSize?: number;
    showName?: boolean;
    propertyId: string;
}

DriveGallery.defaultProps = {
    type: "simple",
    showName: true
}
