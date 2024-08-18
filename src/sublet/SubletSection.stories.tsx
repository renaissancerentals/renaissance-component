import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { NEW_SUBLET, SubletSection } from "./SubletSection";

export default {
  title: "Section/SubletSection",
  component: SubletSection,
} as ComponentMeta<typeof SubletSection>;

const Template: ComponentStory<typeof SubletSection> = (args) => (
  <SubletSection {...args} />
);
export const Default = Template.bind({});
Default.args = {
  uniqueId: NEW_SUBLET,
};
