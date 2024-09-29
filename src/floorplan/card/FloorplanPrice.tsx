import React from "react";
import {dateToMoment, minimumMaximum, toUSD} from "../../utils/Utils";
import moment from "moment/moment";
import {FloorplanCardData} from "../data/Floorplan";
import "./assets/FloorplanPrice.scss";

export const FloorplanPrice: React.FC<FloorplanPriceProps> = ({floorplan}) => {

    const hasSpecialRent = () => {
        const currentDate = moment();

        if (!floorplan.specialRent || floorplan.specialRent < 1 || !floorplan.specialRentStartDate || !floorplan.specialRentEndDate)
            return false

        const startDate = dateToMoment(floorplan.specialRentStartDate);
        const endDate = dateToMoment(floorplan.specialRentEndDate);

        return currentDate.isBetween(startDate, endDate);

    }

    const minMaxRent = minimumMaximum(floorplan.units, "rent");

    const getRentClass = () => hasSpecialRent() ? "strike-through" : "";

    const priceForSingleUnit = () =>
        <span className={getRentClass()}><span className="rent">{toUSD(minMaxRent.min)}</span></span>
    const priceForMultipleUnits = () =>
        <><span className={getRentClass()}><span className="rent">{toUSD(minMaxRent.min)}</span></span> - {toUSD(minMaxRent.max)}</>

    const priceForSpecialRent = () => hasSpecialRent() ? <span
        className="special">Now starting at {toUSD(floorplan.specialRent)}/mo</span> : <></>
    return (
        floorplan.units && floorplan.units.length > 0 ?
            <span className="floorplan-price">
                {minMaxRent.min === minMaxRent.max ? priceForSingleUnit() : priceForMultipleUnits()}
                {priceForSpecialRent()}
            </span>
            : <>-</>
    );
}

export interface FloorplanPriceProps {
    floorplan: FloorplanCardData;
}
