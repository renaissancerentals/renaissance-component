import {CaptchaEnabledRequest} from "../../captcha/data/CaptchaEnabledRequest";


export interface RentalApplication extends CaptchaEnabledRequest {
    name: string;
    email: string;
    subject: string;
    property: string;
    address?: string;
    phone?: string;
    questions?: string;
    currentPage: string;
}
