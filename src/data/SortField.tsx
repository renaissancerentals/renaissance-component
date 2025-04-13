import React, {Fragment} from "react";
import {Icon} from "@contentmunch/muncher-ui";

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
    availabilityAsc: {
        element: <Fragment><Icon name="sort-asc"/>&nbsp;Availability</Fragment>,
        sortField: "moveInDate",
        order: "asc"
    },
    availabilityDesc: {
        element: <Fragment><Icon name="sort-desc"/>&nbsp;Availability</Fragment>,
        sortField: "moveInDate",
        order: "desc"
    },
}

export type SortBy = keyof typeof SortFields;

export interface SortField {
    element: React.ReactElement;
    sortField: string;
    order: any;
}
