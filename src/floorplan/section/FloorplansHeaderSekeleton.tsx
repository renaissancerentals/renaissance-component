import React from "react";
import "./assets/FloorplansHeader.scss";
import "../filter/assets/FloorplanDropDown.scss";
import Skeleton from "react-loading-skeleton";

export const FloorplansHeaderSkeleton: React.FC<FloorplansHeaderSkeletonProps> = ({isCondensed}) => {

    return (
        <header className="units-header">
            <div className={isCondensed ? "" : "container"}>
                <h2><Skeleton/></h2>
                <div className="units-filters">
                    <div className="filter-group">
                        <div className="filters">
                            <Skeleton/>
                            <Skeleton/>
                            <Skeleton/>
                            <Skeleton/>
                        </div>
                    </div>
                    <div className="filter-group">
                        <Skeleton/>
                    </div>
                </div>
            </div>
        </header>
    );
}

export interface FloorplansHeaderSkeletonProps {
    isCondensed?: boolean;
}