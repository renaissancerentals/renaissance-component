import React, {Fragment} from "react";

import {Month} from "./Calendar";
import {Icon} from "@contentmunch/muncher-ui";
import {FloorplanStyle} from "./Floorplan";

export interface CurrentFilters {
    bedroomFilters: number[];
    availabilityFilters: Month[];
    styleFilters: FloorplanStyle[];
    minRent: number;
    maxRent: number;
    sortBy: SortBy;
    floorplanIds: string[];
}

export const SortFields: { [id: string]: SortField } = {
    featured: {
        element: <Fragment><Icon name="star"/>&nbsp;Featured</Fragment>,
        sortField: "featured",
        order: "desc"
    },
    priceAsc: {
        element: <Fragment><Icon name="sort-asc"/>&nbsp;Price</Fragment>,
        sortField: "minRate",
        order: "asc"
    },
    priceDesc: {
        element: <Fragment><Icon name="sort-desc"/>&nbsp;Price</Fragment>,
        sortField: "minRate",
        order: "desc"
    },
    bedroomsAsc: {
        element: <Fragment><Icon name="sort-asc"/>&nbsp;Bedrooms</Fragment>,
        sortField: "bedroom",
        order: "asc"
    },
    bedroomsDesc: {
        element: <Fragment><Icon name="sort-desc"/>&nbsp;Bedrooms</Fragment>,
        sortField: "bedroom",
        order: "desc"
    },
}

export type SortBy = keyof typeof SortFields;

export interface SortField {
    element: React.ReactElement;
    sortField: string;
    order: any;
}

export interface FloorplanFilters {
    bedroom: Set<number>;
    availability: Set<string>;
    style: Set<FloorplanStyle>;
}
