import React from "react";
import type {Meta, StoryFn} from '@storybook/react';
import {ResidentFaqSection} from "./ResidentFaqSection";
import {PropertyFaqSection} from "./PropertyFaqSection";

const meta = {
    title: "Section/Property Faqs",
    component: PropertyFaqSection,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof PropertyFaqSection>;
export default meta;
type Story = StoryFn<typeof meta>;
export const Default: Story = (args) => {

    return (
        <PropertyFaqSection propertyId="summer-house"/>
    );
}
