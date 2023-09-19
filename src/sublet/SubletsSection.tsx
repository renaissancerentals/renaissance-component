import React, {useEffect, useState} from "react";

import "./assets/SubletsSection.scss";
import {Sublet} from "./data/Sublet";
import {getSublets} from "./services/SubletService";
import {Button, Icon} from "@contentmunch/muncher-ui";
import {SubletCard} from "./SubletCard";

export const SubletsSection: React.FC<SubletsSectionProps> = ({linkToSubletCreatePage}) => {
    const [sublets, setSublets] = useState<Sublet[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getSublets().then(data => {

            setSublets(data);
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

    return (
        <section className="section-sublets">
            <div className="container">

                <header>
                    <Button><a href={linkToSubletCreatePage}>
                        <Icon name="plus">Add Sublet</Icon></a>
                    </Button>
                    <hr/>
                </header>
                {isLoading ? "loading..." :
                    sublets.map((sublet, i) =>
                        <SubletCard sublet={sublet} key={"sublet-card-" + i}/>
                    )}
            </div>
        </section>
    );
}

export interface SubletsSectionProps {
    linkToSubletCreatePage: string;
}