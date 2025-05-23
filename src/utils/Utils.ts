import _ from "lodash";
import moment, {Moment} from "moment";
import {decodeEntity} from "html-entities";
import {FloorplanAddress} from "../floorplan/service/FloorplanService";
import {renaissance} from "../data/RenaissanceData";

export const MIN_VALUE = 0;
export const MAX_VALUE = 4000;
export const isEmpty = (object: any): boolean => {
    return !object || _.isEmpty(object);
}
export const formatPhoneNumber = (phone?: string): string => {
    if (!phone) return "";
    const match = phone.toString().match(/^(\d{3})(\d{3})(\d{4})$/);
    return match ? "(" + match[1] + ")-" + match[2] + "-" + match[3] : phone;
}
export const renaissanceAddress = (address: string, zipcode: string) => `${address}, ${renaissance.city},${renaissance.state} ${zipcode}`

const cleanAddressForGoogle = (address?: string): string => address ? address.replace(/apt. /gi, "") : "";
export const addressToGoogleMapLink = (address?: string, zipcode?: string) => "https://maps.google.com/?q=" + cleanAddressForGoogle(address) + "," + zipcode;
export const addressToGoogleMap = (address?: string, zipcode?: string) => "https://www.google.com/maps?output=embed&q=" + cleanAddressForGoogle(address) + "," + zipcode;

export const floorplanAddressToGoogleMap = (floorplanAddress: FloorplanAddress) =>
    "https://www.google.com/maps?output=embed&q=" + cleanAddressForGoogle(floorplanAddress.address) + ", " + floorplanAddress.city + ", " + floorplanAddress.state + " " + floorplanAddress.zipcode;
export const enumToString = (value?: string): string => {

    return value && !isEmpty(value) ? value.replaceAll("_", " ").toLowerCase() : "";
};

export const capitalizeFirstLetter = (value: string): string => {
    if (value) {
        let lowerCased = value.toLowerCase();
        return lowerCased.charAt(0).toUpperCase() + lowerCased.slice(1);
    }
    return value;
}
export const toUSD = (num: number) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
}).format(num);
export const toDate = (date: string) => new Date(date).toLocaleString('en-US');
export const youtubeUrlToEmbedUrl = (youtubeUrl: string) => "https://www.youtube.com/embed/" + youtubeUrl.split("/").pop()?.trim() + "?rel=0";


export const isGoogleDriveImage = (imageUrl: string) => imageUrl && true && imageUrl.includes("drive.google.com");
export const extractIdFrom = (imageUrl: string | null): string => {
    if (imageUrl) {
        const paramString = imageUrl.split('?')[1];
        const queryString = new URLSearchParams(paramString);
        const id = queryString.get("id");
        return id === null ? "" : id.trim();
    } else
        return "";
};

export interface MinMax {
    min: number;
    max: number;
}

export const minimumMaximum = (arr: any[], field: string): MinMax => {
    try {
        const sorted = arr.filter(value => value.active ? value.active : true).sort((a, b) =>
            a[field] && b[field] ? a[field] - b[field] : 0
        );

        return {
            min: sorted[0][field],
            max: sorted[sorted.length - 1][field]
        }
    } catch (e: any) {
        return {
            min: MIN_VALUE,
            max: MIN_VALUE
        }
    }
}
export const rangeFrom = (arr: any[], field: string): string => {
    if (arr && arr.length > 0) {
        const minMax = minimumMaximum(arr, field);

        return (minMax.min === minMax.max) ? minMax.min.toString() : minMax.min + " - " + minMax.max;
    } else {
        return "-";
    }
}

export const dateToMoment = (date: string): Moment => moment(date, "YYYY-MM-DD");

export const momentToDate = (date: Moment): string => date.format("YYYY-MM-DD");

export const decode = (content: string) => {
    return decodeEntity(content);
};

export const formatDate = (date: string): string => {
    return moment(date, "YYYY-MM-DD").format('MMM DD, YYYY');
};

export const isZipcodeValid = (zipcode?: string): boolean => {
    if (!zipcode)
        return true;
    const zipcodePattern = /^\d{5}$/;
    return zipcodePattern.test(zipcode);
};

export const availabilityDate = (moveInDate: string): string => {
    const date = dateToMoment(moveInDate);
    const today = moment();
    const todayOrBefore = date.isSame(today, 'day') || date.isBefore(today, 'day');
    if (todayOrBefore)
        return formatDate(momentToDate(today));

    return formatDate(moveInDate)
}
