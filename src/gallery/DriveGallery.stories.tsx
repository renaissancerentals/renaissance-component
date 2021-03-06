import React from "react";
import {Meta, Story} from "@storybook/react";
import {DriveGallery, DriveGalleryProps} from "./DriveGallery";

export default {
    title: "Section/Drive Gallery",
    component: DriveGallery
} as Meta;
const Template: Story<DriveGalleryProps> = (args) => {

    return (
        <DriveGallery  {...args} />
    );
};

export const GridGallery = Template.bind({});
GridGallery.args = {
    driveId: "0B6C97UNWKNaIMXNZWFBBNmV2enM",
    type: "grid",
    initialSize: 9,

};

export const SimpleGallery = Template.bind({});
SimpleGallery.args = {
    ...GridGallery.args,
    type: "simple",
};