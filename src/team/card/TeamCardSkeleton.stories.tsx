import React from "react";
import {Meta, Story} from "@storybook/react";
import {TeamCardSkeleton} from "./TeamCardSkeleton";

export default {
    title: "Card/Team Card Skeleton",
    component: TeamCardSkeleton
} as Meta;

export const Default: Story = () => {

    return (
        <TeamCardSkeleton/>
    );
};