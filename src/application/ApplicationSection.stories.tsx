import React from "react";
import { Meta, Story } from "@storybook/react";
import {
  ApplicationSection,
  ApplicationSectionProps,
} from "./ApplicationSection";

export default {
  title: "Section/Application",
  component: ApplicationSection,
} as Meta;
const Template: Story<ApplicationSectionProps> = (args) => (
  <ApplicationSection {...args} />
);

export const Default = Template.bind({});
Default.args = {
  contactClickHandler: () => {
    console.log("clicked");
  },
};
export const WithProperty = Template.bind({});

WithProperty.args = {
  ...Default.args,
  propertyName: "Scholar's Quad",
  propertyEmail: "mail@renaissancerentals.com",
};
