import React, {useEffect} from "react";
import "./assets/Hostaway.scss";
import {Badge, Icon} from "@contentmunch/muncher-ui";

export const Hostaway: React.FC<HostawayProps> = ({contactNumber}) => {

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://d2q3n06xhbi0am.cloudfront.net/widget.js?1640277196';
        script.async = true;
        script.onload = () => {
            if (window.searchBar) {
                window.searchBar({
                    baseUrl: 'https://summerhouseatindiana.holidayfuture.com/',
                    showLocation: false,
                    color: '#13294b',
                    rounded: false,
                    openInNewTab: false,
                    font: 'Libre Baskerville',
                });
            }
        };
        document.body.appendChild(script);
    }, []);
    return (
        <section className="section-hostaway">
            <div className="container">
                <h2 className="heading">
                    <span className="emphasized">Stays under 2 weeks</span>
                </h2>
                <div className="two-column-layout">
                    <div className="first-column">
                        <h3>Need a stay user 2 weeks?</h3>
                        <p>Short stays are available - search our live availability and book directly, or call us to
                            discuss options.</p>
                        <Badge><Icon name="uneven-hamburger">Rates vary by unit and season</Icon></Badge>
                    </div>
                    <div className="second-column">
                        <h4>Search Availability</h4>
                        <div className="hostaway-wrapper">
                            <div id="hostaway-booking-widget"></div>
                        </div>
                        <p className="footnote main">Not finding what you'd like? Call or Text us</p>
                        <p className="footnote mobile">Not finding what you'd like? <a href={`tel:${contactNumber}`}>Call
                            or
                            Text</a> us</p>
                    </div>
                </div>
            </div>
        </section>

    );
}

declare global {
    interface Window {
        searchBar: (options: {
            baseUrl: string;
            showLocation: boolean;
            color: string;
            rounded: boolean;
            openInNewTab: boolean;
            font: string;
        }) => void;
    }
}

interface HostawayProps {
    contactNumber: string;
}
