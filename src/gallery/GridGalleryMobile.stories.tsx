import React from "react";
import {type Meta, type StoryObj} from "@storybook/react";
import {TourType} from "./GridGalleryCover";
import {Asset} from "../asset/data/Asset";
import {GridGalleryMobile} from "./GridGalleryMobile";

const meta: Meta<typeof GridGalleryMobile> = {
    component: GridGalleryMobile,
    title: "Hero/Grid Gallery Mobile",
    render: (args) => <GridGalleryMobile {...args} />,
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
type Story = StoryObj<typeof GridGalleryMobile>;
export const Default: Story = {
    args: {
        assets: assetsData,
        floorplanAddress: {
            address: "1100 N Walnut St",
            city: "Bloomington",
            state: "IN",
            zipcode: "47404"
        },
        toursCount: 0,
        webSpecials: [{
            description: "$250 off your first month rent when you sign a 12-month lease",
            startDate: "",
            endDate: ""
        }],
        setCurrentView: (view: "photo" | TourType) => {
            console.log(view)
        },
        imageClickedHandler: (image: Asset) => {
            console.log(image)
        },
        propertyId: "verona-park",
        isAvailableNow: true
    },
};

export const withTours: Story = {
    args: {...Default.args, toursCount: 2, virtualTour: "https://www.vitrualtour.link"},
}
