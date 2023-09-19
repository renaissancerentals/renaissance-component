import React from "react";
import "./assets/FloorplanCard.scss";
import Skeleton from "react-loading-skeleton";

export const FloorplanCardSkeleton: React.FC = () => {
    return (

        <div className="floorplan-card">
            <Skeleton height={250}/>
            <div className="floorplan-card-footer">
                <Skeleton height={50} />
            </div>
        </div>
    );
};
