export interface HomePageSpecialBasic {
    id: string;
    title: string;
    description: string;
    information1: string;
    information2: string;
    information3: string;
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
