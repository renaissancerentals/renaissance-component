import React, {useEffect, useState} from "react";
import {FloorplanFaq} from "../data/Floorplan";
import {getFloorplanFaqs} from "../service/FloorplanService";

export const FloorplanFaqsSection: React.FC<FloorplanFaqsSectionProps> = (
    {floorplanId}) => {

    const [floorplanFaqs, setFloorplanFaqs] = useState<FloorplanFaq[]>([]);

    useEffect(() => {
        getFloorplanFaqs(floorplanId).then(data => {
            setFloorplanFaqs(data);
        });
    }, [floorplanId]);

    return (
        <></>
    )
}

export interface FloorplanFaqsSectionProps {
    floorplanId: string;
}
