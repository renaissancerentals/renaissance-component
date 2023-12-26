import axios from 'axios';

export const RENAISSANCE_ADMIN_BASE_URL = process.env.REACT_APP_ADMIN_BASE_URL ? process.env.REACT_APP_ADMIN_BASE_URL : "https://renaissancerentals-admin.herokuapp.com/";

export default axios.create({
    baseURL: RENAISSANCE_ADMIN_BASE_URL + "api/"
});
