import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { FloorplanCard } from "./FloorplanCard";
import { FloorplanCardData, FloorplanStyle } from "../data/Floorplan";
import { Video } from "../../asset/data/Asset";

export default {
  title: "Card/Floorplan Card",
  component: FloorplanCard,
} as ComponentMeta<typeof FloorplanCard>;

const Template: ComponentStory<typeof FloorplanCard> = (args) => {
  const floorplan: FloorplanCardData = {
    name: "Barcelona",
    id: "barcelona",
    active: true,
    virtualTourLink: "https://www.paneek.net/#/tour/view/3712",
    videoTourLink: "https://youtu.be/UioR0vCXkUo",
    photosFolderId: "18BL3coOPSHfMFJyJdZ4duB63SmPbgDDI",
    units: [
      {
        active: false,
        squareFoot: 1000,
        rent: 1000.0,
        moveInDate: "",
      },
      {
        active: true,
        squareFoot: 710,
        rent: 1195.0,
        moveInDate: "2023-08-04",
      },
      {
        active: true,
        squareFoot: 710,
        rent: 1165.0,
        moveInDate: "2023-08-09",
      },
    ],
    style: FloorplanStyle.APARTMENT,
    bathroom: 1.0,
    featured: true,
    bedroom: 1,
    coverImage:
      "https://drive.google.com/uc?id=1pXtrJgJhTrdLeuwtP6lKSjULfF7TPJtf&export=download",
    specialRent: 0,
    specialRentStartDate: "",
    specialRentEndDate: "",
  };
  return (
    <FloorplanCard
      {...args}
      floorplan={floorplan}
      propertyId="verona-park"
      videoClickHandler={(video: Video) =>
        console.log("url: ", video.url, " type ", video.type)
      }
    />
  );
};
export const Default = Template.bind({});
export const Small = Template.bind({});

Small.args = {
  size: "small",
  propertyId: "verona-park",
};
