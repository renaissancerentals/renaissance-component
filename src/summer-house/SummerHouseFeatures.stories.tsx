import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SummerHouseFeatures } from "./SummerHouseFeatures";

export default {
  title: "Summer House/Features",
  component: SummerHouseFeatures,
} as ComponentMeta<typeof SummerHouseFeatures>;

export const Default: ComponentStory<typeof SummerHouseFeatures> = () => (
  <SummerHouseFeatures />
);
