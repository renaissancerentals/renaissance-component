import React from "react";
import {Meta, Story} from "@storybook/react";
import {ContactSectionProps} from "./ContactSection";
import {ContactSectionSkeleton} from "./ContactSectionSkeleton";

export default {
    title: "Section/Contact Skeleton",
    component: ContactSectionSkeleton
} as Meta;

export const Default: Story<ContactSectionProps> = () => {
    return (
        <ContactSectionSkeleton/>
    );
};
