import {PropertyTeamMember} from "../data/TeamMember";
import AdminApi from "../../service/AdminApi";


export const getAllTeamMembers = (): Promise<PropertyTeamMember[]> => {
    return AdminApi.get("teamMembers?projection=propertyTeamMember&size=100").then(response => response.data._embedded.teamMembers);
};
