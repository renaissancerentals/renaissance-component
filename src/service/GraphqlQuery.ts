import axios from 'axios';

export const RENAISSANCE_GRAPHQL_BASE_URL = process.env.REACT_APP_GRAPHQL_BASE_URL ? process.env.REACT_APP_GRAPHQL_BASE_URL : "https://scholars-rooftop.herokuapp.com/";
const execute = (query: string) => {
    return axios.post(RENAISSANCE_GRAPHQL_BASE_URL + 'graphql', {
        query
    });
}
export default execute;
