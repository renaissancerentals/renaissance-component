import {SortBy} from "../../data/SortField";
import {FloorplanStyle} from "../../floorplan/data/Floorplan";

export interface CurrentFilters {
    bedroomFilters: number[];
    availabilityFilters: string[];
    styleFilters: FloorplanStyle[];
    minRent: number;
    maxRent: number;
    sortBy: SortBy;
    floorplanIds: string[];
}

export interface UnitFilters {
    bedroom: Set<number>;
    availability: Set<string>;
    style: Set<FloorplanStyle>;
}
