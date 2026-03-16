import type {Meta, StoryObj} from '@storybook/react';
import React from "react";
import {ApplicationCompletion} from "./ApplicationCompletion";

const meta: Meta<typeof ApplicationCompletion> = {
    component: ApplicationCompletion,
    title: 'Section/Application',
    render: (args) => <ApplicationCompletion {...args}/>
};

export default meta;
type Story = StoryObj<typeof ApplicationCompletion>;
export const Completion: Story = {
    args: {}
}
