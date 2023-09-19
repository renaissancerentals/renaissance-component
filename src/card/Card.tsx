import React from "react";
import "./assets/Card.scss";
import {Paper} from "@contentmunch/muncher-ui";

export const Card: React.FC<CardProps> = ({title, featured, children}) => {
    return (

        <section className="section-card">
            <Paper>
                {title ? <div className="card-header">{title}</div> : <></>}

                <div className={featured ? "card-body card-body--featured" : "card-body"}>
                    {children}
                </div>
            </Paper>
        </section>
    );
};

export interface CardProps {
    title?: string;
    featured?: boolean;
    children?:any;
}
