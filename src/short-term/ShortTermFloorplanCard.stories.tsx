import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ShortTermFloorplanCard } from "./ShortTermFloorplanCard";
import {
  FloorplanShortTerm,
  ShortTerm,
  ShortTermStyle,
} from "./data/ShortTerm";

const meta: Meta<typeof ShortTermFloorplanCard> = {
  component: ShortTermFloorplanCard,
  title: "Short Term/Short Term Floorplan Card",
  render: (args) => <ShortTermFloorplanCard {...args} />,
};

export default meta;
type Story = StoryObj<typeof ShortTermFloorplanCard>;
export const Default: Story = {
  args: {
    size: "large",
    propertyId: "verona-park",
    videoClickHandler: () => {
      console.log("clicked");
    },
    floorplan: {
      id: "17789",
      name: "2 Bedroom Flat at Verona Park",
      style: ShortTermStyle.APARTMENT,
      bedroom: 2,
      bathroom: 2,
      virtualTourLink: "https://www.paneek.net/#/tour/view/3712",
      videoTourLink: "https://youtu.be/UioR0vCXkUo",
      photosFolderId: "18BL3coOPSHfMFJyJdZ4duB63SmPbgDDI",
      coverImage:
        "https://drive.google.com/uc?id=1pXtrJgJhTrdLeuwtP6lKSjULfF7TPJtf&export=download",
      shortTerm: {
        priceFor2To4Days: 0.0,
        priceFor5To13Days: 143.0,
        priceFor14To29Days: 119.0,
        priceFor1To4Months: 93.0,
        priceFor4andMoreMonths: 81.0,
        squareFoot: 750,
      } as ShortTerm,
    } as FloorplanShortTerm,
  },
};
