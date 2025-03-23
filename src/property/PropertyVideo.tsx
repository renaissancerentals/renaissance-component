import React from "react";
import {generatePropertyVideoUrl} from "./service/PropertyService";
import {Video} from "../video/Video";

export const PropertyVideo: React.FC<PropertyVideoProps> = (
    {
        coverVideo
    }) => {

    const videoUrl = generatePropertyVideoUrl(coverVideo)
    return (
        videoUrl ? <Video url={videoUrl}/> : <></>
    );
}

export interface PropertyVideoProps {
    coverVideo: string;
}
