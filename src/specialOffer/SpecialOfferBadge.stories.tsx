import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {SpecialOfferBadge} from "./SpecialOfferBadge";

const meta: Meta<typeof SpecialOfferBadge> = {
    component: SpecialOfferBadge,
    title: "Badge/Special Offer",
    render: (args) => <SpecialOfferBadge {...args} />,
};

export default meta;
type Story = StoryObj<typeof SpecialOfferBadge>;
export const Default: Story = {
    args: {},
};
