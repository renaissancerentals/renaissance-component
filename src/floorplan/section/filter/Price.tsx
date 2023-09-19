import React from "react";
import {MAX_RENT, MIN_RENT} from "../../data/Floorplan";
import { RangeSlider} from "@contentmunch/muncher-ui";
import {DropDownFilter} from "../../filter/FloorplanDropDown";

export const PriceFilter: React.FC<PriceFilterProps> = ({minValue, maxValue, setMinValue, setMaxValue,}) => {

    return (
        <div className="price-dropdown">
            <DropDownFilter label="Price" drop="middle">
                <div className="price-dropdown-content">
                    <RangeSlider
                        min={MIN_RENT}
                        max={MAX_RENT}
                        setMaxValue={setMaxValue}
                        setMinValue={setMinValue}
                        minValue={minValue}
                        maxValue={maxValue}
                    />
                </div>
            </DropDownFilter>
        </div>
    );
};

export interface PriceFilterProps {
    minValue: number;
    maxValue: number;
    setMinValue: (num: number) => void;
    setMaxValue: (num: number) => void;
}