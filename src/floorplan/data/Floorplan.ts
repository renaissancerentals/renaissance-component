import {Unit, UnitCardData, UnitDetails} from "./Unit";
import {LeaseType, PropertyBusRoute} from "../../property/data/Property";

export const MIN_RENT = 0;
export const MAX_RENT = 4000;

export enum FloorplanStyle {
    STUDIO = "STUDIO",
    APARTMENT = "APARTMENT",
    DELUXE_APARTMENT = "DELUXE_APARTMENT",
    TOWN_HOME = "TOWN_HOME",
    SINGLE_FAMILY = "SINGLE_FAMILY",
    GARAGE = "GARAGE"
}

export enum AmenityType {
    KITCHEN = "KITCHEN",
    LIVING_AND_BEDROOM = "LIVING_AND_BEDROOM",
    BATHROOM = "BATHROOM",
    OUTDOOR = "OUTDOOR",
    HEATING_COOLING_AND_WIRING = "HEATING_COOLING_AND_WIRING",
    SMART_LIVING = "SMART_LIVING",
    PARKING = "PARKING",
    NOT_APPLICABLE = "NOT_APPLICABLE"
}

export interface AmenityName {
    id: string;
    name: string;
    featured: boolean;
    type: AmenityType;
}

export interface UtilityName {
    id: number;
    name: string;
    type: UtilityType;
    averageMonthlyBill: number;
}

export enum UtilityType {
    RESIDENT_UTILITY = "RESIDENT_UTILITY", INCLUDED_UTILITY = "INCLUDED_UTILITY"
}

export interface FloorplanDetails {
    id: string;
    name: string;
    bedroom: number;
    bathroom: number;
    style: FloorplanStyle;
    specialRent: number,
    specialRentStartDate: string,
    specialRentEndDate: string,
    featured: boolean;
    greenCertified: boolean;
    videoTourLink: string | null;
    threeSixtyVideoTourLink: string | null;
    virtualTourLink: string | null;
    photo: string,
    coverImage: string,
    floorPlanFolderId: string;
    photosFolderId: string;
    amenities: AmenityName[];
    units: UnitDetails[];
    active: boolean;
    webSpecials: WebSpecialDetails[];
}

export interface FloorplanCardData {
    id: string;
    name: string;
    active: boolean;
    bedroom: number;
    bathroom: number;
    coverImage: string;
    featured: boolean;
    style: FloorplanStyle;
    specialRent: number,
    specialRentStartDate: string,
    specialRentEndDate: string,
    virtualTourLink: string;
    videoTourLink: string;
    photosFolderId: string;
    units: UnitCardData[];
    webSpecials: string [];
}

export interface Floorplan {
    id: string;
    name: string;
    bedroom: number;
    bathroom: number;
    style: FloorplanStyle;
    featured: boolean;
    patioIncluded: boolean;
    greenCertified: boolean;
    videoTourLink: string;
    threeSixtyVideoTourLink: string;
    virtualTourLink: string;
    photo: string | null,
    coverImage: string | null,
    floorPlanFolderId: string;
    photosFolderId: string;
    address: string;
    zipcode: string;
    description: string;
    vanityLink: string;
    specialRent: number,
    specialRentStartDate: string,
    specialRentEndDate: string,
    htmlTitle: string;
    metaDescription: string;
    conversionTrackingId1: string;
    conversionTrackingId2: string;
    customCode: string;
    utilities: UtilityName[];
    amenities: AmenityName[];
    property: PropertyName;
    units: Unit[];
    lastModifiedBy: string;
    lastModifiedDate: string;
    active: boolean;
    webSpecials: WebSpecialDetails[];
}

export interface FloorplanSpotlight {
    id: string;
    name: string;
    metaDescription: string;
    bedroom: number;
    bathroom: number;
    style: FloorplanStyle;
    featured: boolean;
    coverImage: string;
    units: UnitSpotlight[];
    active: boolean;
    property: PropertyName;
}

export interface UnitSpotlight {
    id: string;
    squareFoot: number;
    rent: number;
    active: boolean;
}

export interface PropertyName {
    name: string;
    id: string;
    active: boolean;
    email: string;
    phone: string;
    address: string;
    zipcode: string;
    busRoutes: PropertyBusRoute[];
    leaseType: LeaseType;
}

export interface FloorplanName {
    name: string;
    id: string;
    active: boolean;
}

export interface SimilarFloorplan {
    similarTo: FloorplanName;
}

export interface FloorplanVariation {
    variation: string;
}

export interface Testimonial {
    testimonial: string;
    tenant: string;
}

export interface WebSpecial {
    description: string;
    startDate: string;
    endDate: string;
}

export interface WebSpecialDetails extends WebSpecial {
    id: string;
}
