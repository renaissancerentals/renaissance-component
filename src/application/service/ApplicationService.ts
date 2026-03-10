import {RentalApplication} from "../data/RentalApplication";
import Api from "../../service/Api";

export const sendRentalApplicationRequest = (message: RentalApplication) => {
    return Api.post("application-request", message).then(response => response.data);
};
