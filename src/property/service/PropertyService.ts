import {PropertyDetails, PropertyId} from "../data/Property";
import {get} from "../../service/RoundRobin";

export const getProperty = (propertyId: PropertyId): Promise<PropertyDetails> => {

    return get("properties/" + propertyId + "?projection=details")
        .then(response => response.data);

};
