import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {HomePageSpecialCard} from "./HomePageSpecialCard";

import {momentToDate} from "../utils/Utils";
import moment from "moment/moment";

const meta: Meta<typeof HomePageSpecialCard> = {
    component: HomePageSpecialCard,
    title: "Card/Home Page Special",
    render: (args) => <HomePageSpecialCard {...args} />,
};

export default meta;
type Story = StoryObj<typeof HomePageSpecialCard>;
export const Default: Story = {
    args: {
        homePageSpecial: {
            id: "id",
            description: "High-end, luxurios, unique apartments and townhomes available for rent this summer",
            image: "https://drive.google.com/uc?id=1NJSraw9EOii8eHhgBaa31-tj6FECvYPA&export=download",
            properties: ["covenanter-hill", "high-grove", "renaissance-rentals"],
            startDate: momentToDate(moment().subtract(1, "days")),
            endDate: momentToDate(moment().add(1, "month")),
            links: [
                {
                    x: 3.750003912510016,
                    y: 85.00000859650088,
                    width: 23.076923076923077,
                    height: 7.922535211267606,
                    url: "https://www.veronaparkneighborhood.com/"
                },
                {
                    x: 29.39102955353566,
                    y: 85.00000859650088,
                    width: 20.993589743589745,
                    height: 7.746478873239436,
                    url: "https://www.highgrovebloomington.com/"
                }
            ]
        },
        propertyId: "renaissance-rentals"
    },
};
