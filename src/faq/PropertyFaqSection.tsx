import React, {useEffect, useState} from "react";
import {Faq} from "./data/Faq";
import {getPropertyFaqs} from "../property/service/PropertyService";
import {PropertyId} from "../property/data/Property";
import {FaqsSection} from "./FaqsSection";
import "./assets/PropertyFaqSection.scss"

export const PropertyFaqSection: React.FC<PropertyFaqSectionProps> = ({propertyId}) => {
    const [propertyFaqs, setPropertyFaqs] = useState<Faq[]>([]);

    useEffect(() => {
        getPropertyFaqs(propertyId)
            .then(data => {
                setPropertyFaqs(data.sort((a, b) => a.sortOrder - b.sortOrder));
            });
    }, []);
    return (
        <section className="property-faq-section">
            <div className="container">
                <FaqsSection faqs={propertyFaqs}/>
            </div>
        </section>
    );
}

export interface PropertyFaqSectionProps {
    propertyId: PropertyId;
}
