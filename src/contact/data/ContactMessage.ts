import {MAX_RENT, MIN_RENT} from "../../floorplan/data/Floorplan";

export interface ContactMessage {
    to?: string;
    subject?: string;
    captchaResponse: string;
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
    captchaResponse: "",
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
