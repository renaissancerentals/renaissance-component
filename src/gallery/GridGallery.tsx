import React from "react";
import {Asset} from "../../lib";
import {assetUrlFrom} from "../asset/service/AssetService";
import './assets/GridGallery.scss';

export const GridGallery: React.FC<GridGalleryProps> = (
    {
        assets,
        propertyId,
        imageClickedHandler,
    }) =>

    <div className="grid-gallery">

        <div className="gallery-hero-two-columns">

            <div className="gallery-hero-column">
                {
                    assets.map((asset) =>
                        <img src={assetUrlFrom(asset.id, propertyId)}
                             alt={asset.name}
                             key={asset.id}
                             className={assets.length > 3 ? "gallery-hero--image" : "gallery-hero--image-fixed"}
                             onClick={() => imageClickedHandler(asset)}
                        />
                    )
                }
            </div>

        </div>
    </div>


export interface GridGalleryProps {
    assets: Asset[];
    propertyId: string;
    imageClickedHandler: (image: Asset) => void;
}
