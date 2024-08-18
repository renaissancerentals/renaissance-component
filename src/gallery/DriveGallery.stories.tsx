import React from "react";
import { Meta, Story } from "@storybook/react";
import { DriveGallery, DriveGalleryProps } from "./DriveGallery";

export default {
  title: "Section/Drive Gallery",
  component: DriveGallery,
} as Meta;
const Template: Story<DriveGalleryProps> = (args) => {
  return <DriveGallery {...args} />;
};

export const GridGallery = Template.bind({});
GridGallery.args = {
  driveId: "1zGKGw9EBbQCvLkZqK-grYp8sul5lXJqF",
  type: "grid",
  initialSize: 9,
  propertyId: "verona-park",
};

export const SimpleGallery = Template.bind({});
SimpleGallery.args = {
  ...GridGallery.args,
  type: "simple",
};
