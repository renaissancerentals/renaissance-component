import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {ShortTermFloorplanSection} from "./ShortTermFloorplanSection";

const meta: Meta<typeof ShortTermFloorplanSection> = {
    component: ShortTermFloorplanSection,
    title: "Short Term/Short Term Floorplan",
    render: (args) => <ShortTermFloorplanSection {...args} />,
};

export default meta;
type Story = StoryObj<typeof ShortTermFloorplanSection>;
export const Default: Story = {
    args: {
        floorplanId: "1-bedroom-flat"
    },
};
