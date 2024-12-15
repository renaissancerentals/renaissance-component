import React from "react";
import "./assets/HomePageSpecialCard.scss";
import {HomePageSpecial} from "./data/HomePageSpecial";
import {getAssetUrl} from "../asset/service/AssetService";

export const HomePageSpecialCard: React.FC<HomePageSpecialCardProps> = ({homePageSpecial, propertyId}) => {
    return (
        <section className="special-card">
            <h2>{homePageSpecial.title}</h2>
            <div className="special-card-body">
                <div className="body-left">
                    <p className="special-card--description">{homePageSpecial.description}</p>
                    <div dangerouslySetInnerHTML={{__html: homePageSpecial.details}}/>
                </div>
                <div className="body-right">
                    <img src={getAssetUrl(homePageSpecial.image, propertyId)} alt="special"/>
                </div>
            </div>
        </section>
    )
}

export interface HomePageSpecialCardProps {
    homePageSpecial: HomePageSpecial;
    propertyId: string;
}
