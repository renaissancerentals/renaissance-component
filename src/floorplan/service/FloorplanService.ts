import _ from 'lodash';
import {CurrentFloorplanFilters, FloorplanFilters} from "../data/FloorplanFilters";
import moment, {Moment} from "moment";
import {
    Floorplan,
    FloorplanCardData,
    FloorplanDetails,
    FloorplanSpotlight,
    FloorplanStyle,
    FloorplanVariation,
    SimilarFloorplan,
    Testimonial,
    WebSpecial
} from "../data/Floorplan";
import {dateToMoment, minimumMaximum} from "../../utils/Utils";
import {PropertyId} from "../../property/data/Property";
import {get} from "../../service/RoundRobin";
import {renaissance} from "../../data/RenaissanceData";
import {Pet, Unit} from "../../unit/data/Unit";
import {Month} from "../../data/Calendar";
import {SortBy, SortFields} from "../../data/SortField";

export const AVAILABLE_NOW = "Available Now";
const today = moment();
const tomorrow = today.add(1, "day");


export const convertToHttps = (url: string): string => {
    if (url === null)
        return "";
    return url.replace(/^http:\/\//i, 'https://');
};

export const convertToFloorplanCardData = (floorplanDetails: FloorplanDetails): FloorplanCardData => {
    return {
        id: floorplanDetails.id,
        name: floorplanDetails.name,
        active: floorplanDetails.active,
        bedroom: floorplanDetails.bedroom,
        bathroom: floorplanDetails.bathroom,
        coverImage: floorplanDetails.coverImage,
        featured: floorplanDetails.featured,
        style: floorplanDetails.style,
        specialRent: floorplanDetails.specialRent,
        specialRentStartDate: floorplanDetails.specialRentStartDate,
        specialRentEndDate: floorplanDetails.specialRentEndDate,
        address: floorplanDetails.address,
        zipcode: floorplanDetails.zipcode,
        virtualTourLink: floorplanDetails.virtualTourLink,
        videoTourLink: floorplanDetails.videoTourLink,
        photosFolderId: floorplanDetails.photosFolderId,
        units: floorplanDetails.units,
        webSpecials: floorplanDetails.webSpecials
            .filter(webSpecial => today.isBetween(dateToMoment(webSpecial.startDate), dateToMoment(webSpecial.endDate)))
            .map(webSpecial => webSpecial.description)
    } as FloorplanCardData;
}
export const getFloorplansFilterData = async (propertyId: PropertyId): Promise<FloorplanCardData[]> => {
    let response = await get("properties/" + propertyId + "/floorplans/filter");

    const floorplans: FloorplanCardData[] = response.data
        .filter((floorplan: FloorplanCardData) => floorplan.active);

    floorplans.forEach(floorplan => {
        floorplan.units = floorplan.units.filter(unit => unit.active);
    });

    return floorplans;
};
export const sortAndFilter = (floorplans: FloorplanCardData[], currentFilters: CurrentFloorplanFilters): FloorplanCardData[] => {
    return sortFloorplans(floorplans.filter(floorplan => filterMatches(floorplan, currentFilters)), currentFilters.sortBy);
};

export const isDateWithinTwelveMonths = (date: string) => {
    const diff = moment(date, "YYYY-MM-DD").diff(today, 'months', false);
    return diff >= 0 && diff <= 12;
}
export const isDateAfterToday = (date: string) => {
    return moment(date, "YYYY-MM-DD").isAfter(today);
}
export const MONTH_YEAR_FORMAT = "MMMM YYYY";
const dateToMonthYear = (dateString: string | null): string => moment(dateString, "YYYY-MM-DD").format(MONTH_YEAR_FORMAT);

export const isAvailableNow = (moveInDate: moment.Moment) => moveInDate.isBefore(tomorrow);

export const defaultAvailabilityToMonthYear = (dateString: string): string =>
    AVAILABLE_NOW === dateString ? dateString : moment(dateString, "MM-YYYY").format(MONTH_YEAR_FORMAT);

export const momentToMonthYear = (date: Moment) => date.format(MONTH_YEAR_FORMAT);


const isAvailable = (floorplan: FloorplanCardData, availabilityFilters: Month[]): boolean => {

    return availabilityFilters.length === 0 ? true :

        floorplan.units.some((unit) => {
                const isUnitAvailableNow = isAvailableNow(moment(unit.moveInDate))
                if (availabilityFilters.indexOf(AVAILABLE_NOW) > -1 || availabilityFilters.indexOf(momentToMonthYear(today)) > -1) {
                    if (isUnitAvailableNow)
                        return true;
                }

                if (unit.availabilityExtensionMonths && unit.availabilityExtensionMonths > 0) {
                    for (let i = 1; i <= unit.availabilityExtensionMonths; i++) {
                        let extensionDate = isUnitAvailableNow ?
                            moment().add(i, 'month').format(MONTH_YEAR_FORMAT) :
                            dateToMoment(unit.moveInDate).add(i, 'month').format(MONTH_YEAR_FORMAT);
                        if (availabilityFilters.indexOf(extensionDate) > -1) {
                            return true;
                        }
                    }
                }
                return availabilityFilters.indexOf(dateToMonthYear(unit.moveInDate)) > -1;
            }
        );
};
const isBedroomsMatch = (floorplan: FloorplanCardData, bedroomFilters: number[]): boolean => {
    return bedroomFilters.length === 0 ? true : bedroomFilters.indexOf(floorplan.bedroom) > -1;
};
const isStyleMatch = (floorplan: FloorplanCardData, styleFilters: FloorplanStyle[]): boolean => {
    return styleFilters.length === 0 ? true : styleFilters.indexOf(floorplan.style) > -1;
}

const isInPriceRange = (
    floorplan: FloorplanCardData,
    minRent: number,
    maxRent: number
): boolean => {
    const { min } = minimumMaximum(floorplan.units, "rent");

    // If a special rent exists and is within range, show it
    if (
        floorplan.specialRent != null &&
        floorplan.specialRent >= minRent &&
        floorplan.specialRent <= maxRent
    ) {
        return true;
    }

    // Otherwise, just check if the cheapest unit fits
    return min >= minRent && min <= maxRent;
};
const isFloorplanIdsMatch = (floorplan: FloorplanCardData, floorplanIds: string[]): boolean => {
    return floorplanIds.length === 0 ? true : floorplanIds.indexOf(floorplan.id) > -1;
};
const filterMatches = (floorplan: FloorplanCardData, currentFilters: CurrentFloorplanFilters) => {
    return isAvailable(floorplan, currentFilters.availabilityFilters) &&
        isInPriceRange(floorplan, currentFilters.minRent, currentFilters.maxRent) &&
        isStyleMatch(floorplan, currentFilters.styleFilters) &&
        isBedroomsMatch(floorplan, currentFilters.bedroomFilters) &&
        isFloorplanIdsMatch(floorplan, currentFilters.floorplanIds);
}
export const sortFloorplans = (floorplans: FloorplanCardData[], sortBy: SortBy): FloorplanCardData[] => {

    if (SortFields[sortBy].sortField === "minRate" && SortFields[sortBy].order === "desc") {
        return floorplans.sort((a, b) => minimumMaximum(b.units, "rent").min - minimumMaximum(a.units, "rent").min);
    }

    const minRateSorted = floorplans.sort((a, b) => minimumMaximum(a.units, "rent").min - minimumMaximum(b.units, "rent").min);
    if (SortFields[sortBy].sortField === "minRate" && SortFields[sortBy].order === "asc") {
        return minRateSorted
    }
    return _.orderBy(minRateSorted, SortFields[sortBy].sortField, SortFields[sortBy].order);
};


export const filtersFrom = (floorplans: FloorplanCardData[]): FloorplanFilters => {

        const bedroomFilters = new Set<number>();
        const availabilityFilters = new Set<string>();
        const styleFilters = new Set<FloorplanStyle>();

        availabilityFilters.add(AVAILABLE_NOW);
        floorplans.forEach(floorplan => {
                bedroomFilters.add(floorplan.bedroom);
                styleFilters.add(floorplan.style);

                floorplan.units.forEach((unit) => {

                    const isUnitAvailableNow = isAvailableNow(moment(unit.moveInDate));

                    if (unit.moveInDate && isUnitAvailableNow) {
                        if (unit.availabilityExtensionMonths && unit.availabilityExtensionMonths > 0) {
                            for (let i = 1; i <= unit.availabilityExtensionMonths; i++) {
                                let extensionDate = moment().add(i, 'month');
                                availabilityFilters.add(extensionDate.format(MONTH_YEAR_FORMAT));
                            }
                            availabilityFilters.add(moment().format(MONTH_YEAR_FORMAT));
                        }
                    }
                    if (unit.moveInDate && !isUnitAvailableNow && isDateWithinTwelveMonths(unit.moveInDate)) {

                        availabilityFilters.add(dateToMonthYear(unit.moveInDate));
                        if (unit.availabilityExtensionMonths && unit.availabilityExtensionMonths > 0) {
                            for (let i = 1; i <= unit.availabilityExtensionMonths; i++) {
                                let extensionDate = dateToMoment(unit.moveInDate).add(i, 'month');
                                availabilityFilters.add(extensionDate.format(MONTH_YEAR_FORMAT));
                            }
                        }
                    }

                });
            }
        );
        return {
            bedroom: bedroomFilters,
            availability: availabilityFilters,
            style: styleFilters
        }
    }
;


export const getFeaturedFloorplans = async (): Promise<FloorplanSpotlight[]> => {

    let response = await get("floorplans?projection=spotlight&size=200");
    return await response.data._embedded.floorplans.filter((floorplan: FloorplanSpotlight) => floorplan.featured && floorplan.property.active);
};

export const getAllActiveFloorplans = async (): Promise<FloorplanDetails[]> => {

    const response = await get("floorplans?projection=details&size=200");
    return response.data._embedded.floorplans
        .filter((floorplan: Floorplan) => floorplan.active)
        .filter((floorplan_1: Floorplan) => floorplan_1.style !== "GARAGE");
};

export const getFloorplan = (floorplanId: string): Promise<Floorplan> =>
    get("floorplans/" + floorplanId + "?projection=withId").then(response => response.data);

export const getSimilarFloorplans = (floorplanId: string): Promise<SimilarFloorplan[]> =>
    get("similarFloorplans/search/byFloorplanId?projection=withId&floorplanId=" + floorplanId).then(response => response.data._embedded.similarFloorplans);

export const getFloorplanVariations = (floorplanId: string): Promise<FloorplanVariation[]> =>
    get("floorplanVariations/search/byFloorplanId?projection=withId&floorplanId=" + floorplanId).then(response => response.data._embedded.floorplanVariations);

export const isFloorplanAvailable = (floorplan: Floorplan | FloorplanCardData): boolean => floorplan.units.some((unit) => today.isAfter(dateToMoment(unit.moveInDate)));
export const getTestimonials = (floorplanId: string): Promise<Testimonial[]> =>
    get("testimonials/search/byFloorplanId?projection=withId&floorplanId=" + floorplanId).then(response => response.data._embedded.testimonials);

export const getWebSpecials = (floorplanId: string): Promise<WebSpecial[]> =>
    get("webSpecials/search/byFloorplanId?projection=withId&floorplanId=" + floorplanId).then(response => response.data._embedded.webSpecials);

export const permittedPets = (floorplan: Floorplan): string[] => {

    if (floorplan.allowedPet) {
        switch (floorplan.allowedPet) {
            case Pet.LARGE_DOG_SMALL_DOG_CAT:
                return ['Large Dog', 'Small Dog', 'Cat'];
            case Pet.SMALL_DOG_CAT:
                return ['Small Dog', 'Cat'];
            case Pet.CAT:
                return ['Cat'];
            default:
                return ['None'];
        }
    } else {
        const unit = unitWithMostAllowedPet([...floorplan.units]);

        switch (unit?.allowedPet) {
            case Pet.LARGE_DOG_SMALL_DOG_CAT:
                return ['Large Dog', 'Small Dog', 'Cat'];
            case Pet.SMALL_DOG_CAT:
                return ['Small Dog', 'Cat'];
            case Pet.CAT:
                return ['Cat'];
            default:
                return ['None'];
        }
    }

}

export const notPermittedPets = (floorplan: Floorplan): string[] => {
    if (floorplan.allowedPet) {
        switch (floorplan.allowedPet) {
            case Pet.LARGE_DOG_SMALL_DOG_CAT:
                return [];
            case Pet.SMALL_DOG_CAT:
                return ['Large Dog'];
            case Pet.CAT:
                return ['Large Dog', 'Small Dog'];
            case Pet.NO_PET:
                return ['Large Dog', 'Small Dog', 'Cat'];
            default:
                return [];
        }
    } else {
        const unit = unitWithMostAllowedPet([...floorplan.units]);

        switch (unit?.allowedPet) {
            case Pet.LARGE_DOG_SMALL_DOG_CAT:
                return [];
            case Pet.SMALL_DOG_CAT:
                return ['Large Dog'];
            case Pet.CAT:
                return ['Large Dog', 'Small Dog'];
            case Pet.NO_PET:
                return ['Large Dog', 'Small Dog', 'Cat'];
            default:
                return [];
        }
    }


}
export const petPolicy = (floorplan: Floorplan): string | undefined => {
    if (floorplan.allowedPet) {
        return floorplan.petPolicy;
    } else {
        const unit = unitWithMostAllowedPet([...floorplan.units]);
        return unit?.petPolicy;
    }

}
const unitWithMostAllowedPet = (units: Unit[]): Unit | undefined => {
    const petOrdinal = (pet: Pet) => Object.keys(Pet).indexOf(pet);
    return units.sort((a, b) => petOrdinal(b.allowedPet) - petOrdinal(a.allowedPet)).pop();
}

export const floorplanAddress = (currentFloorplan: Floorplan): FloorplanAddress => {
    const address: FloorplanAddress = {address: "", city: renaissance.city, state: renaissance.state, zipcode: ""};
    if (currentFloorplan.units.length === 1) {
        return {
            ...address, address: currentFloorplan.units[0].address,
            zipcode: currentFloorplan.units[0].zipcode
        }
    }
    return {
        ...address, address: currentFloorplan.property.address,
        zipcode: currentFloorplan.property.zipcode
    }
}

export interface FloorplanAddress {
    address: string;
    city: string;
    state: string;
    zipcode: string;
}
