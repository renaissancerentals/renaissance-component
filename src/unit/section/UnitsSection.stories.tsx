import React, {useEffect, useState} from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {UnitsSection} from "./UnitsSection";
import {UnitCardData} from "../data/Unit";
import {getFloorplansFilterData} from "../../floorplan/service/FloorplanService";
import {sortUnits, unitsFromFloorplans} from "../service/UnitService";

export default {
    title: "Section/UnitsSection",
    component: UnitsSection,
} as ComponentMeta<typeof UnitsSection>;

const Template: ComponentStory<typeof UnitsSection> = (args) => {
    const [units, setUnits] = useState<UnitCardData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        getFloorplansFilterData("scholars-rooftop")
            .then((floorplanData) => {
                const units = unitsFromFloorplans(floorplanData);

                setUnits(sortUnits(units, "featured"));
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);
    return (
        isLoading ? <></> :
            <UnitsSection
                {...args}
                units={units}
                propertyId="scholars-rooftop"
            />
    );
};
export const Default = Template.bind({});

