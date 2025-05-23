import {FloorplanStyle} from "./Floorplan";
import {SortBy} from "../../data/SortField";

export interface CurrentFloorplanFilters {
    bedroomFilters: number[];
    availabilityFilters: string[];
    styleFilters: FloorplanStyle[];
    minRent: number;
    maxRent: number;
    sortBy: SortBy;
    floorplanIds: string[];
}

export interface FloorplanFilters {
    bedroom: Set<number>;
    availability: Set<string>;
    style: Set<FloorplanStyle>;
}
