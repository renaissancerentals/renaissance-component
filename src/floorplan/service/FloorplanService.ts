import _ from 'lodash';
import {Month} from "../data/Calendar";
import {CurrentFilters, FloorplanFilters, SortBy, SortFields} from "../data/FloorplanFilters";
import moment, {Moment} from "moment";
import {
    Floorplan,
    FloorplanCardData,
    FloorplanDetails,
    FloorplanSpotlight,
    FloorplanStyle,
    FloorplanVariation,
    SimilarFloorplan,
    Testimonial
} from "../data/Floorplan";
import {dateToMoment, minumMaximum} from "../../utils/Utils";
import {PropertyFilterData, PropertyId} from "../../property/data/Property";
import {Pet, Unit} from "../data/Unit";
import {get, graphql} from "../../service/RoundRobin";

export const AVAILABLE_NOW = "Available Now";

export const convertToHttps = (url: string): string => {
    if (url === null)
        return "";
    return url.replace(/^http:\/\//i, 'https://');
};
const getAllPropertyFilterDataQuery = () => {
    return '{                                                       \
        properties {                                                \
            name active                                             \
            floorplans {                                            \
                id name active bedroom bathroom coverImage featured \
                virtualTourLink videoTourLink style                 \
                photosFolderId                                      \
                units {                                             \
                    rent squareFoot active moveInDate               \
                }                                                   \
            }                                                       \
        }                                                           \
    }'
}
export const getAllPropertyFilterData = (): Promise<PropertyFilterData[]> => {
    return graphql(getAllPropertyFilterDataQuery()).then(response => {
            const properties: PropertyFilterData[] = response.data.data.properties.filter((property: PropertyFilterData) => property.active);

            properties.forEach(property => {
                property.floorplans = property.floorplans.filter(floorplan => floorplan.active);
                property.floorplans.forEach(floorplan => {
                    floorplan.units = floorplan.units.filter(unit => unit.active);
                });
            });
            return properties;
        }
    );
}
const getFloorplansFilterDataQuery = (propertyId: String) => {
    return '{                                                       \
        property(id: "' + propertyId + '") {                        \
            floorplans {                                            \
                id name active bedroom bathroom coverImage featured \
                virtualTourLink videoTourLink style                 \
                photosFolderId                                      \
                units {                                             \
                    rent squareFoot active moveInDate               \
                }                                                   \
            }                                                       \
        }                                                           \
    }'
}
export const getFloorplansFilterData = (propertyId: PropertyId): Promise<FloorplanCardData[]> => {
    return graphql(getFloorplansFilterDataQuery(propertyId)).then(response => {
            const floorplans: FloorplanCardData[] = response.data.data.property.floorplans.filter((floorplan: FloorplanCardData) => floorplan.active);
            floorplans.forEach(floorplan => {
                floorplan.units = floorplan.units.filter(unit => unit.active);
            });
            return floorplans;
        }
    );
};
export const sortAndFilter = (floorplans: FloorplanCardData[], currentFilters: CurrentFilters): FloorplanCardData[] => {
    return sortFloorplans(floorplans.filter(floorplan => filterMatches(floorplan, currentFilters)), currentFilters.sortBy);
};


export const isDateWithinTwelveMonths = (date: string) => {
    const today = moment();
    const diff = moment(date, "YYYY-MM-DD").diff(today, 'months', false);
    return diff >= 0 && diff <= 12;
}
const dateToMonthYear = (dateString: string | null): string => moment(dateString, "YYYY-MM-DD").format('MMM YYYY');

export const defaultAvailabilityToMonthYear = (dateString: string): string =>
    AVAILABLE_NOW === dateString ? dateString : moment(dateString, "MM-YYYY").format('MMM YYYY');

export const momentToMonthYear = (date: Moment) => date.format('MMM YYYY');
const isAvailable = (floorplan: FloorplanCardData, availabilityFilters: Month[]): boolean => {

    return availabilityFilters.length === 0 ? true :

        floorplan.units.some((unit) => {
                if (availabilityFilters.indexOf(AVAILABLE_NOW) > -1) {
                    if (isBeforeToday(unit.moveInDate)) {
                        return true;
                    }
                }
                if (availabilityFilters.indexOf(momentToMonthYear(today)) > -1) {
                    if (isBeforeToday(unit.moveInDate)) {
                        return true;
                    }
                }
                return availabilityFilters.indexOf(dateToMonthYear(unit.moveInDate)) > -1;
            }
        );
};

const isBeforeToday = (date: string) => moment(date).isBefore(today);
const isBedroomsMatch = (floorplan: FloorplanCardData, bedroomFilters: number[]): boolean => {
    return bedroomFilters.length === 0 ? true : bedroomFilters.indexOf(floorplan.bedroom) > -1;
};
const isStyleMatch = (floorplan: FloorplanCardData, styleFilters: FloorplanStyle[]): boolean => {
    return styleFilters.length === 0 ? true : styleFilters.indexOf(floorplan.style) > -1;
}
const isInPriceRange = (floorplan: FloorplanCardData, minRent: number, maxRent: number): boolean => {
    const minMax = minumMaximum(floorplan.units, "rent");
    return minMax.min >= minRent && minMax.max <= maxRent;
}
const isFloorplanIdsMatch = (floorplan: FloorplanCardData, floorplanIds: string[]): boolean => {
    return floorplanIds.length === 0 ? true : floorplanIds.indexOf(floorplan.id) > -1;
};
const filterMatches = (floorplan: FloorplanCardData, currentFilters: CurrentFilters) => {
    return isAvailable(floorplan, currentFilters.availabilityFilters) &&
        isInPriceRange(floorplan, currentFilters.minRent, currentFilters.maxRent) &&
        isStyleMatch(floorplan, currentFilters.styleFilters) &&
        isBedroomsMatch(floorplan, currentFilters.bedroomFilters) &&
        isFloorplanIdsMatch(floorplan, currentFilters.floorplanIds);
}
export const sortFloorplans = (floorplans: FloorplanCardData[], sortBy: SortBy): FloorplanCardData[] => {

    if (SortFields[sortBy].sortField === "minRate" && SortFields[sortBy].order === "desc") {
        return floorplans.sort((a, b) => minumMaximum(b.units, "rent").min - minumMaximum(a.units, "rent").min);
    }

    const minRateSorted = floorplans.sort((a, b) => minumMaximum(a.units, "rent").min - minumMaximum(b.units, "rent").min);
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

        floorplan.units.forEach((value) => {
            if (value.moveInDate && isDateWithinTwelveMonths(value.moveInDate))
                availabilityFilters.add(dateToMonthYear(value.moveInDate));
        });
    });
    return {
        bedroom: bedroomFilters,
        availability: availabilityFilters,
        style: styleFilters
    }
};


