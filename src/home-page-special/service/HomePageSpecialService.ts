import {HomePageSpecial, HomePageSpecialData} from "../data/HomePageSpecial";
import {get} from "../../service/RoundRobin";


const getHomeHomePageSpecialData = async (): Promise<HomePageSpecialData[]> => {
    let response = await get("homePageSpecials/filter");
    return await response.data;
};

const filterByPropertyId = (homePageSpecials: HomePageSpecial[], propertyId: string): HomePageSpecial[] =>
    homePageSpecials.filter(homePageSpecial => homePageSpecial.properties.includes(propertyId));

const homePageSpecialFrom = (homePageSpecialData: HomePageSpecialData): HomePageSpecial => ({
    ...homePageSpecialData,
    properties: homePageSpecialData.properties ? homePageSpecialData.properties.split(",") : []
})

const sortByDateAscending = (homePageSpecials: HomePageSpecial[]): HomePageSpecial[] => homePageSpecials
    .sort((a, b) => a.startDate < b.startDate ? -1 : (a.startDate > b.startDate ? 1 : 0))
const homePageSpecialsFrom = (homePageSpecialData: HomePageSpecialData[]): HomePageSpecial[] =>
    sortByDateAscending(homePageSpecialData.map(homePageSpecialData => homePageSpecialFrom(homePageSpecialData)))


export const getHomeHomePageSpecials = async (propertyId: string): Promise<HomePageSpecial[]> => {

    return await getHomeHomePageSpecialData().then(data => filterByPropertyId(homePageSpecialsFrom(data), propertyId))
};
