import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { FloorplanSection } from "./FloorplanSection";

export default {
  title: "Section/FloorplanSection",
  component: FloorplanSection,
} as ComponentMeta<typeof FloorplanSection>;

const Template: ComponentStory<typeof FloorplanSection> = (args) => (
  <FloorplanSection {...args} />
);
export const Default = Template.bind({});
Default.args = {
  contactClickHandler: () => {
    console.log("contact clicked");
  },
  applyClickHandler: () => {
    console.log("apply clicked");
  },
  floorplanId: "merci-grand",
};

export const OneImage = Template.bind({});
OneImage.args = { ...Default.args, floorplanId: "aberdeen" };

export const OneSimilarFloorplan = Template.bind({});
OneSimilarFloorplan.args = { ...Default.args, floorplanId: "dorset" };

export const ShortTermFloorplan = Template.bind({});
ShortTermFloorplan.args = { ...Default.args, floorplanId: "1-bedroom-flat" };

export const NoUnit = Template.bind({});
NoUnit.args = { ...Default.args, floorplanId: "barcelona" };

export const NotFound = Template.bind({});
NotFound.args = { ...Default.args, floorplanId: "everhart-not-found" };
