import React, {useEffect, useState} from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {AVAILABLE_NOW, getAllPropertyFilterData, sortFloorplans} from "../service/FloorplanService";
import {FloorplanCardData} from "../data/Floorplan";
import {FloorplanSectionSkeleton} from "./FloorplanSectionSkeleton";
import {FloorplansSection} from "./FloorplansSection";
import moment from "moment";

export default {
    title: "Section/FloorplansSection",
    component: FloorplansSection
} as ComponentMeta<typeof FloorplansSection>;

const Template: ComponentStory<typeof FloorplansSection> = (args => {
    const [floorplans, setFloorplans] = useState<FloorplanCardData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {

        getAllPropertyFilterData().then(properties => {
            const floorplans: FloorplanCardData[] = [];
            properties.forEach(property => {
                property.floorplans.forEach(floorplan => {
                    floorplans.push(floorplan);
                });
            });
            setFloorplans(sortFloorplans(floorplans, "featured"));
        })
            // getFloorplansFilterData("verona-park").then(floorplans => {
            //
            //     const sortedFloorplans = sortFloorplans(floorplans, "featured");
            //     setFloorplans(sortedFloorplans);
            //
            // })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);
    return (
        isLoading ?
            <FloorplanSectionSkeleton/> :
            <FloorplansSection {...args} floorplans={floorplans} propertyId="verona-park"/>
    );
});
export const Default = Template.bind({});

export const WithFilters = Template.bind({});

WithFilters.args = {
    defaultAvailability: moment().add(1, "month").format('MM-YYYY'),
    propertyId: "verona-park"
}
export const AvailableNowFilter = Template.bind({});

AvailableNowFilter.args = {
    defaultAvailability: AVAILABLE_NOW
}
export const WithFloorplanIds = Template.bind({});

WithFloorplanIds.args = {
    defaultFloorplanIds: ["blair-flat", "crestone", "capri", "3335ec"],
    propertyId: "verona-park"
}
