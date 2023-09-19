import React, {useEffect, useState} from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {TeamSection} from "./TeamSection";
import {PropertyDetails} from "../property/data/Property";
import {getProperty} from "../property/service/PropertyService";
import {getAllTeamMembers} from "./service/TeamService";
import {PropertyTeamMember} from "./data/TeamMember";

export default {
    title: "Section/Team",
    component: TeamSection

} as ComponentMeta<typeof TeamSection>;

export const Default: ComponentStory<typeof TeamSection> = () => {
    const [property, setProperty] = useState<PropertyDetails>({} as PropertyDetails);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getProperty("verona-park").then(data => {
            setProperty(data);
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);
    return (<TeamSection isLoading={isLoading} teamMembers={property.teamMembers} propertyId="verona-park"/>)
};

export const All: ComponentStory<typeof TeamSection> = () => {
    const [teamMembers, setTeamMembers] = useState<PropertyTeamMember[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getAllTeamMembers().then(data => {
            setTeamMembers(data);
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);
    return (<TeamSection isLoading={isLoading} teamMembers={teamMembers} propertyId="verona-park"/>)
};