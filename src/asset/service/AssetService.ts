import {extractIdFrom, isGoogleDriveImage} from "../../utils/Utils";
import AssetApi from "../../service/AssetApi";
import {Asset} from "../data/Asset";

const ASSET_DOWNLOAD_FRAGMENT = "api/asset/download/";

export const propertyFragment = (propertyId?: string): string => propertyId ? propertyId + "/" : "";
export const getAssetUrl = (imageUrl: string, assetGatewayId: string): string => {
    if (isGoogleDriveImage(imageUrl)) {
        return propertyIdToDomain(propertyFragment(assetGatewayId)) + ASSET_DOWNLOAD_FRAGMENT + extractIdFrom(imageUrl);
    }
    return imageUrl;
};

export const assetUrlFrom = (id: string, assetGatewayId: string): string => propertyIdToDomain(propertyFragment(assetGatewayId)) + ASSET_DOWNLOAD_FRAGMENT + id;

export const getAssetsFrom = (folderId: string): Promise<Asset[]> => {
    return AssetApi.get("assets/" + folderId)
        .then(response => response.data._embedded ? response.data._embedded.assets.sort((a: Asset, b: Asset) => parseInt(a.name) - parseInt(b.name)) : []);
}


export const propertyIdToDomain = (propertyId: string): string => {
    switch (propertyId) {
        case "verona-park":
            return "https://verona-park.herokuapp.com/";
        case "cov-affordable":
        case "covenanter-hill" :
            return "https://covenanter-hill.herokuapp.com/";
        case "high-grove":
        case "meadow-creek":
            return "https://high-grove.herokuapp.com/";
        case "scholars-quad":
        case "huntington-gardens":
            return "https://scholars-quad.herokuapp.com/";
        case "scholars-rock":
        case "scholars-rooftop":
            return "https://scholars-rooftop.herokuapp.com/";
        case "sh-garages":
        case "summer-house" :
            return "https://summer-house.herokuapp.com/";
        default :
            return "https://renaissancerentals.herokuapp.com/";
    }
}

export const getAsset = (imageUrl: string) => {
    if (isGoogleDriveImage(imageUrl)) {
        return "/api/asset/download/" + extractIdFrom(imageUrl);
    }
    return imageUrl;
};