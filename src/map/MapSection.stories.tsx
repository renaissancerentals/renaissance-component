import React from "react";
import { MapSection, MapSectionProps } from "./MapSection";
import { Meta, Story } from "@storybook/react";
import "./assets/MapSection.stories.css";
import {addressToGoogleMap} from "../utils/Utils";
export default {
  title: "Section/Map",
  component: MapSection,
} as Meta;

const Template: Story<MapSectionProps> = () => {
  return (
    <div className="map-story">
      <MapSection src={addressToGoogleMap("1100 N Walnut St.", "47404")} />
    </div>
  );
};
export const Default = Template.bind({});
