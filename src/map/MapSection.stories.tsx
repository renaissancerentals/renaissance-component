import React from "react";
import { MapSection, MapSectionProps } from "./MapSection";
import { Meta, Story } from "@storybook/react";
import "./assets/MapSection.stories.scss";
export default {
  title: "Section/Map",
  component: MapSection,
} as Meta;

const Template: Story<MapSectionProps> = () => {
  return (
    <div className="map-story">
      <MapSection src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAdG4u5YD2CZvQTv_hRtaKrmSNWZkY30oU&q=1100 N Walnut St., 47404" />
    </div>
  );
};
export const Default = Template.bind({});
