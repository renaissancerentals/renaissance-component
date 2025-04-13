import React, { useEffect, useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  AVAILABLE_NOW,
  getFloorplansFilterData,
  sortFloorplans,
} from "../service/FloorplanService";
import { FloorplanCardData } from "../data/Floorplan";
import { FloorplanSectionSkeleton } from "./FloorplanSectionSkeleton";
import { FloorplansSection } from "./FloorplansSection";
import moment from "moment";
import {getAllPropertyFilterData} from "../../property/service/PropertyService";

export default {
  title: "Section/FloorplansSection",
  component: FloorplansSection,
} as ComponentMeta<typeof FloorplansSection>;

const Template: ComponentStory<typeof FloorplansSection> = (args) => {
  const [floorplans, setFloorplans] = useState<FloorplanCardData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    getFloorplansFilterData("high-grove")
      .then((floorplanData) => {

        setFloorplans(sortFloorplans(floorplanData, "featured"));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return isLoading ? (
    <FloorplanSectionSkeleton />
  ) : (
    <FloorplansSection
      {...args}
      floorplans={floorplans}
      propertyId="scholars-rooftop"
    />
  );
};
export const Default = Template.bind({});

export const WithFilters = Template.bind({});

WithFilters.args = {
  defaultAvailability: moment().add(1, "month").format("MM-YYYY"),
  propertyId: "verona-park",
};
export const AvailableNowFilter = Template.bind({});

AvailableNowFilter.args = {
  defaultAvailability: AVAILABLE_NOW,
};
export const WithFloorplanIds = Template.bind({});

WithFloorplanIds.args = {
  defaultFloorplanIds: ["blair-flat", "crestone", "capri", "3335ec"],
  propertyId: "verona-park",
};
