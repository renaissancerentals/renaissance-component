import React from "react";
import "./assets/HomePageSpecialCard.scss";
import {HomePageSpecial} from "./data/HomePageSpecial";

export const HomePageSpecialCard: React.FC<HomePageSpecialCardProps> = ({special}) => {
    return (
        <section className="special-card">
            <h2>{special.title}</h2>
            <div className="special-card-body">
                <div className="body-left">
                    <p>{special.description}</p>
                    <ul>
                        {special.information1 ? <li>{special.information1}</li> : ""}
                        {special.information2 ? <li>{special.information2}</li> : ""}
                        {special.information3 ? <li>{special.information3}</li> : ""}
                    </ul>
                </div>
                <div className="body-right">
                    <img src={special.image} alt="special image"/>
                </div>
            </div>
        </section>
    )
}

export interface HomePageSpecialCardProps {
    special: HomePageSpecial
}
