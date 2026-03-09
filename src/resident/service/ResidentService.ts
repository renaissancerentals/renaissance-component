import {get} from "../../service/RoundRobin";
import {Faq} from "../../faq/data/Faq";
import RenaissanceApi from "../../service/RenaissanceApi";

export const getResidentFaqs = async (): Promise<Faq[]> => {
    let response = await RenaissanceApi.get("faqs/resident");
    return await response.data;
};

export const getMaintenanceFaqs = async (): Promise<Faq[]> => {
    let response = await RenaissanceApi.get("faqs/maintenance");
    return await response.data;
};
