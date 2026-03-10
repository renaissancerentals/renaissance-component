import {FloorplanShortTerm, ShortTermStyle} from "../data/ShortTerm";
import {
    CurrentShortTermFilters,
    ShortTermFilters,
    ShortTermSortBy,
    ShortTermSortFields
} from "../data/ShortTermFilters";
import _ from "lodash";
import Api from "../../service/Api";

export const getShortTermFloorplansByPropertyId = async (propertyId: string): Promise<FloorplanShortTerm[]> => {
    let response = await Api.get("shortTermFloorplans/byPropertyId/" + propertyId + "?projection=details");
    return await response.data
};

export const getShortTermFloorplan = async (id: string): Promise<FloorplanShortTerm> => {
    let response = await Api.get("shortTermFloorplans/" + id + "?projection=details");
    return await response.data;
};

export const shortTermFiltersFrom = (floorplans: FloorplanShortTerm[]): ShortTermFilters => {

    const bedroomFilters = new Set<number>();
    const styleFilters = new Set<ShortTermStyle>();

    floorplans.forEach(floorplan => {
        bedroomFilters.add(floorplan.bedroom);
        styleFilters.add(floorplan.style);
    });
    return {
        bedroom: bedroomFilters,
        style: styleFilters
    }
};
const isBedroomsMatch = (floorplan: FloorplanShortTerm, bedroomFilters: number[]): boolean => {
    return bedroomFilters.length === 0 ? true : bedroomFilters.indexOf(floorplan.bedroom) > -1;
};
const isStyleMatch = (floorplan: FloorplanShortTerm, styleFilters: ShortTermStyle[]): boolean => {
    return styleFilters.length === 0 ? true : styleFilters.indexOf(floorplan.style) > -1;
}
const isFloorplanIdsMatch = (floorplan: FloorplanShortTerm, floorplanIds: string[]): boolean => {
    return floorplanIds.length === 0 ? true : floorplanIds.indexOf(floorplan.id) > -1;
};
const filterMatches = (floorplan: FloorplanShortTerm, currentFilters: CurrentShortTermFilters) => {
    return isStyleMatch(floorplan, currentFilters.styleFilters) &&
        isBedroomsMatch(floorplan, currentFilters.bedroomFilters) &&
        isFloorplanIdsMatch(floorplan, currentFilters.floorplanIds);
}

export const sortFloorplans = (floorplans: FloorplanShortTerm[], sortBy: ShortTermSortBy): FloorplanShortTerm[] => {
    return _.orderBy(floorplans, ShortTermSortFields[sortBy].sortField, ShortTermSortFields[sortBy].order);
};
export const sortAndFilter = (floorplans: FloorplanShortTerm[], currentFilters: CurrentShortTermFilters): FloorplanShortTerm[] => {
    return sortFloorplans(floorplans.filter(floorplan => filterMatches(floorplan, currentFilters)), currentFilters.sortBy);
};

