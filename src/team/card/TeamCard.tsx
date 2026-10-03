import React, {Fragment} from "react";
import {TeamMember} from "../..";
import defaultAvatar from "../../assets/default-avatar.png";
import "./assets/TeamCard.css";
import {getAssetUrl} from "../../asset/service/AssetService";
import {IMAGE_WIDTH} from "../../asset/service/ImageWidth";

export const TeamCard: React.FC<TeamCardProps> = ({member, propertyId}) => {

    return (
        <Fragment>
            {
                member ?
                    <div className="team-card">
                        <div className="div-team-image">
                            <img loading="lazy" decoding="async" className="team-image"
                                 src={member.photoLink ? getAssetUrl(member.photoLink, propertyId, IMAGE_WIDTH.thumb) : defaultAvatar}
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
    member?: TeamMember;
    propertyId: string;
}
