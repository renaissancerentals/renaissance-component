export interface HomePageSpecialBasic {
    id: string;
    title: string;
    description: string;
    details: string;
    image: string;
    startDate: string;
    endDate: string;
}

export interface HomePageSpecialData extends HomePageSpecialBasic {
    properties: string;
}

export interface HomePageSpecial extends HomePageSpecialBasic {
    properties: string[];
}
