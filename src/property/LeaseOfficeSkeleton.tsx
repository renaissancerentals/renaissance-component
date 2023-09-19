import React from "react";
import "./assets/PropertyLocationSkeleton.scss";
import Skeleton from "react-loading-skeleton";

export const LeaseOfficeSkeleton: React.FC = () => {
    return (
        <div className="lease-office">
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
        </div>
    );
};
