import {FloorplanCardData, FloorplanDetails} from "../../floorplan/data/Floorplan";
import {PropertyTeamMember} from "../../team/data/TeamMember";

export interface PropertyName {
    id: string;
    name: string;
    active: boolean;
}

export interface Property {
    name: string;
    id: string;
    address: string;
    zipcode: string;
    active: boolean;
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
    propertyFolderId: string;
    photosFolderId: string;
    youtubeLink: string;
    ratingLink: string;
    conversionTrackingId1: string;
    conversionTrackingId2: string;
    teamMembers: PropertyTeamMember[];
    busRoutes: PropertyBusRoute[];
    leaseType: LeaseType;
}

export interface PropertyBusRoute {
    busRoute: string;
    busRouteLink: string;

}

export interface PropertyDetails extends Property {
    floorplans: FloorplanDetails[];
}

export interface PropertyFilterData {
    name: string;
    active: boolean;
    leaseType: LeaseType;
    floorplans: FloorplanCardData[];
}

export enum LeasingOfficeType {
    OFF_SITE = "OFF_SITE", ON_SITE = "ON_SITE"
}

export enum LeaseType {
    YEARLY = "YEARLY", SHORT_TERM = "SHORT_TERM"
}


export interface PropertyAmenityName {
    id: string;
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

export const PropertiesEmail: any = {
    "Covenanter Hill": "covenanterhill@renaissancerentals.com",
    "HighGrove": "meadowcreek@renaissancerentals.com",
    "Huntington Gardens": "covenanterhill@renaissancerentals.com",
    "Scholar's Quad": "quad@renaissancerentals.com",
    "Scholar's Rock": "scholars@renaissancerentals.com",
    "Scholar's Rooftop": "scholars@renaissancerentals.com",
    "SummerHouse at Indiana": "summerhouse@renaissancerentals.com",
    "Townhomes At MeadowCreek": "meadowcreek@renaissancerentals.com",
    "Verona Park": "veronapark@renaissancerentals.com",
    "Other": "inquiries@renaissancerentals.com"
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

