import React from "react";
import {dateToMoment, toUSD} from "../../utils/Utils";
import moment from "moment/moment";
import "../../floorplan/card/assets/FloorplanPrice.scss";
import {UnitFloorplan} from "../data/Unit";

export const UnitPrice: React.FC<UnitPriceProps> = (
    {
        unit,
        invertColor
    }) => {

    const hasSpecialRent = () => {
        const currentDate = moment();

        if (unit.discountedRent && unit.discountedRentStartDate && unit.discountedRentEndDate) {
            const startDate = dateToMoment(unit.discountedRentStartDate);
            const endDate = dateToMoment(unit.discountedRentEndDate);

            return currentDate.isBetween(startDate, endDate);
        }
        return false;
    }

    const getRentClass = () => hasSpecialRent() ? "strike-through" : "";


    const priceForSpecialRent = () => hasSpecialRent() ? <span
        className="special">Now starting at {toUSD(unit.discountedRent!!)}/mo</span> : <></>
    return (
        <span className={invertColor ? "floorplan-price floorplan-price-inverted" : "floorplan-price"}>
                <span className={getRentClass()}><span className="rent">{toUSD(unit.rent)}</span></span>
            <span className="floorplan-special-price">{priceForSpecialRent()}</span>
            </span>

    );
}

export interface UnitPriceProps {
    unit: UnitFloorplan;
    invertColor?: boolean;
}
