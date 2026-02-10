import {CaptchaEnabledRequest} from "../../captcha/data/CaptchaEnabledRequest";


export interface RentalApplication extends CaptchaEnabledRequest {
    name: string;
    email: string;
    phone?: string;
    property: string;
    currentPage: string;
    community: string;
    address?: string;
    questions?: string;
}

export const defaultRentalApplication: RentalApplication = {
    name: "",
    email: "",
    property: "",
    currentPage: "",
    community: "",
}
