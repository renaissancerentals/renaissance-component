import React from "react";
import "./assets/FaqsCard.css";
import {FaqsSection, FaqsSectionProps} from "./FaqsSection";
import {Card} from "../card/Card";

export const FaqsCard: React.FC<FaqsCardProps> = (
    {faqs, title}) => {


    return (
        <div className="faqs-div">
            <Card title={title}>
                <FaqsSection faqs={faqs}/>
            </Card>
        </div>
    )
}

export interface FaqsCardProps extends FaqsSectionProps {
    title: string;
}
