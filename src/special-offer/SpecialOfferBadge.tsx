import React from "react";
import "./assets/SpecialOfferBadge.css";
import {Badge} from "@contentmunch/contentmunch-ui";
import startIcon from "./assets/ConcaveStar.png";

export const SpecialOfferBadge: React.FC = () => {
    return (
        <span className="special-offer-badge">
            <Badge variant="primary"><img className="star-icon" src={startIcon} alt="star icon"/>Special Offer</Badge>
        </span>
    )
}
