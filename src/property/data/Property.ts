import {FloorplanCardData, FloorplanDetails} from "../../floorplan/data/Floorplan";
import {TeamMember} from "../../team/data/TeamMember";

export interface PropertySpotlight extends Address {
    id: string;
    name: string;
}

export interface Address {
    address: string;
    zipcode: string;
}

export interface Property {
    name: string;
    id: string;
    address: string;
    zipcode: string;
    phone: string;
    email: string;
    rating: number,
    amenities: PropertyAmenityName[];
    description: string;
    secondaryEmail: string;
    facebookLink: string;
    twitterLink: string;
    htmlTitle: string;
    metaDescription: string;
    logo: string | null;
    leasingOfficeType: LeasingOfficeType;
    leasingOffice?: LeasingOffice;
    coverImage: string | null;
    coverVideo: string | null;
    propertyFolderId: string;
    photosFolderId: string;
    youtubeLink: string;
    ratingLink: string;
    conversionTrackingId1: string;
    conversionTrackingId2: string;
    teamMembers: TeamMember[];
    busRoutes: PropertyBusRoute[];
    leaseType: LeaseType;
}

export interface PropertyBusRoute {
    busRoute: string;
    busRouteLink: string;

}

export interface PropertySummary {
    name: string;
    id: string;
    email: string;
    phone: string;
    address: string;
    zipcode: string;
    busRoutes: PropertyBusRoute[];
    leaseType: LeaseType;
}

export interface PropertyDetails extends Property {
    floorplans: FloorplanDetails[];
}

export interface PropertyFilterData {
    id: string
    name: string;
    floorplans: FloorplanCardData[];
}

export enum LeasingOfficeType {
    OFF_SITE = "OFF_SITE", ON_SITE = "ON_SITE"
}

export enum LeaseType {
    YEARLY = "YEARLY", SHORT_TERM = "SHORT_TERM"
}


export interface PropertyAmenityName {
    name: string;
    type: PropertyAmenityType;
    featured: boolean;
}

export enum PropertyAmenityType {
    SMART_LIVING = "SMART_LIVING", SERVICES = "SERVICES", AMENITIES = "AMENITIES"
}

export interface LeasingOffice {
    id: string,
    name: string,
    address: string,
    zipcode: string,
    phone: string,
    officeHours: string,
    direction: string,
    officeMap: string | null,
    officeMapLandscape: string | null,
    officeImage: string | null,
    officeImageDescription: string,
}

export type PropertyId =

    "arch-haven" |
    "cov-affordable" |
    "covenanter-hill" |
    "high-grove" |
    "huntington-gardens" |
    "sh-garages" |
    "scholars-quad" |
    "scholars-rock" |
    "scholars-rooftop" |
    "summer-house" |
    "summer-house-short-term" |
    "verona-park";


export const PropertyNameIds: any = {
    "Arch Haven": "arch-haven",
    "Covenanter Hill": "covenanter-hill",
    "HighGrove": "high-grove",
    "Huntington Gardens": "huntington-gardens",
    "Scholar's Quad": "scholars-quad",
    "Scholar's Rock": "scholars-rock",
    "Scholar's Rooftop": "scholars-rooftop",
    "SummerHouse at Indiana": "summer-house",
    "Townhomes At MeadowCreek": "meadow-creek",
    "Verona Park": "verona-park",
    "Other": "other"
};

export type PropertyType =
    "Covenanter Hill"
    | "HighGrove"
    | "Huntington Gardens"
    | "Scholar's Quad"
    | "Scholar's Rock"
    | "Scholar's Rooftop"
    | "SummerHouse at Indiana"
    | "Verona Park"

export interface PropertyFaq {
    id: string;
    question: string;
    answer: string;
    sortOrder: number;
}
