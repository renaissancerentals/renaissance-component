import React from "react";
import {Meta, Story} from "@storybook/react";
import "../assets/App.scss";
import "./assets/HeadingStory.scss";
export default {
    title: 'Heading/Emphasized',
} as Meta;

const Template: Story = () =>
    <main className="heading-story">
        <h2 className="heading"><span className="emphasized">Emphasized Heading</span></h2>
    </main>
export const Default = Template.bind({});
