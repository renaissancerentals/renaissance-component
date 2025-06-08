import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {FloorplanShortTerm, ShortTerm,} from "./data/ShortTerm";
import {ShortTermFloorplansSection} from "./ShortTermFloorplansSection";

const meta: Meta<typeof ShortTermFloorplansSection> = {
    component: ShortTermFloorplansSection,
    title: "Short Term/Short Term Floorplans",
    render: (args) => <ShortTermFloorplansSection {...args} />,
};

export default meta;
type Story = StoryObj<typeof ShortTermFloorplansSection>;
export const Default: Story = {
    args: {
        propertyId: "summer-house-short-term",
        floorplans: [
            {
                name: "2 Flat",
                id: "2-flat",
                active: true,
                style: "APARTMENT",
                bedroom: 2,
                photo: "https://drive.google.com/uc?id=1xL9C-pvoZZpoZXUyPb3ADBWSXPVxtFoQ&export=download",
                bathroom: 2.0,
                videoTourLink: "",
                threeSixtyVideoTourLink: "",
                virtualTourLink: "",
                coverImage: "https://drive.google.com/uc?id=1xE7uIpSBD_A0BnxH9BEW421SwvcOfe3M&export=download",
                floorPlanFolderId: "1CM51fpSEPVpjSxSi9Vd0ZvGMhetrxlnD",
                photosFolderId: "1FN5Y5hYgqnJVu8hcwrOofY-uxQIIiQIl",
                photosCount: 12,
                shortTerm: {
                    priceFor2To4Days: "Call or Text",
                    priceFor5To13Days: "143.0",
                    priceFor14To29Days: "119.0",
                    priceFor1To4Months: "93.0",
                    priceFor4andMoreMonths: "81.0",
                    squareFoot: 750,
                } as ShortTerm,
            } as FloorplanShortTerm,
            {
                name: "2 townhome",
                id: "2-townhome",
                active: true,
                style: "TOWN_HOME",
                bedroom: 2,
                photo: "https://drive.google.com/uc?id=1hy8y7cOnPHtS5f8jX2nTTIUD2sTWfavi&export=download",
                bathroom: 2.5,
                videoTourLink: "",
                threeSixtyVideoTourLink: "",
                virtualTourLink: "",
                coverImage: "https://drive.google.com/uc?id=1ECLJhZIErwCcsSwaKIqCcfujb9gEvn0C&export=download",
                floorPlanFolderId: "1k2JkyDm4vfQ7fjqVldMJbh148ETMQqqy",
                photosFolderId: "1iwVLQvvXjT8RetsuJjQvqXkQfy7D0CLt",
                photosCount: 16,
                shortTerm: {
                    priceFor2To4Days: "Call or Text",
                    priceFor5To13Days: "163.0",
                    priceFor14To29Days: "127.0",
                    priceFor1To4Months: "101.0",
                    priceFor4andMoreMonths: "89.0",
                    squareFoot: 1132,
                } as ShortTerm,
            } as FloorplanShortTerm,
            {
                name: "1 bedroom",
                id: "1-bedroom",
                active: true,
                style: "APARTMENT",
                bedroom: 1,
                photo: "https://drive.google.com/uc?id=1os9y4hbObiRDyMDudrQoyTCla0ZQd3qn&export=download",
                bathroom: 1.0,
                videoTourLink: "https://youtu.be/4q2Mppt2_hM",
                threeSixtyVideoTourLink: "https://youtu.be/1XNcZirYNnk",
                virtualTourLink: "https://viewer.divein.studio/story/O0m-6wU",
                coverImage: "https://drive.google.com/uc?id=1wCrmxIbiNJIGoXlUq8cwAszFTFhBWD7Z&export=download",
                floorPlanFolderId: "1PYtR2Z9ZEGXY_7WwGXHtl31FeeuLdyYZ",
                photosFolderId: "1FdMOapUlUUuqWVVlDpobXwxp3Lp_cG3E",
                photosCount: 11,
                shortTerm: {
                    priceFor2To4Days: "Call, Text, or Search below",
                    priceFor5To13Days: "123.0",
                    priceFor14To29Days: "102.0",
                    priceFor1To4Months: "75.0",
                    priceFor4andMoreMonths: "63.0",
                    squareFoot: 501,
                } as ShortTerm,
            } as FloorplanShortTerm,
        ],
    },
};
