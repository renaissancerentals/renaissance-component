import React from 'react';
import './assets/Map.css';
import {MAP_PROVIDER} from "../utils/Utils";

export const MapSection: React.FC<MapSectionProps> = ({src, href}) => {
    const image = <img alt="map"
                        src={src}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                   />;
    return (
        <section className="section-map">
            {MAP_PROVIDER === "google" ?
                <iframe title="map"
                        src={src}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                /> :
                href ?
                    <a href={href} target="_blank" rel="noreferrer" aria-label="Open map in a new tab">{image}</a> :
                    image
            }
        </section>
    );
}

export interface MapSectionProps {
    src: string;
    // Opens the live interactive map in a new tab when the static image is clicked (MapQuest images can't be panned/zoomed in place).
    href?: string;
}
