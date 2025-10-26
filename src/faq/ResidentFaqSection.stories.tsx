import React from "react";
import type {Meta, StoryFn} from '@storybook/react';
import {ResidentFaqSection} from "./ResidentFaqSection";

const meta = {
    title: "Section/Resident Faqs",
    component: ResidentFaqSection,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof ResidentFaqSection>;
export default meta;
type Story = StoryFn<typeof meta>;
export const Default: Story = (args) => {

    return (
        <ResidentFaqSection/>
    );
}
