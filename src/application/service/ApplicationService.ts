import {RentalApplication} from "../data/RentalApplication";
import RenaissanceApi from "../../service/RenaissanceApi";

export const sendRentalApplicationRequest = (message: RentalApplication) => {
    return RenaissanceApi.post("application-request", message).then(response => response.data);
};
