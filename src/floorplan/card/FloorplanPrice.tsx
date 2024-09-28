import React from "react";
import {UnitCardData} from "../data/Unit";
import {minimum, minimumMaximum, toUSD} from "../../utils/Utils";

export const FloorplanPrice: React.FC<FloorplanPriceProps> = ({units}) => {

    const minMax = minimumMaximum(units, "rent");
    const minimumDiscountRent = minimum(units, "discountedRent");

    const hasDiscountedRent = () => minimumDiscountRent != 0 && minimumDiscountRent < minMax.min;

    console.log(units);
    console.log(minimumDiscountRent,"yoyo");
    const priceForSingleUnit = () =>
        hasDiscountedRent() ?
            <span>
                <s>{toUSD(minMax.min)}/mo</s> <span>Now starting at {toUSD(minimumDiscountRent)}/mo</span>
            </span> :
            <span>
                {toUSD(minMax.min)}/mo
            </span>

    const priceForMultipleUnits = () =>
        hasDiscountedRent() ?
            <span>
                <s>{toUSD(minimumDiscountRent)}/mo</s> {toUSD(minimumDiscountRent) + " - " + toUSD(minMax.max)}/mo
            </span> :
            <span>
                {toUSD(minMax.min) + " - " + toUSD(minMax.max)}/mo
            </span>


    return (
        units && units.length > 0 ?
            minMax.min === minMax.max ? priceForSingleUnit() : priceForMultipleUnits()
            : <>-</>
    );
}

export interface FloorplanPriceProps {
    units: UnitCardData[]
}
