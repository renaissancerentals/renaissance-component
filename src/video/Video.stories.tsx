import React from "react";
import { Video, VideoProps } from "./Video";
import { Meta, Story } from "@storybook/react";
import "./assets/Video.stories.scss";
export default {
  title: "Section/Video",
  component: Video,
} as Meta;

const Template: Story<VideoProps> = () => {
  return (
    <div className="video-story">
      <Video url="https://www.googleapis.com/drive/v3/files/1_xNbnw0UM2FF3Jl5FLLWjAtcL1vGLtXE?alt=media&key=AIzaSyAdG4u5YD2CZvQTv_hRtaKrmSNWZkY30oU" />
    </div>
  );
};

export const Default = Template.bind({});
