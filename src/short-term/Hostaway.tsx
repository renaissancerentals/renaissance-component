import React, {useEffect} from "react";
import "./assets/Hostaway.scss";

export const Hostaway: React.FC<HostawayProps> = ({contactNumber}) => {

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://d2q3n06xhbi0am.cloudfront.net/widget.js?1640277196';
        script.async = true;
        script.onload = () => {
            if (window.searchBar) {
                window.searchBar({
                    baseUrl: 'https://www.summerhouseatindiana.holidayfuture.com/',
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
                <p>Search our availability and book directly</p>
                <div className="hostaway-wrapper">
                    <div id="hostaway-booking-widget"></div>
                </div>
                <p className="footnote main">Not finding what you'd like? Call or Text us for more options</p>
                <p className="footnote mobile">Not finding what you'd like? <a href={`tel:${contactNumber}`}>Call or Text</a> us for more options</p>
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
