import {get} from "../../service/RoundRobin";
import {Faq} from "../../faq/data/Faq";

export const getResidentFaqs = async (): Promise<Faq[]> => {
    let response = await get("residentFaqs?projection=withId&size=50");
    return await response.data._embedded.residentFaqs;
};

export const getMaintenanceFaqs = async (): Promise<Faq[]> => {
    let response = await get("maintenanceFaqs?projection=withId&size=50");
    return await response.data._embedded.maintenanceFaqs;
};
