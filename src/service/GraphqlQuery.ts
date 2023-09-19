import axios from 'axios';
import {RENAISSANCE_ADMIN_BASE_URL} from "./AdminApi";

const execute = (query: string) => {
    return axios.post(RENAISSANCE_ADMIN_BASE_URL + 'graphql', {
        query
    });
}
export default execute;