import axios, {AxiosResponse} from "axios";

export const REACT_APP_DATA_BASE_URLS: string[] = process.env.REACT_APP_DATA_BASE_URLS ? process.env.REACT_APP_DATA_BASE_URLS.split(",") : [
    "https://scholars-rooftop.herokuapp.com/",
    "https://renaissancerentals.herokuapp.com/",
]
let currentIndex = 0;
const getBaseUrl = (): string => {
    currentIndex = currentIndex >= REACT_APP_DATA_BASE_URLS.length - 1 ? 0 : currentIndex + 1;
    return REACT_APP_DATA_BASE_URLS[currentIndex];

}
export const get = (url: string): Promise<AxiosResponse<any, any>> => axios.get(getBaseUrl() + "api/data/" + url);

