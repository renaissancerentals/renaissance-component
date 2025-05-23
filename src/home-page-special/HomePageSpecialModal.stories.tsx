import type {Meta, StoryFn} from "@storybook/react";
import React from "react";

import {momentToDate} from "../utils/Utils";
import moment from "moment/moment";
import {HomePageSpecialModal} from "./HomePageSpecialModal";
import {HomePageSpecial} from "./data/HomePageSpecial";
import {Button} from "@contentmunch/muncher-ui";
import {useCookies} from "react-cookie";

const meta: Meta<typeof HomePageSpecialModal> = {
    component: HomePageSpecialModal,
    title: 'Modal/Home Page Special',
    decorators: [
        (Story) => (
            <div style={{padding: '2rem', background: '#f5f5f5'}}>
                <Story/>
            </div>)
    ]
};
export default meta;
type Story = StoryFn<typeof meta>;
const special: HomePageSpecial = {
    id: "id",
    title: "Neque porro quisquam est qui dolorem ipsum quia dolor sit am",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum laoreet luctus consequat. Phasellus venenatis gravida pellentesque. Sed malesuada, libero eget ullamcorper tempor, leo nisl bibendum libero, id dictum metus libero ac arcu malesuada arcu.",
    details: "<ul class=\"muncher-editor-list-ul\"><li value=\"1\" class=\"muncher-editor-listitem\"><span style=\"white-space: pre-wrap;\">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span></li><li value=\"2\" class=\"muncher-editor-listitem\"><span style=\"white-space: pre-wrap;\">Morbi fermentum neque in nulla tincidunt scelerisque.</span></li><li value=\"3\" class=\"muncher-editor-listitem\"><span style=\"white-space: pre-wrap;\">Maecenas vel massa sed risus consectetur aliquet.</span></li><li value=\"4\" class=\"muncher-editor-listitem\"><span style=\"white-space: pre-wrap;\">Praesent varius odio consectetur metus eui</span></li></ul>",
    image: "https://scholars-quad.herokuapp.com/api/asset/download/16xiRBxWnwpDBGDF8YTnOHp3BqFgNICvo",
    properties: ["renaissance-rentals", "covenanter-hill"],
    startDate: momentToDate(moment().subtract(1, "days")),
    endDate: momentToDate(moment().add(1, "month")),
}

const special1: HomePageSpecial = {
    id: "id1",
    title: "Flash Sale: SPECIAL PRICING ON SELECT UNITS",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dapibus, sapien a scelerisque imperdiet, enim lectus commodo augue, eu dapibus nunc neque ac elit. ",
    details: "<ul class=\"muncher-editor-list-ul\"><li value=\"1\" class=\"muncher-editor-listitem\"><span style=\"white-space: pre-wrap;\">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span></li><li value=\"2\" class=\"muncher-editor-listitem\"><span style=\"white-space: pre-wrap;\">Morbi fermentum neque in nulla tincidunt scelerisque.</span></li></ul>",
    image: "https://scholars-quad.herokuapp.com/api/asset/download/1w7shVoej3HEjVQdh7pWbq8GioITwVrF6",
    properties: ["renaissance-rentals", "covenanter-hill"],
    startDate: momentToDate(moment().subtract(1, "days")),
    endDate: momentToDate(moment().add(1, "month")),
}
const cookieName = 'renaissance-rentals-specialModalClosed';
export const Default: Story = () => {

    const [cookies, setCookie] = useCookies([cookieName]);

    return (<>
        This section loads after 3 seconds
        <Button variant="tertiary" onClick={() => {
            const thirtyDays = 60 * 60 * 24 * 30;
            setCookie(cookieName, false, {path: '/', maxAge: thirtyDays});
            window.location.reload();
        }}>Reset Cookie and Reload</Button>
        <HomePageSpecialModal homePageSpecials={[special, special1]} propertyId="renaissance-rentals"/>
    </>);
}


export const Single: Story = () => {
    const [cookies, setCookie] = useCookies([cookieName]);

    return (<>
        This section loads after 3 seconds
        <Button variant="tertiary" onClick={() => {
            const thirtyDays = 60 * 60 * 24 * 30;
            setCookie(cookieName, false, {path: '/', maxAge: thirtyDays});
            window.location.reload();
        }}>Reset Cookie and Reload</Button>
        <HomePageSpecialModal homePageSpecials={[special]} propertyId="renaissance-rentals"/>
    </>);
}

