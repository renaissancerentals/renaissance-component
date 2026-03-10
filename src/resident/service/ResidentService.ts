import {Faq} from "../../faq/data/Faq";
import Api from "../../service/Api";

export const getResidentFaqs = async (): Promise<Faq[]> => {
    let response = await Api.get("faqs/resident");
    return await response.data;
};

export const getMaintenanceFaqs = async (): Promise<Faq[]> => {
    let response = await Api.get("faqs/maintenance");
    return await response.data;
};
