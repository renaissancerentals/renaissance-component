import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {FloorplanSection} from "./FloorplanSection";

export default {
    title: "Section/FloorplanSection",
    component: FloorplanSection
} as ComponentMeta<typeof FloorplanSection>;

const Template: ComponentStory<typeof FloorplanSection> = (args) => <FloorplanSection {...args}/>;
export const Default = Template.bind({});
Default.args = {
    contactClickHandler: () => {
        console.log("contact clicked");
    },
    applyClickHandler: () => {
        console.log("apply clicked");
    },
    floorplanId: "merci",

}

export const OneImage = Template.bind({});
OneImage.args = {...Default.args, floorplanId: "view-deck"}

export const OneSimilarFlorplan = Template.bind({});
OneSimilarFlorplan.args = {...Default.args, floorplanId: "showalter-loft"}

export const NoUnit = Template.bind({});
NoUnit.args = {...Default.args, floorplanId: "brighten-suite"}

export const NotFound = Template.bind({});
NotFound.args = {...Default.args, floorplanId: "everhart-not-found"}
