import type {Meta, StoryObj} from '@storybook/react';
import React from 'react';
import {Hostaway} from "./Hostaway";

const meta: Meta<typeof Hostaway> = {
    component: Hostaway,
    title: 'Short Term/Hostaway',
    render: (args) => <Hostaway {...args}/>,
};

export default meta;
type Story = StoryObj<typeof Hostaway>;
export const Primary: Story = {
    args: {}
};
