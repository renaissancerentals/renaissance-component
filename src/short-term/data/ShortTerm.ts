import {AmenityName} from "../../floorplan/data/Floorplan";
import {PropertySummary} from "../../property/data/Property";

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
    property: PropertySummary;
    description: string;
    address: string;
    zipcode: string;
    highlights: string;
    squareFoot: number;
    priceFor2To4Days: string;
    priceFor5To13Days: string;
    priceFor14To29Days: string;
    priceFor1To4Months: string;
    priceFor4andMoreMonths: string;
}

