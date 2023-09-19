import React from "react";
import {Footer, FooterProps} from "./Footer";
import {Meta, Story} from "@storybook/react";

export default {
    title: "Section/Footer",
    component: Footer
} as Meta;

const Template: Story<FooterProps> = () => {
    return (
        <Footer nav={
            <ul>
                <li><a href="/apply">apply</a></li>
                <li><a href="/contact">contact</a></li>
                <li><a href="/search">search</a></li>
                <li><a href="/maintenance">maintenance</a></li>
                <li><a href={"tel:8123332280"}>812-333-2280</a></li>
            </ul>}/>
    );
};
export const Default = Template.bind({});