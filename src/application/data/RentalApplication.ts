import {CaptchaEnabledRequest} from "../../captcha/data/CaptchaEnabledRequest";


export interface RentalApplication extends CaptchaEnabledRequest {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    property: string;
    currentPage: string;
    community: string;
    address?: string;
    questions?: string;
}

export const defaultRentalApplication: RentalApplication = {
    firstName: "",
    lastName: "",
    email: "",
    property: "",
    currentPage: "",
    community: "",
}
