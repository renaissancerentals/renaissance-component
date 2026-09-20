import React from "react";
import "./assets/SpecialOfferButton.css";
import {Button} from "@contentmunch/contentmunch-ui";
import startIcon from "./assets/ConcaveStar.png"

export const SpecialOfferButton: React.FC<SpecialOfferButtonProps> = ({onMouseEnter, onMouseLeave}) => {
    return (
        <span className="special-offer-button">
            <Button variant="primary" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <img className="star-icon"
                     src={startIcon}
                     alt="star icon"/>Special Offer</Button>
        </span>
    )
}

export interface SpecialOfferButtonProps {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}
