import React, {useEffect, useState} from 'react';
import "./assets/HomePageSpecialModal.scss";
import {AllPropertyId} from "../property/data/Property";
import {getHomeHomePageSpecials} from "./service/HomePageSpecialService";
import {HomePageSpecial} from "./data/HomePageSpecial";
import {HomePageSpecialModal} from "./HomePageSpecialModal";

export const HomePageSpecialSection: React.FC<HomePageSpecialSectionProps> = (
    {
        propertyId
    }) => {

    const [homePageSpecials, setHomePageSpecials] = useState<HomePageSpecial[]>([]);

    useEffect(() => {
        getHomeHomePageSpecials(propertyId).then(data => {
            setHomePageSpecials(data);
        });
    }, [propertyId]);
    return (
        <section className="section-home-page-specials">
            <HomePageSpecialModal homePageSpecials={homePageSpecials} propertyId={propertyId}/>
        </section>
    )
};

export interface HomePageSpecialSectionProps {
    propertyId: AllPropertyId;
}
