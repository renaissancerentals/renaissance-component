import React from "react";
import "./assets/FloorplansSection.scss";
import {FloorplansHeaderSkeleton} from "./FloorplansHeaderSekeleton";
import {FloorplanCardSkeleton} from "../card/FloorplanCardSkeleton";

export const FloorplanSectionSkeleton: React.FC<FloorplanSectionSkeletonProps> = (
    {
        isCondensed, skeletonCount
    }) => {
    return (
        <section className="section-floorplans">
            <div className={isCondensed ? "container" : ""}>
                <FloorplansHeaderSkeleton isCondensed={isCondensed}/>

                <div className={isCondensed ? "" : "container"}>
                    <div className="floorplans-body">
                        {
                            [...Array(skeletonCount)].map((_, i) => (<FloorplanCardSkeleton key={i}/>))
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export interface FloorplanSectionSkeletonProps {
    isCondensed?: boolean;
    skeletonCount?: number;
}

FloorplanSectionSkeleton.defaultProps = {
    isCondensed: true,
    skeletonCount: 8
}