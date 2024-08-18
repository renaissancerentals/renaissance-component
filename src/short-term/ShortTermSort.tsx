import React, {useState} from "react";
import {Button, DropdownButton} from "@contentmunch/muncher-ui";
import {ShortTermSortBy, ShortTermSortFields} from "./data/ShortTermFilters";

export const ShortTermSort: React.FC<SortProps> = ({sortBy, handleSortChange}) => {
    const [showSortDropDown, setShowSortDropDown] = useState(false);

    return (
        <div className="unit-dropdown">
            <DropdownButton
                element={<h5>{ShortTermSortFields[sortBy].element}&nbsp;&nbsp;<span
                    className="small">▼</span></h5>}
                showContent={showSortDropDown}
                setShowContent={setShowSortDropDown}
                size="medium"
                variant="primary"
                drop="left"
            >
                <div className="sort-filters">
                    {Object.keys(ShortTermSortFields).map((sortField) => (
                        <Button
                            key={sortField}
                            active={sortBy === sortField}
                            onClick={() => {
                                handleSortChange(sortField);
                                setShowSortDropDown(false);
                            }}>
                            {ShortTermSortFields[sortField].element}
                        </Button>
                    ))}
                </div>
            </DropdownButton>
        </div>
    );
};

export interface SortProps {
    sortBy: ShortTermSortBy;
    handleSortChange: (sortBy: ShortTermSortBy) => void;
}
