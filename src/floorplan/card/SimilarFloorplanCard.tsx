import React, {useEffect, useState} from "react";
import {FloorplanSpotlight, SimilarFloorplan} from "../data/Floorplan";
import {getAssetUrl} from "../../asset/service/AssetService";
import {DEFAULT_IMAGE_URL} from "../../service/Api";
import {Card} from "../../card/Card";
import {ItemSlider, Spinner} from "@contentmunch/muncher-ui";
import {rangeFrom} from "../../utils/Utils";
import "./assets/SimilarFloorplanCard.scss"
import {addressFromFloorplanSpotlight, getFloorplanSpotlight} from "../service/FloorplanService";

export const SimilarFloorplanCard: React.FC<SimilarFloorplanCardProps> = ({similarFloorplans}) => {
    const [floorplans, setFloorplans] = useState<FloorplanSpotlight[]>([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const promises: Promise<FloorplanSpotlight>[] = [];
        similarFloorplans.forEach(similarFloorplan => {
            promises.push(getFloorplanSpotlight(similarFloorplan.similarFloorplanId));
        });
        Promise.all(promises).then(data => {
            setFloorplans(data);
        }).finally(() => setIsLoading(false));

    }, [similarFloorplans]);

    const imageUrl = (floorplan: FloorplanSpotlight): string => {
        if (floorplan && floorplan.coverImage)
            return getAssetUrl(floorplan.coverImage, floorplan.property.id);
        else
            return DEFAULT_IMAGE_URL;

    };
    const printFloorplanAddress = (floorplan: FloorplanSpotlight) => {
        const address = addressFromFloorplanSpotlight(floorplan);
        return address.address + ", " + address.city + " " + address.state + ", " + address.zipcode;
    }
    return (

        <div className="similar-floorplans-card">
            <Card title="You Might Also Like">
                {isLoading ? <Spinner size="medium"/> :
                    <ItemSlider navButtonSize="medium" sliderItems={floorplans.map(floorplan =>
                        <div className="similar-floorplan-card">
                            <div className="card-slider-body"
                                 style={{backgroundImage: `url(${imageUrl(floorplan)})`}}>

                            </div>
                            <div className="card-slider-footer">
                                <h3><a href={"/floorplans/" + floorplan.id}>{floorplan.name}</a>
                                </h3>
                                <p>{printFloorplanAddress(floorplan)}</p>
                                <p> {floorplan.bedroom} Bedroom
                                    ${rangeFrom(floorplan.units, "rent")}/mo</p>
                            </div>
                        </div>
                    )}/>
                }
            </Card>
        </div>
    );
};

export interface SimilarFloorplanCardProps {
    similarFloorplans: SimilarFloorplan[];
}
