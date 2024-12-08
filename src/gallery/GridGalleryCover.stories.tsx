import React from "react";
import {type Meta, type StoryObj} from "@storybook/react";
import {GridGalleryCover} from "./GridGalleryCover";
import {Asset} from "../asset/data/Asset";
import {assetUrlFrom} from "../asset/service/AssetService";

const meta: Meta<typeof GridGalleryCover> = {
    component: GridGalleryCover,
    title: "Hero/Grid Gallery Cover",
    render: (args) => <GridGalleryCover {...args} />,
};
const assetsData: Asset[] = [
    {
        "id": "1_CRLG3E6akOwfHkUROa72kXcOG3BWatv",
        "name": "2",
        "description": "",
        "folderId": "13Kjq5uCUAn_R8CpcIQWOafrioKvQzUZD",
        "height": 1382,
        "width": 2074,
        "mimeType": "image/jpeg"
    },
    {
        "id": "1-9aSASZkt7Q4PbaMa4HTGzY-_nJ_Bnn9",
        "name": "7",
        "description": "",
        "folderId": "13Kjq5uCUAn_R8CpcIQWOafrioKvQzUZD",
        "height": 1382,
        "width": 2074,
        "mimeType": "image/jpeg"
    },
    {
        "id": "19Fbrof8gS4h4ZAJn5fPwrmFMSQeG4AYE",
        "name": "6",
        "description": "",
        "folderId": "13Kjq5uCUAn_R8CpcIQWOafrioKvQzUZD",
        "height": 1382,
        "width": 2074,
        "mimeType": "image/jpeg"
    },
    {
        "id": "1sbLo_g2G9SWMnCCURcHg_csdbJ899vI3",
        "name": "12",
        "description": "",
        "folderId": "13Kjq5uCUAn_R8CpcIQWOafrioKvQzUZD",
        "height": 2074,
        "width": 1382,
        "mimeType": "image/jpeg"
    },
    {
        "id": "1gthUPM09m3JNGdoIRenTvNs75yY4nJWR",
        "name": "11",
        "description": "",
        "folderId": "13Kjq5uCUAn_R8CpcIQWOafrioKvQzUZD",
        "height": 2074,
        "width": 1382,
        "mimeType": "image/jpeg"
    },
    {
        "id": "1Fq91vbTB7xllP1UEr6DsgbkG79g7opJ8",
        "name": "10",
        "description": "",
        "folderId": "13Kjq5uCUAn_R8CpcIQWOafrioKvQzUZD",
        "height": 1382,
        "width": 2074,
        "mimeType": "image/jpeg"
    },
    {
        "id": "1eVESeRIsspy3rAipUDtk2hx6MHPWbcCs",
        "name": "9",
        "description": "",
        "folderId": "13Kjq5uCUAn_R8CpcIQWOafrioKvQzUZD",
        "height": 1382,
        "width": 2074,
        "mimeType": "image/jpeg"
    },
    {
        "id": "1AGO0yBpEiG9ItKNXrfepr4ukt44yO8n8",
        "name": "8",
        "description": "",
        "folderId": "13Kjq5uCUAn_R8CpcIQWOafrioKvQzUZD",
        "height": 1382,
        "width": 2074,
        "mimeType": "image/jpeg"
    },
    {
        "id": "15WQT3XHjXedAKUlj31TCrxdrrkv3so6-",
        "name": "5",
        "description": "",
        "folderId": "13Kjq5uCUAn_R8CpcIQWOafrioKvQzUZD",
        "height": 1382,
        "width": 2074,
        "mimeType": "image/jpeg"
    },
    {
        "id": "1nxAv_2psr9NphhuknbzBYN6Jtwqk32bN",
        "name": "4",
        "description": "",
        "folderId": "13Kjq5uCUAn_R8CpcIQWOafrioKvQzUZD",
        "height": 2074,
        "width": 1382,
        "mimeType": "image/jpeg"
    },
    {
        "id": "1HQrjAFOnZ0En4X3Aa7yoC9fxUWSrNf0S",
        "name": "3",
        "description": "",
        "folderId": "13Kjq5uCUAn_R8CpcIQWOafrioKvQzUZD",
        "height": 2074,
        "width": 1382,
        "mimeType": "image/jpeg"
    },
    {
        "id": "1VuWBmc5Azo6VLnu2WblbFDcS_wJPnNi_",
        "name": "13",
        "description": "",
        "folderId": "13Kjq5uCUAn_R8CpcIQWOafrioKvQzUZD",
        "height": 2074,
        "width": 1382,
        "mimeType": "image/jpeg"
    }
]

export default meta;
type Story = StoryObj<typeof GridGalleryCover>;
export const Default: Story = {
    args: {
        assets: assetsData.slice(1, 2),
        heroImage: assetsData[0],
        floorplanAddress: {
            address: "1100 N Walnut St",
            city: "Bloomington",
            state: "IN",
            zipcode: "47404"
        },
        isAvailableNow: true,
        videoTourImageBackground: assetUrlFrom(assetsData[1].id, "verona-park"),
        virtualTourImageBackground: assetUrlFrom(assetsData[1].id, "verona-park"),
        propertyId: "verona-park",
        webSpecials: [{
            description: "$250 off your first month rent when you sign a 12-month lease",
            startDate: "",
            endDate: ""
        }],
        imageClickedHandler: (image: Asset) =>
            console.log(image)

    },
};
export const withOnlyHeroImage: Story = {
    args: {
        assets: [],
        showOnlyHeroImage: true,
        heroImage: assetsData[0],
        floorplanAddress: {
            address: "1100 N Walnut St",
            city: "Bloomington",
            state: "IN",
            zipcode: "47404"
        },
        isAvailableNow: true,
        propertyId: "verona-park",
        webSpecials: [{
            description: "$250 off your first month rent when you sign a 12-month lease",
            startDate: "",
            endDate: ""
        }],
        imageClickedHandler: (image: Asset) =>
            console.log(image)

    }
}

export const withNoVirtualTour: Story = {
    args: {
        assets: assetsData.slice(1, 3),
        heroImage: assetsData[0],
        videoTourImageBackground: assetUrlFrom(assetsData[1].id, "verona-park"),
        floorplanAddress: {
            address: "1100 N Walnut St",
            city: "Bloomington",
            state: "IN",
            zipcode: "47404"
        },
        isAvailableNow: true,
        propertyId: "verona-park",
        webSpecials: [{
            description: "$250 off your first month rent when you sign a 12-month lease",
            startDate: "",
            endDate: ""
        }],
        imageClickedHandler: (image: Asset) =>
            console.log(image)

    }
}

export const withNoTours: Story = {
    args: {
        assets: assetsData.slice(1, 4),
        heroImage: assetsData[0],
        floorplanAddress: {
            address: "1100 N Walnut St",
            city: "Bloomington",
            state: "IN",
            zipcode: "47404"
        },
        isAvailableNow: true,
        propertyId: "verona-park",
        webSpecials: [{
            description: "$250 off your first month rent when you sign a 12-month lease",
            startDate: "",
            endDate: ""
        }],
        imageClickedHandler: (image: Asset) =>
            console.log(image)

    }
}

