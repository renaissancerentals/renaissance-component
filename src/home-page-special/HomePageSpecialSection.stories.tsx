import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {HomePageSpecialSection} from "./HomePageSpecialSection";


const meta: Meta<typeof HomePageSpecialSection> = {
    component: HomePageSpecialSection,
    title: "Section/Home Page Special",
    render: (args) => <><p>This section loads after 3 seconds (if cookie is set)</p>
        <HomePageSpecialSection {...args} /></>,
};

export default meta;
type Story = StoryObj<typeof HomePageSpecialSection>;
export const Default: Story = {
    args: {
        propertyId: "renaissance-rentals"
    },
};

