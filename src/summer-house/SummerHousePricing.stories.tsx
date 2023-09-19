import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {SummerHousePricing} from "./SummerHousePricing";

export default {
    title: "Summer House/Pricing",
    component: SummerHousePricing
} as ComponentMeta<typeof SummerHousePricing>;

export const Default: ComponentStory<typeof SummerHousePricing> = () => <SummerHousePricing/>;