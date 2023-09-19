import React from 'react';
import './assets/ImageCard.scss';
import {assetUrlFrom} from "../asset/service/AssetService";
import {Asset} from "../asset/data/Asset";

export const ImageCard: React.FC<ImageCardProps> = ({image, onClick, propertyId}) => {
    return (
        <div className="image-card" onClick={onClick}>
            <img src={assetUrlFrom(image.id, propertyId)} alt={image.name}/>
            <div className="image-card--footer">
                <p>{image.name}</p>
            </div>
        </div>
    );
}

export interface ImageCardProps {
    image: Asset;
    onClick: () => void;
    propertyId: string;
}