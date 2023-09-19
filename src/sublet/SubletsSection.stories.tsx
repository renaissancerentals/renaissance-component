import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {SubletsSection} from "./SubletsSection";

export default {
    title: "Section/SubletsSection",
    component: SubletsSection
} as ComponentMeta<typeof SubletsSection>;

const Template: ComponentStory<typeof SubletsSection> = (args) => <SubletsSection {...args}/>;
export const Default = Template.bind({});
Default.args = {
    linkToSubletCreatePage: "/?path=/story/section-subletsection--default",

}
