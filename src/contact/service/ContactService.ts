import Api from "../../service/Api";
import gtag, {install} from 'ga-gtag';
import {ContactMessage} from "../data/ContactMessage";
import {AllPropertyId} from "../ContactSection";
import AdminApi from "../../service/AdminApi";

export const sendContactMail = (message: ContactMessage) => {
    return Api.post("mail/v3/contact", message).then(response => response.data);
};
export const sendToConversionTracking = (trackingId: string) => {
    install('UA-142676339-1');
    try {
        console.log("sending tracking id to google:" + trackingId);
        gtag('event', 'conversion', {'send_to': trackingId});
    } catch (error) {
        console.log("Error from the trackerPageView => ", error);
    }

};

export const trackContactClicked = (propertyId: AllPropertyId) => {
    AdminApi.post("admin/analytics/contact/clicked", {
        "property": propertyId
    });
}

export const trackContactSubmitted = (propertyId: AllPropertyId) => {
    AdminApi.post("admin/analytics/contact/submitted", {
        "property": propertyId
    });
}
