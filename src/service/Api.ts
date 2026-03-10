import axios, {AxiosResponse} from 'axios';


export const REACT_APP_DATA_BASE_URLS: string[] = process.env.REACT_APP_DATA_BASE_URLS ? process.env.REACT_APP_DATA_BASE_URLS.split(",") : [
    "https://www.scholarsrooftop.com/",
    "https://www.renaissancerentals.com/",
]
export const getBaseUrl = (): string => {
    let index = Number(sessionStorage.getItem("baseUrlIndex") ?? 0);

    const url = REACT_APP_DATA_BASE_URLS[index];

    index = (index + 1) % REACT_APP_DATA_BASE_URLS.length;

    sessionStorage.setItem("baseUrlIndex", String(index));

    return url;
};
export const DEFAULT_IMAGE_URL = getBaseUrl() + "img/default.png";
export default axios.create({
    baseURL: getBaseUrl() + "api/"
});
export const get = (url: string): Promise<AxiosResponse<any, any>> => axios.get(getBaseUrl() + "api/" + url);
