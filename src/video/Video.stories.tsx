import React from "react";
import {Video, VideoProps} from "./Video";
import {Meta, Story} from "@storybook/react";
import "./assets/Video.stories.scss";
export default {
    title: "Section/Video",
    component: Video
} as Meta;

const Template: Story<VideoProps> = (() => {
    return (
        <div className="video-story">
            <Video url="https://drive.google.com/uc?id=1q3uSFbf9Kxtc9CUk51kre0isUZIT1kUX&export=download"/>
        </div>
    );
});

export const Default = Template.bind({});