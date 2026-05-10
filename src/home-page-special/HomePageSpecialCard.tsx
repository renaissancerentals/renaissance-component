import React from "react";
import "./assets/HomePageSpecialCard.scss";
import {HomePageSpecial} from "./data/HomePageSpecial";
import {getAssetUrl} from "../asset/service/AssetService";

export const HomePageSpecialCard: React.FC<HomePageSpecialCardProps> = ({homePageSpecial, propertyId}) => {
    const regions = homePageSpecial.links ?? [];

    return (
        <section className="special-card">
            <div className="special-card--image-wrapper">
                <img
                    src={getAssetUrl(homePageSpecial.image, propertyId)}
                    alt={homePageSpecial.description}
                />
                {regions.filter(r => r.url).map((region, i) => (
                    <a
                        key={`region-${i}`}
                        className="special-card--region"
                        href={region.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            left: `${region.x}%`,
                            top: `${region.y}%`,
                            width: `${region.width}%`,
                            height: `${region.height}%`,
                        }}
                    />
                ))}
            </div>
        </section>
    );
};

export interface HomePageSpecialCardProps {
    homePageSpecial: HomePageSpecial;
    propertyId: string;
}
