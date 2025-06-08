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
                {floorplan.shortTerm.squareFoot}+
            </div>
            <div className="col">
                {covertToUSD(floorplan.shortTerm.priceFor2To4Days, "/day + tax")}
            </div>
            <div className="col">
                {covertToUSD(floorplan.shortTerm.priceFor5To13Days, "/day + tax")}
            </div>
            <div className="col">
                {covertToUSD(floorplan.shortTerm.priceFor14To29Days, "/day + tax")}
            </div>
            <div className="col">
                {covertToUSD(floorplan.shortTerm.priceFor1To4Months, "/day/")} {covertToUSD(floorplan.shortTerm.priceFor1To4Months, "/mo", 30)}
            </div>
            <div className="col">
                {covertToUSD(floorplan.shortTerm.priceFor4andMoreMonths, "/day/")} {covertToUSD(floorplan.shortTerm.priceFor4andMoreMonths, "/mo", 30)}
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
                            {generateMobile("sq. ft.", floorplans.map(floorplan => floorplan.shortTerm.squareFoot + "+"))}
                            {generateMobile(
                                <><span className="asterix">*</span>2-4
                                    days</>, floorplans.map(floorplan => covertToUSD(floorplan.shortTerm.priceFor2To4Days, "/day + tax")))}
                            {generateMobile(
                                <><span className="asterix">*</span>5-13
                                    days</>, floorplans.map(floorplan => covertToUSD(floorplan.shortTerm.priceFor5To13Days, "/day + tax")))}
                            {generateMobile("14-29 days", floorplans.map(floorplan => covertToUSD(floorplan.shortTerm.priceFor14To29Days, "/day + tax")))}
                            {generateMobile("1-4 months", floorplans.map(floorplan => covertToUSD(floorplan.shortTerm.priceFor1To4Months, "/day/ ") + covertToUSD(floorplan.shortTerm.priceFor1To4Months, "/mo", 30)))}
                            {generateMobile("4+ months", floorplans.map(floorplan => covertToUSD(floorplan.shortTerm.priceFor4andMoreMonths, "/day/ ") + covertToUSD(floorplan.shortTerm.priceFor4andMoreMonths, "/mo", 30)))}

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
                            <span className="asterix">*</span>2-4 days
                        </div>
                        <div className="col head tall">
                            <span className="asterix">*</span>5-13 days
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

                <p className="footnote main">* for immediate arrivals only, call or text for availability</p>
                <p className="footnote mobile">* for immediate arrivals only, <a href={`tel:${contactNumber}`}>call or
                    text</a> for availability</p>

            </div>

        </section>

    );
};

export interface ShortTermPricingCardProps {
    floorplans: FloorplanShortTerm[];
    contactNumber: string;
}
