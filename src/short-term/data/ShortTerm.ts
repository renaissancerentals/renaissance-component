import {AmenityName, PropertyName} from "../../floorplan/data/Floorplan";

export enum ShortTermStyle {
    STUDIO = "STUDIO",
    APARTMENT = "APARTMENT",
    DELUXE_APARTMENT = "DELUXE_APARTMENT",
    TOWN_HOME = "TOWN_HOME",
    SINGLE_FAMILY = "SINGLE_FAMILY"
}

export interface FloorplanShortTerm {
    id: string;
    name: string;
    bedroom: number;
    bathroom: number;
    style: ShortTermStyle;
    videoTourLink: string;
    threeSixtyVideoTourLink: string;
    virtualTourLink: string;
    photo: string | null,
    coverImage: string | null,
    photosCount: number;
    floorPlanFolderId: string;
    photosFolderId: string;
    htmlTitle: string;
    metaDescription: string;
    conversionTrackingId1: string;
    conversionTrackingId2: string;
    customCode: string;
    amenities: AmenityName[];
    active: boolean;
    shortTerm: ShortTerm;
    property: PropertyName;
    description: string;
    address: string;
    zipcode: string;
    highlights: string;
}

export interface ShortTerm {
    id: string;
    squareFoot: number;
    priceFor2To4Days: number;
    priceFor5To13Days: number;
    priceFor14To29Days: number;
    priceFor1To4Months: number;
    priceFor4andMoreMonths: number;
}
