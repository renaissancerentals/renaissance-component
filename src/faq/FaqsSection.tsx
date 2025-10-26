import React from "react";
import {Accordion, Fold} from "@contentmunch/muncher-ui";
import "./assets/FaqsSection.scss";
import {Faq} from "./data/Faq";

export const FaqsSection: React.FC<FaqsSectionProps> = (
    {faqs}) => {


    const generateFolds = (): Fold[] => {

        const folds: Fold[] = [];
        faqs.forEach(floorplanFaq => {
            folds.push({
                heading: floorplanFaq.question,
                body: <p>{floorplanFaq.answer}</p>
            })
        });
        return folds;
    }

    return (
        <div className="faqs-section">
            <Accordion variant="transparent" collapsed={true}>{{
                folds: generateFolds()
            }}</Accordion>

        </div>
    )
}

export interface FaqsSectionProps {
    faqs: Faq[];
}
