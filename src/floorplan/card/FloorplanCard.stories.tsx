import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {FloorplanCard} from "./FloorplanCard";
import {FloorplanCardData, FloorplanStyle} from "../data/Floorplan";
import {Video} from "../../asset/data/Asset";

export default {
    title: "Card/Floorplan Card",
    component: FloorplanCard,
} as ComponentMeta<typeof FloorplanCard>;

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
            discountedRent: 0,
            deposit: 500
        },
        {
            active: true,
            squareFoot: 710,
            rent: 1195.0,
            moveInDate: "2023-08-04",
            discountedRent: 0,
            deposit: 500
        },
        {
            active: true,
            squareFoot: 710,
            rent: 1165.0,
            moveInDate: "2023-08-09",
            discountedRent: 0,
            deposit: 500
        },
    ],
    style: FloorplanStyle.APARTMENT,
    bathroom: 1.0,
    featured: true,
    bedroom: 1,
    coverImage:
        "https://drive.google.com/uc?id=1pXtrJgJhTrdLeuwtP6lKSjULfF7TPJtf&export=download",
};

const floorplanWithDiscount: FloorplanCardData = {
    ...floorplan, units: [
        {
            active: false,
            squareFoot: 1000,
            rent: 1000.0,
            moveInDate: "",
            discountedRent: 0,
            deposit: 500
        },
        {
            active: true,
            squareFoot: 710,
            rent: 1195.0,
            moveInDate: "2023-08-04",
            discountedRent: 0,
            deposit: 500
        },
        {
            active: true,
            squareFoot: 710,
            rent: 1165.0,
            moveInDate: "2023-08-09",
            discountedRent: 700,
            deposit: 500
        }
    ]
}

const singleUnitWithDiscount: FloorplanCardData = {
    ...floorplan, units: [
        {
            active: false,
            squareFoot: 1000,
            rent: 1000.0,
            moveInDate: "",
            discountedRent: 850,
            deposit: 500
        }
    ]
}
const Template: ComponentStory<typeof FloorplanCard> = (args) => {

    return (
        <FloorplanCard
            {...args}
            propertyId="verona-park"
            videoClickHandler={(video: Video) =>
                console.log("url: ", video.url, " type ", video.type)
            }
        />
    );
};
export const Default = Template.bind({});
Default.args = {
    floorplan: floorplan,
};
export const Small = Template.bind({});

Small.args = {
    size: "small",
    floorplan: floorplan,
};

export const WithDiscount = Template.bind({});

WithDiscount.args = {
    floorplan: floorplanWithDiscount
};

export const SingleUnitWithDiscount = Template.bind({});

SingleUnitWithDiscount.args = {
    floorplan: singleUnitWithDiscount
};

