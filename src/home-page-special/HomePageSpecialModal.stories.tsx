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
    description: "High-end, luxurios, unique apartments and townhomes available for rent this summer",
    image: "https://drive.google.com/uc?id=1NJSraw9EOii8eHhgBaa31-tj6FECvYPA&export=download",
    properties: ["covenanter-hill", "high-grove", "renaissance-rentals"],
    startDate: momentToDate(moment().subtract(1, "days")),
    endDate: momentToDate(moment().add(1, "month")),
    links: [
        {
            x: 3.750003912510016,
            y: 85.00000859650088,
            width: 23.076923076923077,
            height: 7.922535211267606,
            url: "https://www.veronaparkneighborhood.com/"
        },
        {
            x: 29.39102955353566,
            y: 85.00000859650088,
            width: 20.993589743589745,
            height: 7.746478873239436,
            url: "https://www.highgrovebloomington.com/"
        }
    ]
}

const special1: HomePageSpecial = {
    id: "29686",
    description: "TEst",
    image: "https://drive.google.com/uc?id=1SwftE1RyvuGxybGFQoy2AqDxHz3U-Mjl&export=download",
    startDate: momentToDate(moment().subtract(1, "days")),
    endDate: momentToDate(moment().add(1, "month")),
    properties: ["covenanter-hill", "high-grove", "renaissance-rentals"],
    links: [
        {
            x: 2.1886000072847027,
            y: 58.892991182109085,
            width: 10.696692470091484,
            height: 6.088560885608856,
            url: "http://www.google.com"
        }
    ]
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
        <HomePageSpecialModal homePageSpecial={special} propertyId="renaissance-rentals"/>
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
        <HomePageSpecialModal homePageSpecial={special1} propertyId="renaissance-rentals"/>
    </>);
}

