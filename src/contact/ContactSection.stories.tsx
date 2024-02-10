import React from "react";
import {Meta, Story} from "@storybook/react";
import {ContactSection, ContactSectionProps} from "./ContactSection";

export default {
    title: "Section/Contact",
    component: ContactSection
} as Meta;

const Template: Story<ContactSectionProps> = (args) => {
    return (
        <ContactSection {...args}/>
    );
};
export const Default = Template.bind({});

Default.args = {
    subject: "Test email from ui.renaissancerentals.com",
}

export const WithContactNumber = Template.bind({});

WithContactNumber.args = {
    ...Default.args,
    contactNumber: "8123456789"
}
export const Long = Template.bind({});

Long.args = {
    subject: "Test email from ui.renaissancerentals.com",
    variant: "long"
}
