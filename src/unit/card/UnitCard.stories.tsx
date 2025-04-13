import React from "react";
import {type Meta, type StoryObj} from "@storybook/react";
import {UnitCard} from "./UnitCard";
import {Video} from "../../asset/data/Asset";
import moment from "moment/moment";
import {momentToDate} from "../../utils/Utils";
import {UnitCardData} from "../data/Unit";
import {FloorplanStyle} from "../../floorplan/data/Floorplan";

const meta: Meta<typeof UnitCard> = {
    component: UnitCard,
    title: "Card/Unit Card",
    render: (args) => <UnitCard {...args} />,
};

const unit: UnitCardData = {
    id: "3809-315",
    rent: 1000.0,
    squareFoot: 1000,
    moveInDate: "2023-08-04",
    availabilityExtensionMonths: null,
    floorplanId: "barcelona",
    floorplanName: "Barcelona",
    bedroom: 1,
    bathroom: 1.5,
    coverImage: "https://drive.google.com/uc?id=1AwPhezfH9zcAeSxDa-H1dv0rkJ2ypkGA&export=download",
    featured: true,
    style: FloorplanStyle.APARTMENT,
    specialRent: 0,
    specialRentStartDate: "",
    specialRentEndDate: "",
    address: "1100 N Walnut St",
    zipcode: "47404",
    virtualTourLink: "https://www.paneek.net/#/tour/view/3712",
    videoTourLink: "https://youtu.be/UioR0vCXkUo",
    photosFolderId: "18BL3coOPSHfMFJyJdZ4duB63SmPbgDDI",
    webSpecials: []
}
export default meta;
type Story = StoryObj<typeof UnitCard>;
export const Default: Story = {
    args: {
        unit: unit,
        propertyId: "verona-park",
        videoClickHandler: (video: Video) =>
            console.log("url: ", video.url, " type ", video.type)

    },
};
export const without360Icon: Story = {
    args: {
        ...Default.args,
        unit: {
            ...unit,
            virtualTourLink: ""
        }
    }
}
export const withoutLeftIcons: Story = {
    args: {
        ...Default.args,
        unit: {
            ...unit,
            virtualTourLink: "",
            videoTourLink: "",
            address:""
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
        unit: {
            ...unit,
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
        unit: {
            ...unit, specialRent: 800,
            specialRentStartDate: momentToDate(moment().subtract(2, "days")),
            specialRentEndDate: momentToDate(moment().add(2, "days"))
        }
    }
}
