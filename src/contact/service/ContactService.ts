import Api from "../../service/Api";
import gtag, {install} from 'ga-gtag';
import {ContactMessage} from "../data/ContactMessage";
import {ContactPropertyIds} from "../ContactSection";
import RenaissanceApi from "../../service/RenaissanceApi";

export const sendContactMail = (message: ContactMessage) => {
    return Api.post("mail/contact", message).then(response => response.data);
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

export const trackContactClicked = (propertyId: ContactPropertyIds) => {
    RenaissanceApi.post("analytics/contact-events", {
        "property": propertyId,
        "type": "clicked"
    });
}

export const trackContactSubmitted = (propertyId: ContactPropertyIds) => {
    RenaissanceApi.post("analytics/contact-events", {
        "property": propertyId,
        "type": "submitted"
    });
}

export const trackContactInitiated = (propertyId: ContactPropertyIds) => {
    RenaissanceApi.post("analytics/contact-events", {
        "property": propertyId,
        "type": "initiated"
    });
}
