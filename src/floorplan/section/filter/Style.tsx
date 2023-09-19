import React from "react";
import {Checkbox} from "@contentmunch/muncher-ui";
import {DropDownFilter} from "../../filter/FloorplanDropDown";
import {FloorplanStyle} from "../../data/Floorplan";
import {capitalizeFirstLetter, enumToString} from "../../../utils/Utils";

export const StyleFilter: React.FC<StyleFilterProps> = ({filters, handleFilterChange, currentFilters}) => {

    return (
        <DropDownFilter label="Home Type">
            {Array.from(filters.keys()).map((filter: FloorplanStyle) => (
                <Checkbox key={filter} label={capitalizeFirstLetter(enumToString(filter))} name={filter}
                          onChange={() => {
                              handleFilterChange(filter)
                          }}
                          checked={() => currentFilters.indexOf(filter) > -1}
                />
            ))}
        </DropDownFilter>
    );
};

export interface StyleFilterProps {
    filters: Set<FloorplanStyle>;
    handleFilterChange: (filter: FloorplanStyle) => void;
    currentFilters: string[];
}