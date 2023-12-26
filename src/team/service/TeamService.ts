import {PropertyTeamMember} from "../data/TeamMember";
import {get} from "../../service/RoundRobin";


export const getAllTeamMembers = (): Promise<PropertyTeamMember[]> => {
    return get("teamMembers?projection=propertyTeamMember&size=100").then(response => response.data._embedded.teamMembers);
};
