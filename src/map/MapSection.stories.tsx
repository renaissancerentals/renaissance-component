import React from "react";
import {MapSection, MapSectionProps} from "./MapSection";
import {Meta, Story} from "@storybook/react";
import "./assets/MapSection.stories.scss";
export default {
    title: "Section/Map",
    component: MapSection
} as Meta;

const Template: Story<MapSectionProps> = () => {
    return (
        <div className="map-story">
            <MapSection
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3093.421265578703!2d-86.47658894862944!3d39.16514287942969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x886c6469f78b443f%3A0xfd4391112a512760!2sSummerHouse%20at%20Indiana!5e0!3m2!1sen!2sus!4v1591135703275!5m2!1sen!2sus"/>
        </div>
    );
};
export const Default = Template.bind({});