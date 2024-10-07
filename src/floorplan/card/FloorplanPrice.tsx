import React from "react";
import {dateToMoment, minimumMaximum, toUSD} from "../../utils/Utils";
import moment from "moment/moment";
import "./assets/FloorplanPrice.scss";

export const FloorplanPrice: React.FC<FloorplanPriceProps> = (
    {
        unitRents,
        specialRent,
        specialRentStartDate,
        specialRentEndDate,
        invertColor
    }) => {

    const hasSpecialRent = () => {
        const currentDate = moment();

        if (!specialRent || specialRent < 1 || !specialRentStartDate || !specialRentEndDate)
            return false

        const startDate = dateToMoment(specialRentStartDate);
        const endDate = dateToMoment(specialRentEndDate);

        return currentDate.isBetween(startDate, endDate);

    }

    const minMaxRent = minimumMaximum(unitRents, "rent");

    const getRentClass = () => hasSpecialRent() ? "strike-through" : "";

    const priceForSingleUnit = () =>
        <span className={getRentClass()}><span className="rent">{toUSD(minMaxRent.min)}</span></span>
    const priceForMultipleUnits = () =>
        <><span className={getRentClass()}><span
            className="rent">{toUSD(minMaxRent.min)}</span></span> - {toUSD(minMaxRent.max)}</>

    const priceForSpecialRent = () => hasSpecialRent() ? <span
        className="special">Now starting at {toUSD(specialRent!!)}/mo</span> : <></>
    return (
        unitRents.length > 0 ?
            <span className={invertColor ? "floorplan-price floorplan-price-inverted" : "floorplan-price"}>
                {minMaxRent.min === minMaxRent.max ? priceForSingleUnit() : priceForMultipleUnits()}
                <span className="floorplan-special-price">{priceForSpecialRent()}</span>
            </span>
            : <>-</>
    );
}

export interface FloorplanPriceProps {
    unitRents: { rent: number }[],
    specialRent?: number,
    specialRentStartDate?: string,
    specialRentEndDate?: string,
    invertColor?: boolean
}
