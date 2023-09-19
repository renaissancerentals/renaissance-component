import React from "react";
import {Checkbox} from "@contentmunch/muncher-ui";
import {DropDownFilter} from "../../filter/FloorplanDropDown";
import moment from "moment";

export const sortAvailability = (a: string, b: string) => moment(a, "MMM YYYY").diff(moment(b, "MMM YYYY"));

export const AvailabilityFilter: React.FC<AvailabilityFilterProps> = ({
                                                                          filters,
                                                                          handleFilterChange,
                                                                          currentFilters
                                                                      }) => {

    return (
        <DropDownFilter label="Availability">
            {Array.from(filters.keys()).sort(sortAvailability).map((filter: string) => (
                <Checkbox key={filter.toString()} label={filter.toString()} name={filter.toString()}
                          onChange={() => {
                              handleFilterChange(filter)
                          }}
                          checked={() => currentFilters.indexOf(filter) > -1}
                />
            ))}
        </DropDownFilter>
    );
};

export interface AvailabilityFilterProps {
    filters: Set<string>;
    handleFilterChange: (filter: string) => void;
    currentFilters: string[];
}