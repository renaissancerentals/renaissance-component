import React from "react";
import {FloorplanFaq} from "../data/Floorplan";
import {Accordion, Fold} from "@contentmunch/muncher-ui";
import {Card} from "../../card/Card";
import "./assets/FloorplanFaqsCard.scss";

export const FloorplanFaqsCard: React.FC<FloorplanFaqsCardProps> = (
    {floorplanFaqs}) => {


    const generateFolds = (): Fold[] => {

        const folds: Fold[] = [];
        floorplanFaqs.forEach(floorplanFaq => {
            folds.push({
                heading: floorplanFaq.question,
                body: <p>{floorplanFaq.answer}</p>
            })
        });
        return folds;
    }

    return (
        <div className="floorplan-faqs-card">
            <Card title="Frequently Asked Questions">
                <Accordion variant="transparent" collapsed={true}>{{
                    folds: generateFolds()
                }}</Accordion>
            </Card>
        </div>
    )
}

export interface FloorplanFaqsCardProps {
    floorplanFaqs: FloorplanFaq[];
}
