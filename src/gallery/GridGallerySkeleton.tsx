import React from "react";
import './assets/GridGallery.scss';
import Skeleton from "react-loading-skeleton";

export const GridGallerySkeleton: React.FC = () => {

    return (
        <div className="grid-gallery">

            <div className="gallery-hero-one">

                <Skeleton/>

            </div>

        </div>
    );
};
