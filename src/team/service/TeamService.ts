import {TeamMember} from "../data/TeamMember";
import RenaissanceApi from "../../service/RenaissanceApi";


export const getAllTeamMembers = (): Promise<TeamMember[]> => {
    return RenaissanceApi.get("teamMembers").then(response => response.data);
};
