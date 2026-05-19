import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {ShortTermPricingCard} from "./ShortTermPricingCard";
import {FloorplanShortTerm, ShortTermStyle,} from "./data/ShortTerm";

const meta: Meta<typeof ShortTermPricingCard> = {
    component: ShortTermPricingCard,
    title: "Short Term/Short Term Pricing Card",
    render: (args) => <ShortTermPricingCard {...args} />,
};

export default meta;
type Story = StoryObj<typeof ShortTermPricingCard>;
export const Default: Story = {
    args: {
        contactNumber: "8123332280",
        floorplans: [
            {
                id: "17789",
                name: "2 Bedroom Flat",
                style: ShortTermStyle.APARTMENT,
                bedroom: 2,
                bathroom: 2,
                priceFor14To29Days: "119.0",
                priceFor1To4Months: "93.0",
                priceFor4andMoreMonths: "81.0",
                squareFoot: 750,
            } as FloorplanShortTerm,
            {
                id: "17790",
                name: "2 townhome",
                style: ShortTermStyle.TOWN_HOME,
                bedroom: 2,
                bathroom: 2.5,
                priceFor14To29Days: "127.0",
                priceFor1To4Months: "101.0",
                priceFor4andMoreMonths: "89.0",
                squareFoot: 1132,
            } as FloorplanShortTerm,
            {
                id: "17791",
                name: "1 bedroom",
                style: ShortTermStyle.APARTMENT,
                bedroom: 1,
                bathroom: 1,
                priceFor14To29Days: "102.0",
                priceFor1To4Months: "75.0",
                priceFor4andMoreMonths: "63.0",
                squareFoot: 501,
            } as FloorplanShortTerm,
            {
                id: "17792",
                name: "1 bedroom",
                style: ShortTermStyle.DELUXE_APARTMENT,
                bedroom: 1,
                bathroom: 1,
                priceFor14To29Days: "102.0",
                priceFor1To4Months: "75.0",
                priceFor4andMoreMonths: "63.0",
                squareFoot: 501

            } as FloorplanShortTerm,
        ],
    },
};
