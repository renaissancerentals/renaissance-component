import {extractIdFrom, isGoogleDriveImage} from "../../utils/Utils";
import {Asset} from "../data/Asset";
import Api from "../../service/Api";

export const propertyFragment = (propertyId?: string): string => propertyId ? propertyId + "/" : "";
export const getAssetUrl = (imageUrl: string, assetGatewayId?: string): string => {
    if (isGoogleDriveImage(imageUrl)) {

        return propertyIdToDomain() + "api/assets/" + extractIdFrom(imageUrl) + "/download";
    }
    return imageUrl;
};

export const assetUrlFrom = (id: string, assetGatewayId: string): string => propertyIdToDomain(propertyFragment(assetGatewayId)) + "api/assets/" + id + "/download";
;


// export const getAssetsFrom = async (folderId: string): Promise<Asset[]> => {
//     let response = await AssetApi.get("assets/" + folderId);
//     return await response.data._embedded ?
//         response.data._embedded.assets.filter((a: Asset) => a !== undefined)
//             .sort((a: Asset, b: Asset) => parseInt(a.name) - parseInt(b.name))
//         : [];
// }
export const getAssetsFrom = (folderId: string): Promise<Asset[]> => {
    return Api.get("folders/" + folderId + "/assets")
        .then(response => response.data.items ?
            response.data.items.sort((a: Asset, b: Asset) => parseInt(a.name) - parseInt(b.name)) : [])
        .catch(reason => {
            console.log(reason);
        });
}
export const assetDomains: string[] = process.env.REACT_APP_ASSET_BASE_URLS ? process.env.REACT_APP_ASSET_BASE_URLS.split(",") : [
    "https://www.veronaparkneighborhood.com/",
    "https://www.covenanterhill.com/",
    "https://www.highgrovebloomington.com/",
    "https://www.scholarsquad.com/",
    "https://www.summerhouseatindiana.com/",
]

export const propertyIdToDomain = (propertyId?: string): string => {

    const random = Math.ceil(Math.random() * 6) - 1;

    return random < 0 || random > assetDomains.length - 1 ? assetDomains[0] : assetDomains[random];
}
