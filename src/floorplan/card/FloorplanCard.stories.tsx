import React from "react";
import {type Meta, type StoryObj} from "@storybook/react";
import {FloorplanCard} from "./FloorplanCard";
import {FloorplanCardData, FloorplanStyle} from "../data/Floorplan";
import {Video} from "../../asset/data/Asset";
import moment from "moment/moment";
import {momentToDate} from "../../utils/Utils";

const meta: Meta<typeof FloorplanCard> = {
    component: FloorplanCard,
    title: "Card/Floorplan Card",
    render: (args) => <FloorplanCard {...args} />,
};

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
    address: "1100 N Walnut St",
    zipcode: "47404",
    webSpecials: []
}
export default meta;
type Story = StoryObj<typeof FloorplanCard>;
export const Default: Story = {
    args: {
        floorplan: floorplan,
        propertyId: "verona-park",
        videoClickHandler: (video: Video) =>
            console.log("url: ", video.url, " type ", video.type)

    },
};
export const without360Icon: Story = {
    args: {
        ...Default.args,
        floorplan: {
            ...floorplan,
            virtualTourLink: ""
        }
    }
}
export const withoutLeftIcons: Story = {
    args: {
        ...Default.args,
        floorplan: {
            ...floorplan,
            virtualTourLink: "",
            videoTourLink: ""
        }
    }
}
export const Small: Story = {
    args: {
        ...Default.args,
        size: 'small'
    }
}

export const WithSpecialOffer: Story = {
    args: {
        ...Default.args,
        floorplan: {
            ...floorplan,
            webSpecials: [
                "$250 off your first month rent when you sign a 12-month lease",
                "$250 off your second month rent when you sign a 12-month lease"
            ]
        }
    }
}
export const WithSpecialRent: Story = {
    args: {
        ...Default.args,
        floorplan: {
            ...floorplan, specialRent: 800,
            specialRentStartDate: momentToDate(moment().subtract(2, "days")),
            specialRentEndDate: momentToDate(moment().add(2, "days"))
        }
    }
}

export const Featured: Story = {
    args: {
        ...Default.args,
        variant: "featured"
    }
}

