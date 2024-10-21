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
        special: {
            id: "id",
            title: "Flash Sale: SPECIAL PRICING ON SELECT UNITS",
            description: "Paragraph text here and here and here and here and here and here and here and here and here and here and here and here and here and here and here.",
            information1: "Information here",
            information2: "Information here",
            information3: "Information here",
            image: "https://scholars-quad.herokuapp.com/api/asset/download/16xiRBxWnwpDBGDF8YTnOHp3BqFgNICvo",
            properties: ["renaissance-rentals", "covenanter-hill"],
            startDate: momentToDate(moment().subtract(1, "days")),
            endDate: momentToDate(moment().add(1, "month")),
        }
    },
};
