import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {ContactSection} from "./ContactSection";

const meta: Meta<typeof ContactSection> = {
    component: ContactSection,
    title: "Section/Contact",
    render: (args) => <ContactSection {...args} />,
};
export default meta;
type Story = StoryObj<typeof ContactSection>;

export const Default: Story = {
    args: {
        propertyId: "scholars-rooftop"
    },
};
export const WithContactNumber: Story = {
    args: {
        ...Default.args,
        contactNumber: "8123456789",
    },
};

export const Long: Story = {
    args: {
        ...Default.args,
        variant: "long",
    },
};
