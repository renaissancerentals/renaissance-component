import React from "react";
import "./assets/ShortTermPricingCard.scss";
import {capitalizeFirstLetter, enumToString, toUSD} from "../utils/Utils";
import {FloorplanShortTerm} from "./data/ShortTerm";

export const ShortTermPricingCard: React.FC<ShortTermPricingCardProps> = ({floorplans}) => {

    const generateMainPricingRow = (floorplan: FloorplanShortTerm) =>
        <>
            <div className="col">
                {floorplan.bedroom}-Bedroom {capitalizeFirstLetter(enumToString(floorplan.style))}
            </div>
            <div className="col">
                {floorplan.bathroom}
            </div>
            <div className="col">
                {floorplan.shortTerm.squareFoot}+
            </div>
            <div className="col">
                Call or Text
            </div>
            <div className="col">
                {toUSD(floorplan.shortTerm.priceFor5To13Days)}/day + tax
            </div>
            <div className="col">
                {toUSD(floorplan.shortTerm.priceFor14To29Days)}/day + tax
            </div>
            <div className="col">
                {toUSD(floorplan.shortTerm.priceFor1To4Months)}/day/ {toUSD(floorplan.shortTerm.priceFor1To4Months * 30)}/mo
            </div>
            <div className="col">
                {toUSD(floorplan.shortTerm.priceFor4andMoreMonths)}/day/ {toUSD(floorplan.shortTerm.priceFor4andMoreMonths * 30)}/mo
            </div>
        </>

    const generateMobile = (displayName: string, values: string[]) =>
        <tr>
            <th>{displayName}</th>
            {values.map((value, index) =>
                <td key={"td-" + displayName + index}>{value}</td>
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
                            {generateMobile("sq. ft.", floorplans.map(floorplan => floorplan.shortTerm.squareFoot + "+"))}
                            {generateMobile("*2-4 days", floorplans.map(() => "Call or Text"))}
                            {generateMobile("*5-13 days", floorplans.map(floorplan => toUSD(floorplan.shortTerm.priceFor5To13Days) + "/day + tax"))}
                            {generateMobile("14-29 days", floorplans.map(floorplan => toUSD(floorplan.shortTerm.priceFor14To29Days) + "/day + tax"))}
                            {generateMobile("1-4 months", floorplans.map(floorplan => toUSD(floorplan.shortTerm.priceFor1To4Months) + "/day/ " + toUSD(floorplan.shortTerm.priceFor1To4Months * 30) + "/mo"))}
                            {generateMobile("4+ months", floorplans.map(floorplan => toUSD(floorplan.shortTerm.priceFor4andMoreMonths) + "/day/ " + toUSD(floorplan.shortTerm.priceFor4andMoreMonths * 30) + "/mo"))}

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
                        <div className="col head tall">
                            *2-4 days
                        </div>
                        <div className="col head tall">
                            *5-13 days
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

                <p className="footnote">* for immediate arrivals only, call or text for availability</p>

            </div>
        </section>

    );
};

export interface ShortTermPricingCardProps {
    floorplans: FloorplanShortTerm[]
}
