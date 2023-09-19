import React from "react";
import {Meta, Story} from "@storybook/react";
import {Captcha, CaptchaProps} from "./Captcha";

export default {
    title: "Component/Captcha",
    component: Captcha
} as Meta;

export const Default: Story<CaptchaProps> = () => {
    return (
        <Captcha setCaptchaResponse={(captchaResponse) => {
            console.log(captchaResponse)
        }}/>
    );
};