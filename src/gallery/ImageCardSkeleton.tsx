import React from 'react';
import './assets/ImageCard.css';
import Skeleton from "react-loading-skeleton";

export const ImageCardSkeleton: React.FC<ImageCardSkeletonProps> = ({width, height}) => {
    return (
        <Skeleton width={width} height={height}/>
    );
}

export interface ImageCardSkeletonProps {
    width: number;
    height: number;
}