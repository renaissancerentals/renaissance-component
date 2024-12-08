import React from "react";
import {type Meta, type StoryObj} from "@storybook/react";
import {Asset} from "../asset/data/Asset";
import {GridGallery} from "./GridGallery";

const meta: Meta<typeof GridGallery> = {
    component: GridGallery,
    title: "Hero/Grid Gallery",
    render: (args) => <GridGallery {...args} />,
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
type Story = StoryObj<typeof GridGallery>;
export const Default: Story = {
    args: {
        assets: assetsData.slice(0, 8),
        propertyId: "verona-park",
        imageClickedHandler: (image: Asset) =>
            console.log(image)

    },
};
export const withSix: Story = {
    args: {
        ...Default.args,
        assets: assetsData.slice(0, 6)
    }
}

export const withThree: Story = {
    args: {
        ...Default.args,
        assets: assetsData.slice(0, 3)
    }
}
export const withTwo: Story = {
    args: {
        ...Default.args,
        assets: assetsData.slice(0, 2)
    }
}
export const withOne: Story = {
    args: {
        ...Default.args,
        assets: assetsData.slice(0, 1)
    }
}



