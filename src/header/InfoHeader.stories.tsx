import React from "react";
import {Meta, Story} from "@storybook/react";
import {InfoHeader, InfoHeaderProps} from "./InfoHeader";

export default {
    title: "Header/ Info Header"
} as Meta;

export const Default: Story<InfoHeaderProps> = () => {
    return (
        <InfoHeader>
            <p>This is info header</p>
        </InfoHeader>
    );
};