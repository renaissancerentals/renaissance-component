import {LeaseType, PropertyDetails, PropertyFaq, PropertyFilterData, PropertyId} from "../data/Property";
import {get} from "../../service/RoundRobin";

export const getProperty = async (propertyId: PropertyId): Promise<PropertyDetails> => {

    const response = await get("properties/" + propertyId + "?projection=details");
    return response.data;

};

const videoIdFrom = (coverVideo: string): string | null => {
    const regex = /[?&]id=([^&]+)/;  // Regular expression to match the id parameter
    const match = coverVideo.match(regex);  // Apply the regex on the URL

    if (match) {
        return match[1];  // Return the value of the id parameter
    }

    return null;  // Return null if no id is found
}


export const generatePropertyVideoUrl = (coverVideo: string): string | null => {

    const videoId = videoIdFrom(coverVideo);

    if (!videoId) {
        return null;
    }

    return `https://www.googleapis.com/drive/v3/files/${videoId}?alt=media&key=AIzaSyAdG4u5YD2CZvQTv_hRtaKrmSNWZkY30oU`

};
export const getAllPropertyFilterData = async (): Promise<PropertyFilterData[]> => {
    let response = await get("properties/filter");

    const properties: PropertyFilterData[] = response.data
        .filter((property: PropertyFilterData) => property.active)
        .filter((property: PropertyFilterData) => property.leaseType === LeaseType.YEARLY)
        .filter((property: PropertyFilterData) => !property.name.toLowerCase().includes("garage"));

    properties.forEach(property => {
        property.floorplans = property.floorplans.filter(floorplan => floorplan.active);
        property.floorplans.forEach(floorplan => {
            floorplan.units = floorplan.units.filter(unit => unit.active);
        });
    });

    return properties;
}
export const getPropertyFaqs = async (propertyId: string): Promise<PropertyFaq[]> => {
    let response = await get("propertyFaqs/search/byPropertyId?projection=withId&propertyId=" + propertyId);
    return await response.data._embedded.propertyFaqs;
};
