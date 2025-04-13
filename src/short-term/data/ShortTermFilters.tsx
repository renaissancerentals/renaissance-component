import React, {Fragment} from "react";
import {Icon} from "@contentmunch/muncher-ui";
import {ShortTermStyle} from "./ShortTerm";
import {SortField} from "../../data/SortField";

export interface CurrentShortTermFilters {
    bedroomFilters: number[];
    styleFilters: ShortTermStyle[];
    sortBy: ShortTermSortBy;
    floorplanIds: string[];
}

export type ShortTermSortBy = keyof typeof ShortTermSortFields;

export const ShortTermSortFields: { [id: string]: SortField } = {
    priceAsc: {
        element: <Fragment><Icon name="sort-asc"/>&nbsp;Price</Fragment>,
        sortField: "shortTerm.priceFor5To13Days",
        order: "asc"
    },
    priceDesc: {
        element: <Fragment><Icon name="sort-desc"/>&nbsp;Price</Fragment>,
        sortField: "shortTerm.priceFor5To13Days",
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

export interface ShortTermFilters {
    bedroom: Set<number>;
    style: Set<ShortTermStyle>;
}
