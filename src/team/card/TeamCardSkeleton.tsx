import React from "react";
import Skeleton from "react-loading-skeleton";
import "./assets/TeamCard.scss";
export const TeamCardSkeleton: React.FC = () => {

    return (
        <div className="team-card">
            <Skeleton circle={true} height={200} width={200}/>
            <h4><Skeleton width={200}/></h4>
            <p><Skeleton width={250}/></p>
        </div>
    );
}