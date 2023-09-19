import {PropertyDetails, PropertyId} from "../data/Property";
import AdminApi from "../../service/AdminApi";

export const getProperty = (propertyId: PropertyId): Promise<PropertyDetails> => {
    return AdminApi.get("properties/" + propertyId + "?projection=details")
        .then(response => response.data);
};
