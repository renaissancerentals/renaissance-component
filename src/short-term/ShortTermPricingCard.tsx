import React from "react";
import "./assets/ShortTermPricingCard.scss";
import {capitalizeFirstLetter, enumToString, toUSD} from "../utils/Utils";
import {FloorplanShortTerm} from "./data/ShortTerm";

export const ShortTermPricingCard: React.FC<ShortTermPricingCardProps> = ({floorplans, contactNumber}) => {
    const covertToUSD = (price: string, suffix: string, multiplier?: number) => {
        const numeric = Number(price);

        if (isNaN(numeric) || numeric <= 0) {
            return price;
        }

        return (multiplier ? toUSD(numeric * multiplier) : toUSD(numeric)) + suffix;
    }
    const generateMainPricingRow = (floorplan: FloorplanShortTerm) =>
        <>
            <div className="col">
                {floorplan.bedroom}-Bedroom {capitalizeFirstLetter(enumToString(floorplan.style))}
            </div>
            <div className="col">
                {floorplan.bathroom}
            </div>
            <div className="col">
                {floorplan.squareFoot}+
            </div>
            <div className="col">
                {covertToUSD(floorplan.priceFor14To29Days, "/day + tax")}
            </div>
            <div className="col">
                {covertToUSD(floorplan.priceFor1To4Months, "/day/")} {covertToUSD(floorplan.priceFor1To4Months, "/mo", 30)}
            </div>
            <div className="col">
                {covertToUSD(floorplan.priceFor4andMoreMonths, "/day/")} {covertToUSD(floorplan.priceFor4andMoreMonths, "/mo", 30)}
            </div>
        </>

    const generateMobile = (displayName: string | React.JSX.Element, values: string[]) =>
        <tr>
            <th>{displayName}</th>
            {values.map((value, index) =>
                <td key={"td-" + index}>{value}</td>
            )}
        </tr>
    return (
        <section className="section-pricing-card">
            <div className="container">
                <h2 className="heading">
                    <span className="emphasized">Short Term Pricing</span>
                </h2>
                <div className="mobile">
                    <div className="table-container">
                        <table>
                            <tbody>
                            {generateMobile("bedrooms", floorplans.map(floorplan => floorplan.bedroom + "-Bedroom " + capitalizeFirstLetter(enumToString(floorplan.style))))}
                            {generateMobile("bath", floorplans.map(floorplan => floorplan.bathroom + ""))}
                            {generateMobile("sq. ft.", floorplans.map(floorplan => floorplan.squareFoot + "+"))}
                            {generateMobile("14-29 days", floorplans.map(floorplan => covertToUSD(floorplan.priceFor14To29Days, "/day + tax")))}
                            {generateMobile("1-4 months", floorplans.map(floorplan => covertToUSD(floorplan.priceFor1To4Months, "/day/ ") + covertToUSD(floorplan.priceFor1To4Months, "/mo", 30)))}
                            {generateMobile("4+ months", floorplans.map(floorplan => covertToUSD(floorplan.priceFor4andMoreMonths, "/day/ ") + covertToUSD(floorplan.priceFor4andMoreMonths, "/mo", 30)))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="main">
                    <div className="row">
                        <div className="col head">
                            bedrooms
                        </div>
                        <div className="col head">
                            bath
                        </div>
                        <div className="col head">
                            sq. ft.
                        </div>
                        <div className="col head">
                            14-29 days
                        </div>
                        <div className="col head">
                            1-4 months
                        </div>
                        <div className="col head">
                            4+ months
                        </div>
                        {
                            floorplans.sort((a, b) => parseInt(a.name) - parseInt(b.name)).map(floorplan => generateMainPricingRow(floorplan))
                        }
                    </div>
                </div>

            </div>
        </section>
    );
};

export interface ShortTermPricingCardProps {
    floorplans: FloorplanShortTerm[];
    contactNumber: string;
}
