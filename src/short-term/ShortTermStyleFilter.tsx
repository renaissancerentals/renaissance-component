import React from "react";
import {Checkbox} from "@contentmunch/muncher-ui";
import {ShortTermStyle} from "./data/ShortTerm";
import {DropDownFilter} from "../floorplan/filter/FloorplanDropDown";
import {capitalizeFirstLetter, enumToString} from "../utils/Utils";

export const ShortTermStyleFilter: React.FC<StyleFilterProps> = ({filters, handleFilterChange, currentFilters}) => {

    return (
        <DropDownFilter label="Home Type">
            {Array.from(filters.keys()).map((filter: ShortTermStyle) => (
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
    filters: Set<ShortTermStyle>;
    handleFilterChange: (filter: ShortTermStyle) => void;
    currentFilters: string[];
}
