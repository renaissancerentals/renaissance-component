export interface Sublet {
    id: string;
    assetKey: string;
    email: string;
    firstName: string;
    lastName: string;
    bedroom: string;
    availableBedrooms: string;
    availableFrom: string;
    availableTo: string;
    rent: string;
    petsAllowed: boolean;
    utilitiesIncluded: boolean;
    address: string;
    zipcode: string;
    subletFolderId: string;
    photosFolderId: string;
    coverImage: string;
    title: string;
    description: string;
    createdDate: string;
    active: boolean;
    approved: boolean;
}

export const defaultSublet: Sublet = {
    id: "",
    assetKey: "",
    email: "",
    firstName: "",
    lastName: "",
    bedroom: "1",
    availableBedrooms: "1",
    availableFrom: "",
    availableTo: "",
    rent: "",
    petsAllowed: false,
    utilitiesIncluded: true,
    address: "",
    zipcode: "",
    subletFolderId: "",
    photosFolderId: "",
    coverImage: "",
    title: "",
    description: "",
    createdDate: "",
    active: true,
    approved: false,
}