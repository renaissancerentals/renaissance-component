import axios from 'axios';

export const APP_BASE_URL = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : "https://www.scholarsrooftop.com/";

export default axios.create({
    baseURL: APP_BASE_URL + "api/"
});
