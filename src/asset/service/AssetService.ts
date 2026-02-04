import {extractIdFrom, isGoogleDriveImage} from "../../utils/Utils";
import AssetApi from "../../service/AssetApi";
import {Asset} from "../data/Asset";

const ASSET_DOWNLOAD_FRAGMENT = "api/asset/download/";

export const propertyFragment = (propertyId?: string): string => propertyId ? propertyId + "/" : "";
export const getAssetUrl = (imageUrl: string, assetGatewayId?: string): string => {
    if (isGoogleDriveImage(imageUrl)) {

        return propertyIdToDomain() + ASSET_DOWNLOAD_FRAGMENT + extractIdFrom(imageUrl);
    }
    return imageUrl;
};

export const assetUrlFrom = (id: string, assetGatewayId: string): string => propertyIdToDomain(propertyFragment(assetGatewayId)) + ASSET_DOWNLOAD_FRAGMENT + id;


// export const getAssetsFrom = async (folderId: string): Promise<Asset[]> => {
//     let response = await AssetApi.get("assets/" + folderId);
//     return await response.data._embedded ?
//         response.data._embedded.assets.filter((a: Asset) => a !== undefined)
//             .sort((a: Asset, b: Asset) => parseInt(a.name) - parseInt(b.name))
//         : [];
// }
export const getAssetsFrom = (folderId: string): Promise<Asset[]> => {
    return AssetApi.get("assets/" + folderId)
        .then(response => response.data._embedded ?
            response.data._embedded.assets.sort((a: Asset, b: Asset) => parseInt(a.name) - parseInt(b.name)) : [])
        .catch(reason => {
            console.log(reason);
        });
}


export const propertyIdToDomain = (propertyId?: string): string => {
    const assetDomains = [
        "https://www.veronaparkneighborhood.com/",
        "https://www.covenanterhill.com/",
        "https://www.highgrovebloomington.com/",
        "https://www.scholarsquad.com/",
        "https://www.summerhouseatindiana.com/",
        "https://www.veronaparkneighborhood.com/"
    ];
    const random = Math.ceil(Math.random() * 6) - 1;

    return random < 0 || random > assetDomains.length - 1 ? assetDomains[0] : assetDomains[random];
}
