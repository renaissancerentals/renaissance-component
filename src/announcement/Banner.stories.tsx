import React from "react";
import {Banner, BannerProps} from "./Banner";
import {Meta, Story} from "@storybook/react";
import {Button} from "@contentmunch/muncher-ui";

export default {
    title: "Section/Banner",
    component: Banner
} as Meta;

const Template: Story<BannerProps> = () => {
    return (
        <div>
            <p><strong>This section loads after 3 seconds</strong></p>
            <Banner>

                <section className="left">
                    <h2>Offices Are Safely Open</h2>
                    <p>
                        Our offices are open by appointment; walk-in's are also welcome.
                        We are now offering self-guided tours on-site in select units.
                    </p>
                    <Button onClick={() => {
                        console.log("contact clicked...")
                    }} size="small">Questions? contact us
                        ››</Button>
                </section>
                <section className="right">
                    <h2>Live, Virtual & Video Tours Available</h2>
                    <p>
                        Do you prefer to look for your next home from the comfort of your own living room?
                        Schedule a live video tour with our leasing team for a customized experience.We also
                        have Virtual 360&deg; Tours and Video Tours for you to view online at your
                        convenience.
                    </p>
                </section>
            </Banner>
        </div>
    );
};
export const Default = Template.bind({});
