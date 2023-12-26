import {PropertyDetails, PropertyId} from "../data/Property";
import {graphql} from "../../service/RoundRobin";

const getPropertyQuery = (propertyId: String) => {
    return '{                                                       \
        property(id: "' + propertyId + '") {                        \
            id name address zipcode active phone email rating description secondaryEmail\
            facebookLink twitterLink htmlTitle metaDescription\
            logo leasingOfficeType coverImage propertyFolderId\
            photosFolderId youtubeLink ratingLink conversionTrackingId1\
            conversionTrackingId2 amenities {id name type featured}\
            teamMembers {id name blogLink jobTitle email  photoLink }\
            busRoutes { busRoute busRouteLink}\
            leasingOffice { \
                id name address zipcode phone officeHours direction officeMap \
                officeMapLandscape officeImage officeImageDescription \
            }\
            floorplans { id name bedroom bathroom style featured \
                greenCertified videoTourLink threeSixtyVideoTourLink \
                virtualTourLink photo coverImage floorPlanFolderId \
                photosFolderId active amenities {id name featured type} \
                units { id squareFoot allowedPet rent discountedRent \
                    deposit garages moveInDate furnished active \
                }\
            }                                                   \
        }                                                           \
    }'
}
export const getProperty = (propertyId: PropertyId): Promise<PropertyDetails> => {
    return graphql(getPropertyQuery(propertyId))
        .then(response => response.data.data.property);
};
