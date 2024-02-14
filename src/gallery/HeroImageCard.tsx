import React from 'react';
import './assets/HeroImageCard.scss';

export const HeroImageCard: React.FC<HeroImageCardProps> = (
    {backgroundImage, onClick, isForMobile, children}) => {
    return (
        <div
            className={isForMobile ? "gallery-hero-mobile--image hero-image-card" : "gallery-hero--image hero-image-card"}
            onClick={onClick}>
            <img className="hero-image" src={backgroundImage} alt="hero card"/>
            <div className="hero-image-info">
                <div className="hero-image--content">
                    {children}
                </div>
            </div>
        </div>
    );
}

export interface HeroImageCardProps {
    backgroundImage: string;
    isForMobile?: boolean;
    onClick: () => void;
    children?:any;
}
