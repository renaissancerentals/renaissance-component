import React, {Fragment} from "react";
import {PropertyTeamMember} from "../..";
import defaultAvatar from "../../assets/default-avatar.png";
import "./assets/TeamCard.scss";
import {getAssetUrl} from "../../asset/service/AssetService";

export const TeamCard: React.FC<TeamCardProps> = ({member, propertyId}) => {

    return (
        <Fragment>
            {
                member ?
                    <div className="team-card">
                        <div className="div-team-image">
                            <img className="team-image"
                                 src={member.photoLink ? getAssetUrl(member.photoLink, propertyId) : defaultAvatar}
                                 alt={member.name}
                            />
                            <div className="team-image-info">
                                <div className="team-image-info-content">
                                    <p><a href={"mailto:" + member.email}><i>{member.email}</i></a>
                                        <br/><br/>
                                        {member.blogLink ? <a href={member.blogLink}><b>MORE ABOUT ME</b></a> : ""}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <h4>{member.name}</h4>
                        <p>{member.jobTitle}</p>
                    </div> : ""}
        </Fragment>
    );
}

export interface TeamCardProps {
    member?: PropertyTeamMember;
    propertyId: string;
}