import {Sublet} from "../data/Sublet";
import {SubletMessage} from "../data/SubletMessage";
import AdminApi from "../../service/AdminApi";
import {Asset} from "../../asset/data/Asset";

export const getSublets = (): Promise<Sublet[]> => {
    return AdminApi.get("sublets/search/findByActiveTrueAndApprovedTrue?projection=withId").then(response => response.data._embedded.sublets);
}

export const getSublet = (assetKey: string): Promise<Sublet> => {
    return AdminApi.get("sublets/search/byAssetKey?projection=withId&assetKey=" + assetKey).then(response => response.data);
}

export const postSublet = (sublet: Sublet, captchaResponse: string): Promise<Sublet> => {
    return AdminApi.post("admin/sublets?captchaResponse=" + captchaResponse, {...sublet}).then(response => response.data);
}
export const deleteSublet = (assetKey: string): Promise<any> => {
    return AdminApi.delete("admin/sublets/" + assetKey);
}
export const postAsset = (assetKey: string, file: File, name: string, isCoverImage: boolean, onUploadProgress?: (e: any) => void): Promise<Asset> => {
    let formData: FormData = new FormData();
    formData.append("name", name);
    formData.append("file", file);
    formData.append("isCoverImage", isCoverImage + "");
    console.log("Uploading image: ", name, " for asset: ", assetKey);
    return AdminApi.post("admin/sublets/assets/" + assetKey, formData, {
        headers: {"Content-Type": "multipart/form-data"},
        onUploadProgress
    }).then(response => response.data);
};

export const sendMessage = (subletId: string, subletMessage: SubletMessage, captchaResponse: string) => {
    console.log("sending...");
    return AdminApi.post("admin/sublets/" + subletId + "/message?captchaResponse=" + captchaResponse, {...subletMessage});
}