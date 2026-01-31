import axios from 'axios';
import {RENAISSANCE_BASE_URL} from "./Api";


export const ASSET_BASE_URL = process.env.REACT_APP_ASSET_BASE_URL ? process.env.REACT_APP_ASSET_BASE_URL : "https://www.veronaparkneighborhood.com/";
export const DEFAULT_IMAGE_URL = RENAISSANCE_BASE_URL + "img/default.png";
export default axios.create({
    baseURL: ASSET_BASE_URL + "api/"
});
