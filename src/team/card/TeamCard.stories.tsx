import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {TeamCard} from "./TeamCard";
import {PropertyTeamMember} from "../data/TeamMember";

export default {
    title: "Card/Team Card",
    component: TeamCard
} as ComponentMeta<typeof TeamCard>;

export const Default: ComponentStory<typeof TeamCard> = () => {
    const member: PropertyTeamMember = {
        name: "John Cena",
        jobTitle: "Wrestler",
        blogLink: "https://myblog.com",
        email: "johncena@gmail.com"
    } as PropertyTeamMember;
    return (
        <TeamCard member={member} propertyId="verona-park"/>
    );
};