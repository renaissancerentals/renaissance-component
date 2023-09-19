import React from 'react';
import './assets/Team.scss';
import {TeamCard} from "./card/TeamCard";
import {TeamCardSkeleton} from "./card/TeamCardSkeleton";
import {PropertyTeamMember} from "..";

export const TeamSection: React.FC<TeamSectionProps> = ({teamMembers, isLoading, propertyId}) => {

    return (
        <section className="section-team">
            <h2 className="heading"><span className="emphasized">Meet Our Team</span></h2>
            <div className="members">
                {isLoading ?
                    [...Array(3)].map((_, i) => (
                        <TeamCardSkeleton key={i}/>
                    )) :
                    teamMembers.map(member => (
                        <TeamCard key={member.name} member={member} propertyId={propertyId}/>
                    ))}
            </div>

        </section>
    );
};

export interface TeamSectionProps {
    teamMembers: PropertyTeamMember[];
    isLoading: boolean;
    propertyId: string;

}