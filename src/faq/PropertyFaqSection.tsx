import React, {useEffect, useState} from "react";
import {Faq} from "./data/Faq";
import {getPropertyFaqs} from "../property/service/PropertyService";
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
        propertyFaqs.length > 0 ?
            <section className="property-faq-section">
                <h4>Frequently Asked Questions</h4>
                <FaqsSection faqs={propertyFaqs}/>
            </section> : <></>
    );
}

export interface PropertyFaqSectionProps {
    propertyId: string;
}
