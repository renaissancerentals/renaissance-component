import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { TeamCard } from "./TeamCard";
import { TeamMember } from "../data/TeamMember";

export default {
  title: "Card/Team Card",
  component: TeamCard,
} as ComponentMeta<typeof TeamCard>;

export const Default: ComponentStory<typeof TeamCard> = () => {
  const member: TeamMember = {
    name: "John Cena",
    jobTitle: "Wrestler",
    blogLink: "https://myblog.com",
    email: "johncena@gmail.com",
  } as TeamMember;
  return <TeamCard member={member} propertyId="verona-park" />;
};
