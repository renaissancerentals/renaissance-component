import {CaptchaEnabledRequest} from "../../captcha/data/CaptchaEnabledRequest";

export interface SubletMessage extends CaptchaEnabledRequest {
    message: string;
    name: string;
    email: string;
}
