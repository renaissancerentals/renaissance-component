export enum Pet {
    NO_PET = "NO_PET", CAT = "CAT", SMALL_DOG_CAT = "SMALL_DOG_CAT", LARGE_DOG_SMALL_DOG_CAT = "LARGE_DOG_SMALL_DOG_CAT"
}

export interface UnitDetails {
    id: string;
    squareFoot: number;
    allowedPet: Pet;
    rent: number;
    discountedRent: number | null;
    deposit: number;
    garages: number;
    moveInDate: string | null;
    availabilityExtensionMonths: number | null;
    furnished: boolean;
    active: boolean;
}

export interface Unit {
    id: string;
    squareFoot: number;
    allowedPet: Pet;
    petPolicy: string;
    rent: number;
    discountedRent: number;
    deposit: number;
    endUnit: boolean;
    furnished: boolean;
    murphyBedProvided: boolean;
    affordableHousing: boolean;
    level: Level;
    garages: number;
    turnoverRate: UnitTurnoverRate;
    address: string;
    zipcode: string;
    billingLink: string;
    moveInDate: string;
    availabilityExtensionMonths: number | null;
    photosLink: string;
    videoTourLink: string;
    threeSixtyVideoTourLink: string;
    virtualTourLink: string;
    lastModifiedBy: string;
    lastModifiedDate: string;
    active: boolean;
}

export interface UnitCardData {
    rent: number;
    squareFoot: number;
    active: boolean;
    moveInDate: string;
    availabilityExtensionMonths: number | null;
}

export enum Level {
    GROUND = "GROUND", MIDDLE = "MIDDLE", TOP = "TOP", MULTI = "MULTI"
}

export enum UnitTurnoverRate {
    FOUR_DAYS = "FOUR_DAYS", FIVE_DAYS = "FIVE_DAYS"
}
