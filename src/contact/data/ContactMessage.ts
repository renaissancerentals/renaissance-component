import {MAX_RENT, MIN_RENT} from "../../floorplan/data/Floorplan";
import {CaptchaEnabledRequest} from "../../captcha/data/CaptchaEnabledRequest";

export interface ContactMessage extends CaptchaEnabledRequest {
    to?: string;
    subject?: string;
    name: string;
    phone: number;
    email: string;
    emailPreferred: boolean;
    phonePreferred: boolean;
    textPreferred: boolean;
    question: string;
    communities: string;
    currentPage: string;
    additionalInfo?: AdditionalInfo;
}

export interface AdditionalInfo {
    bedrooms?: number;
    moveInDate?: string;
    amenities?: string;
    pets?: string;
    floorPlan?: string;
    hearAboutUs?: string;
    lowerRent: number;
    upperRent: number;
}

export const defaultContactMessage: ContactMessage = {
    name: "",
    phone: 0,
    email: "",
    emailPreferred: true,
    phonePreferred: false,
    textPreferred: false,
    question: "",
    communities: "",
    currentPage: "",
    additionalInfo: {
        lowerRent: MIN_RENT,
        upperRent: MAX_RENT
    }

}
