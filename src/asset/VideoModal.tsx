import React from "react";
import {Icon, Modal} from "@contentmunch/muncher-ui";
import "./assets/VideoModal.scss";
import {youtubeUrlToEmbedUrl} from "../utils/Utils";
import {Video} from "./data/Asset";

export const VideoModal: React.FC<VideoModalProps> = (
    {video, showModal, setShowModal}) => {


    return (
        <>
            <div className="video-modal">
                <Modal show={showModal} setShow={() => setShowModal(false)}>
                    <div className="video">
                        <div className="close" onClick={() => setShowModal(false)}>
                            <Icon name="close" size="large"/>
                        </div>

                        {showModal ?
                            video.type === "video" ?
                                <iframe src={youtubeUrlToEmbedUrl(video.url)}
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen/> :
                                <iframe title="virtual tour" frameBorder="0"
                                        style={{border: 0}}
                                        src={video.url}
                                        allowFullScreen/>
                            : <></>
                        }
                    </div>
                </Modal>
            </div>

        </>
    );
};

export interface VideoModalProps {
    video: Video;
    showModal: boolean;
    setShowModal: (showModal: boolean) => void;
}