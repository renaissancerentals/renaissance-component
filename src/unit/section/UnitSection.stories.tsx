import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {UnitSection} from "./UnitSection";

const meta: Meta<typeof UnitSection> = {
    component: UnitSection,
    title: "Unit/Unit Section",
    render: (args) => <UnitSection {...args} />,
};

export default meta;
type Story = StoryObj<typeof UnitSection>;
export const Default: Story = {
    args: {
        contactClickHandler: () => {
            console.log("contact clicked");
        },
        applyClickHandler: () => {
            console.log("apply clicked");
        },
        unitId: "1100-2",
    },
};
