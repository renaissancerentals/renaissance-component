export enum Pet {
    NO_PET = "NO_PET", CAT = "CAT", SMALL_DOG_CAT = "SMALL_DOG_CAT", LARGE_DOG_SMALL_DOG_CAT = "LARGE_DOG_SMALL_DOG_CAT"
}

export interface UnitDetails extends UnitCardData {
    id: string;
    allowedPet: Pet;
    garages: number;
    furnished: boolean;

}

export interface Unit extends UnitCardData {
    id: string;
    allowedPet: Pet;
    petPolicy: string;
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
    photosLink: string;
    videoTourLink: string;
    threeSixtyVideoTourLink: string;
    virtualTourLink: string;
    lastModifiedBy: string;
    lastModifiedDate: string;
}

export interface UnitCardData {
    rent: number;
    discountedRent: number;
    deposit: number;
    squareFoot: number;
    active: boolean;
    moveInDate: string;
}

export enum Level {
    GROUND = "GROUND", MIDDLE = "MIDDLE", TOP = "TOP", MULTI = "MULTI"
}

export enum UnitTurnoverRate {
    FOUR_DAYS = "FOUR_DAYS", FIVE_DAYS = "FIVE_DAYS"
}
