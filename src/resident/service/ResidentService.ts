import {get} from "../../service/RoundRobin";
import {ResidentFaq} from "../data/Resident";

export const getResidentFaqs = async (): Promise<ResidentFaq[]> => {
    let response = await get("residentFaqs?projection=withId&size=50");
    return await response.data._embedded.residentFaqs;
};
