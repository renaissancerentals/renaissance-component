import React, {useEffect, useState} from "react";
import {Meta, Story} from "@storybook/react";
import {PropertyLocation, PropertyLocationProps} from "./PropertyLocation";
import {Property, PropertyId} from "./data/Property";
import {getProperty} from "./service/PropertyService";

export default {
    title: "Section/Property Location",
    component: PropertyLocation

} as Meta;

const Template: Story = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [property, setProperty] = useState<Property>({} as Property);

    useEffect(() => {
        getProperty("covenanter-hill").then(data => {
            setProperty(data);
        }).finally(() => setIsLoading(false));
    }, []);
    return <PropertyLocation property={property} isLoading={isLoading} handleRefToContact={()=>{ console.log("Contact clicked!")}}/>

}

export interface PropertyStoryProps extends PropertyLocationProps {
    propertyId: PropertyId;
}

export const Default = Template.bind({});

