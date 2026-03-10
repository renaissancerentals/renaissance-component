import axios from 'axios';


export const REACT_APP_DATA_BASE_URLS: string[] = process.env.REACT_APP_DATA_BASE_URLS ? process.env.REACT_APP_DATA_BASE_URLS.split(",") : [
    "https://www.scholarsrooftop.com/",
    // "https://www.renaissancerentals.com/",
]
let currentIndex = 0;
export const getBaseUrl = (): string => {
    currentIndex = currentIndex >= REACT_APP_DATA_BASE_URLS.length - 1 ? 0 : currentIndex + 1;
    return REACT_APP_DATA_BASE_URLS[currentIndex];

}
export const DEFAULT_IMAGE_URL = getBaseUrl() + "img/default.png";
export default axios.create({
    baseURL: getBaseUrl() + "api/"
});
