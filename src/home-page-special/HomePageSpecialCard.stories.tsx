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
            title: "Flash Sale: SPECIAL PRICING ON SELECT UNITS",
            description: "Paragraph text here and here and here and here and here and here and here and here and here and here and here and here and here and here and here.",
            details: "<ul class=\"muncher-editor-list-ul\"><li value=\"1\" class=\"muncher-editor-listitem\"><span style=\"white-space: pre-wrap;\">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span></li><li value=\"2\" class=\"muncher-editor-listitem\"><span style=\"white-space: pre-wrap;\">Morbi fermentum neque in nulla tincidunt scelerisque.</span></li><li value=\"3\" class=\"muncher-editor-listitem\"><span style=\"white-space: pre-wrap;\">Maecenas vel massa sed risus consectetur aliquet.</span></li><li value=\"4\" class=\"muncher-editor-listitem\"><span style=\"white-space: pre-wrap;\">Praesent varius odio consectetur metus eui</span></li></ul>",
            image: "https://scholars-quad.herokuapp.com/api/asset/download/16xiRBxWnwpDBGDF8YTnOHp3BqFgNICvo",
            properties: ["renaissance-rentals", "covenanter-hill"],
            startDate: momentToDate(moment().subtract(1, "days")),
            endDate: momentToDate(moment().add(1, "month")),
        },
        propertyId: "renaissance-rentals"
    },
};
