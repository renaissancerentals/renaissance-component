import axios, {AxiosResponse} from 'axios';

export const RENAISSANCE_GRAPHQL_BASE_URL = process.env.REACT_APP_GRAPHQL_BASE_URL ? process.env.REACT_APP_GRAPHQL_BASE_URL : "https://scholars-rooftop.herokuapp.com/";
const execute = (query: string) => {
    return axios.post(RENAISSANCE_GRAPHQL_BASE_URL + 'graphql', {
        query
    });
}


export const graphql = (query: string): Promise<AxiosResponse<any, any>> => execute(query);
