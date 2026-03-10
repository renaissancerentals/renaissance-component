import {TeamMember} from "../data/TeamMember";
import Api from "../../service/Api";


export const getAllTeamMembers = (): Promise<TeamMember[]> => {
    return Api.get("teamMembers").then(response => response.data);
};
