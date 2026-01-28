export interface Sublet {
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
}

export const defaultSublet: Sublet = {
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
}
