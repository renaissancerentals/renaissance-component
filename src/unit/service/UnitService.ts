import {dateToMoment} from "../../utils/Utils";
import {UnitCardData} from "../data/Unit";
import moment from "moment/moment";
import {FloorplanCardData, FloorplanStyle} from "../../floorplan/data/Floorplan";
import {CurrentFloorplanFilters, FloorplanFilters} from "../../floorplan/data/FloorplanFilters";
import {
    AVAILABLE_NOW,
    isAvailableNow,
    isDateWithinTwelveMonths,
    momentToMonthYear,
    MONTH_YEAR_FORMAT
} from "../../floorplan/service/FloorplanService";
import {SortBy, SortFields} from "../../data/SortField";
import _ from "lodash";
import {Month} from "../../data/Calendar";
import {PropertyFilterData} from "../../property/data/Property";

const today = moment();
const tomorrow = today.add(1, "day");
const dateToMonthYear = (dateString: string | null): string => moment(dateString, "YYYY-MM-DD").format(MONTH_YEAR_FORMAT);

const isBedroomsMatch = (unit: UnitCardData, bedroomFilters: number[]): boolean => {
    return bedroomFilters.length === 0 ? true : bedroomFilters.indexOf(unit.bedroom) > -1;
};
const isStyleMatch = (unit: UnitCardData, styleFilters: FloorplanStyle[]): boolean => {
    return styleFilters.length === 0 ? true : styleFilters.indexOf(unit.style) > -1;
}
const isInPriceRange = (unit: UnitCardData, minRent: number, maxRent: number): boolean => {
    return unit.rent >= minRent && unit.rent <= maxRent;
}
const isFloorplanIdsMatch = (unit: UnitCardData, floorplanIds: string[]): boolean => {
    return floorplanIds.length === 0 ? true : floorplanIds.indexOf(unit.floorplanId) > -1;
};
const filterMatches = (unit: UnitCardData, currentFilters: CurrentFloorplanFilters) => {
    return isAvailable(unit, currentFilters.availabilityFilters) &&
        isInPriceRange(unit, currentFilters.minRent, currentFilters.maxRent) &&
        isStyleMatch(unit, currentFilters.styleFilters) &&
        isBedroomsMatch(unit, currentFilters.bedroomFilters) &&
        isFloorplanIdsMatch(unit, currentFilters.floorplanIds);
}

export const isUnitAvailable = (unit: UnitCardData): boolean => today.isAfter(dateToMoment(unit.moveInDate));

const isAvailable = (unit: UnitCardData, availabilityFilters: Month[]): boolean => {
    if (availabilityFilters.length === 0)
        return true;
    const isUnitAvailableNow = isAvailableNow(moment(unit.moveInDate));

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
};
export const sortAndFilterUnits = (units: UnitCardData[], currentFilters: CurrentFloorplanFilters): UnitCardData[] => {
    return sortUnits(units.filter(unit => filterMatches(unit, currentFilters)), currentFilters.sortBy);
};

export const sortUnits = (units: UnitCardData[], sortBy: SortBy): UnitCardData[] => {

    if (SortFields[sortBy].sortField === "minRate" && SortFields[sortBy].order === "desc") {
        return units.sort((a, b) => b.rent - a.rent);
    }

    const minRateSorted = units.sort((a, b) => a.rent - b.rent);
    if (SortFields[sortBy].sortField === "minRate" && SortFields[sortBy].order === "asc") {
        return minRateSorted;
    }

    return _.orderBy(minRateSorted, SortFields[sortBy].sortField, SortFields[sortBy].order);
};


export const filtersFromUnits = (units: UnitCardData[]): FloorplanFilters => {

    const bedroomFilters = new Set<number>();
    const availabilityFilters = new Set<string>();
    const styleFilters = new Set<FloorplanStyle>();

    availabilityFilters.add(AVAILABLE_NOW);
    units.forEach(unit => {
            bedroomFilters.add(unit.bedroom);
            styleFilters.add(unit.style);

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
        }
    );
    return {
        bedroom: bedroomFilters,
        availability: availabilityFilters,
        style: styleFilters
    }
};


export const unitsFromProperties = (properties: PropertyFilterData[]): UnitCardData[] => {
    return properties.flatMap(property => unitsFromFloorplans(property.floorplans));
}
export const unitsFromFloorplans = (floorplans: FloorplanCardData[]): UnitCardData[] => {
    return floorplans.flatMap(floorplan => toUnits(floorplan));
}

export const toUnits = (floorplan: FloorplanCardData): UnitCardData[] => {
    return floorplan.units.map(unit => ({
        id: unit.id,
        rent: unit.rent,
        squareFoot: unit.squareFoot,
        moveInDate: unit.moveInDate,
        availabilityExtensionMonths: unit.availabilityExtensionMonths,
        floorplanId: floorplan.id,
        floorplanName: floorplan.name,
        bedroom: floorplan.bedroom,
        bathroom: floorplan.bathroom,
        coverImage: floorplan.coverImage,
        featured: floorplan.featured,
        style: floorplan.style,
        specialRent: floorplan.specialRent,
        specialRentStartDate: floorplan.specialRentStartDate,
        specialRentEndDate: floorplan.specialRentEndDate,
        address: floorplan.address,
        zipcode: floorplan.zipcode,
        virtualTourLink: floorplan.virtualTourLink,
        videoTourLink: floorplan.videoTourLink,
        photosFolderId: floorplan.photosFolderId,
        webSpecials: floorplan.webSpecials
    }));
}
