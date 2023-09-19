import React from "react";
import './assets/GalleryHero.scss';
import Skeleton from "react-loading-skeleton";

export const GalleryHeroSkeleton: React.FC = () => {

    return (
        <div className="div-gallery">

            <div className="gallery-hero">

                <Skeleton/>

            </div>

        </div>
    );
};
