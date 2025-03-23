import {PropertyDetails, PropertyId} from "../data/Property";
import {get} from "../../service/RoundRobin";

export const getProperty = (propertyId: PropertyId): Promise<PropertyDetails> => {

    return get("properties/" + propertyId + "?projection=details")
        .then(response => response.data);

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
