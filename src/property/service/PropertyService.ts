import {PropertyDetails, PropertyFaq, PropertyFilterData, PropertyId} from "../data/Property";
import Api from "../../service/Api";

export const getProperty = async (propertyId: PropertyId): Promise<PropertyDetails> => {

    const response = await Api.get("properties/" + propertyId + "?projection=details");
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
export const getPropertyFaqs = async (propertyId: string): Promise<PropertyFaq[]> => {
    let response = await Api.get("properties/" + propertyId + "/faqs");
    return response.data;
};
export const getAllPropertyFilterData = async (): Promise<PropertyFilterData[]> => {
    let response = await Api.get("properties?projection=filter");

    return response.data
        .filter((property: PropertyFilterData) => !property.name.toLowerCase().includes("garage"));
}
