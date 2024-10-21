import React from "react";
import "./assets/HomePageSpecialCard.scss";
import {HomePageSpecial} from "./data/HomePageSpecial";
import {AllPropertyId} from "../property/data/Property";
import {getAssetUrl} from "../asset/service/AssetService";

export const HomePageSpecialCard: React.FC<HomePageSpecialCardProps> = ({homePageSpecial, propertyId}) => {
    return (
        <section className="special-card">
            <h2>{homePageSpecial.title}</h2>
            <div className="special-card-body">
                <div className="body-left">
                    <p>{homePageSpecial.description}</p>
                    <ul>
                        {homePageSpecial.information1 ? <li>{homePageSpecial.information1}</li> : ""}
                        {homePageSpecial.information2 ? <li>{homePageSpecial.information2}</li> : ""}
                        {homePageSpecial.information3 ? <li>{homePageSpecial.information3}</li> : ""}
                    </ul>
                </div>
                <div className="body-right">
                    <img src={getAssetUrl(homePageSpecial.image, propertyId)} alt="special image"/>
                </div>
            </div>
        </section>
    )
}

export interface HomePageSpecialCardProps {
    homePageSpecial: HomePageSpecial;
    propertyId: AllPropertyId;
}
