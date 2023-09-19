import React from "react";
import {Meta, Story} from "@storybook/react";
import {FloorplanCardSkeleton} from "./FloorplanCardSkeleton";

export default {
    title: "Card/Floorplan Card Skeleton",
    component: FloorplanCardSkeleton
} as Meta;

export const Default: Story = () => {

    return (
        <FloorplanCardSkeleton/>
    );
};
