import {MAX_RENT, MIN_RENT} from "../../floorplan/data/Floorplan";
import {CaptchaEnabledRequest} from "../../captcha/data/CaptchaEnabledRequest";

export interface ContactMessage extends CaptchaEnabledRequest {
    name: string;
    phone: string;
    email: string;
    emailPreferred: boolean;
    phonePreferred: boolean;
    textPreferred: boolean;
    question: string;
    property: string;
    currentPage: string;
    additionalInfo?: AdditionalInfo;
}

export interface AdditionalInfo {
    amenities?: string;
    bedrooms?: number;
    floorPlan?: string;
    hearAboutUs?: string;
    lowerRent?: number;
    upperRent?: number;
    pets?: string;
    moveInDate?: string;
    communities?: string;
}

export const defaultContactMessage: ContactMessage = {
    property: "",
    name: "",
    phone: "0",
    email: "",
    emailPreferred: true,
    phonePreferred: false,
    textPreferred: false,
    question: "",
    currentPage: "",
    additionalInfo: {
        lowerRent: MIN_RENT,
        upperRent: MAX_RENT
    }
}
