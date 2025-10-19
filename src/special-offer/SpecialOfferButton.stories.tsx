import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {SpecialOfferButton} from "./SpecialOfferButton";

const meta: Meta<typeof SpecialOfferButton> = {
    component: SpecialOfferButton,
    title: "Button/Special Offer",
    render: (args) => <SpecialOfferButton {...args} />,
};

export default meta;
type Story = StoryObj<typeof SpecialOfferButton>;
export const Default: Story = {
    args: {
        onMouseEnter: () => {
            console.log("entered")
        },
        onMouseLeave: () => {
            console.log("leave")
        }
    },
};
