import React from "react";
import "./assets/PropertyLocationSkeleton.css";
import Skeleton from "react-loading-skeleton";

export const PropertyLocationSkeleton: React.FC = () => {
    return (
        <div className="property-location">
            <Skeleton/>
            <Skeleton className="map-skeleton"/>
        </div>
    );
};
