import React from "react";
import {youtubeUrlToEmbedUrl} from "../utils/Utils";

export const VideoTours: React.FC<VideoToursProps> = ({videoTourUrls}) => {
    return (
        <div className="video-tour-view">
            {videoTourUrls.length === 1 ?
                <div className="single-video-layout">
                    <iframe src={youtubeUrlToEmbedUrl(videoTourUrls[0])}
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen/>
                </div> :
                <>
                    <div className="mobile">
                        <div className="single-video-layout">
                            <iframe src={youtubeUrlToEmbedUrl(videoTourUrls[0])}
                                    title="YouTube video player" frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen/>
                        </div>
                    </div>
                    <div className="main">
                        <div className="two-video-layout">
                            <iframe src={youtubeUrlToEmbedUrl(videoTourUrls[0])}
                                    title="YouTube video player" frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen/>
                            <iframe src={youtubeUrlToEmbedUrl(videoTourUrls[1])}
                                    title="YouTube video player" frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen/>

                        </div>
                    </div>
                </>
            }

        </div>
    );
};

export interface VideoToursProps {
    videoTourUrls: string[];
}
