import React from "react";
import {FeatureSection} from "../feature/FeatureSection";

import "./assets/SummerHouseFeatures.scss";

export const SummerHouseFeatures: React.FC = () => {
    return (
        <FeatureSection>
            <div className="container">
                <section className="section-feature--detail">
                    <div className="section-feature--two-column">
                        <div>
                            <h2 className="section-feature--title">Flexible Term <br/>Apartment Living</h2>
                            <p className="pronounce">[ flek-suh-buhl · turm · uh-pahrt-muhnt · liv-ing ] <i><b>noun</b></i>
                            </p>
                            <ol>
                                <li>An ideal hotel alternative for companies & individuals in need of temporary housing
                                    that
                                    feels like home.
                                </li>
                                <li>A more affordable and more comfortable short-term living option compared to an
                                    extended-stay hotel.
                                </li>
                            </ol>
                        </div>
                        <ul>
                            <li>14 Day Minimum</li>
                            <li>No Lease and No Deposit</li>
                            <li>0 days notice to vacate</li>
                            <li>Book your stay in 5 minutes</li>
                            <li>Fully Equipped & Furnished</li>
                            <li>Comprehensive housewares & kitchenwares provided</li>
                            <li>All Utilities included + Internet</li>
                            <li>Washer & Dryer in-unit</li>
                            <li>Credit Card charged weekly</li>
                            <li>Corporate direct-bill available</li>
                            <li>Stays 30 days or longer receive one complimentary apartment cleaning per month,
                                upon request
                            </li>
                            <li>No pets</li>
                        </ul>
                    </div>


                    <h3><i>Perfect for...</i></h3>
                    <h3>Visiting Professionals | Relocated Employees | Homeowners in
                        Transition
                        | Insurance Housing |
                        Students | Leisure Travelers</h3>
                </section>
            </div>
        </FeatureSection>
    );
}