export const getFeaturedFloorplans = (): Promise<FloorplanSpotlight[]> => {

    return get("floorplans?projection=spotlight&size=200")
        .then(response =>
            response.data._embedded.floorplans.filter((floorplan: FloorplanSpotlight) => floorplan.featured && floorplan.property.active)
        );
};

export const getAllActiveFloorplans = (): Promise<FloorplanDetails[]> => {

    return get("floorplans?projection=details&size=200")
        .then(response =>
            response.data._embedded.floorplans
                .filter((floorplan: Floorplan) => floorplan.active)
                .filter((floorplan: Floorplan) => floorplan.style !== "GARAGE")
        );
};

export const getFloorplan = (floorplanId: string): Promise<Floorplan> =>
    get("floorplans/" + floorplanId + "?projection=withId").then(response => response.data);

export const getSimilarFloorplans = (floorplanId: string): Promise<SimilarFloorplan[]> =>
    get("similarFloorplans/search/byFloorplanId?projection=withId&floorplanId=" + floorplanId).then(response => response.data._embedded.similarFloorplans);

export const getFloorplanVariations = (floorplanId: string): Promise<FloorplanVariation[]> =>
    get("floorplanVariations/search/byFloorplanId?projection=withId&floorplanId=" + floorplanId).then(response => response.data._embedded.floorplanVariations);
const today = moment();
export const isFloorplanAvailable = (floorplan: Floorplan | FloorplanCardData): boolean => floorplan.units.some((unit) => today.isAfter(dateToMoment(unit.moveInDate)));
export const getTestimonials = (floorplanId: string): Promise<Testimonial[]> =>
    get("testimonials/search/byFloorplanId?projection=withId&floorplanId=" + floorplanId).then(response => response.data._embedded.testimonials);


export const permittedPets = (floorplan: Floorplan): string[] => {

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

export const notPermittedPets = (floorplan: Floorplan): string[] => {

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
export const petPolicy = (floorplan: Floorplan): string | undefined => {
    const unit = unitWithMostAllowedPet([...floorplan.units]);
    return unit?.petPolicy;
}
const unitWithMostAllowedPet = (units: Unit[]): Unit | undefined => {
    const petOrdinal = (pet: Pet) => Object.keys(Pet).indexOf(pet);
    return units.sort((a, b) => petOrdinal(b.allowedPet) - petOrdinal(a.allowedPet)).pop();
}

