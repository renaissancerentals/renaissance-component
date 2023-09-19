import React from 'react';
import './assets/Map.scss';

export const MapSection: React.FC<MapSectionProps> = ({src}) => {
    return (
        <section className="section-map">
            <iframe title="map"
                    src={src}
                    allowFullScreen
            />
        </section>
    );
}

export interface MapSectionProps {
    src: string;
}