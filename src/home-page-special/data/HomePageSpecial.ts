export interface HomePageSpecialBasic {
    id: string;
    description: string;
    image: string;
    startDate: string;
    endDate: string;
    links: ClickableRegion[];
}

export interface HomePageSpecialData extends HomePageSpecialBasic {
    properties: string;
}

export interface HomePageSpecial extends HomePageSpecialBasic {
    properties: string[];
}

export interface ClickableRegion {
    x: number;      // Store as percentage (0-100)
    y: number;      // Store as percentage (0-100)
    width: number;  // Store as percentage
    height: number; // Store as percentage
    url: string;    // The destination link
}
