import {Sublet} from "../data/Sublet";
import {SubletMessage} from "../data/SubletMessage";
import AdminApi from "../../service/AdminApi";
import {Asset} from "../../asset/data/Asset";
import RenaissanceApi from "../../service/RenaissanceApi";

export const getSublets = async (): Promise<Sublet[]> => {
    const response = await RenaissanceApi.get("sublets");
    return response.data;
}

export const getSublet = async (assetKey: string): Promise<Sublet> => {
    const response = await RenaissanceApi.get("sublets/" + assetKey);
    return response.data;
}

export const postSublet = async (sublet: Sublet): Promise<Sublet> => {
    const response = await RenaissanceApi.post("sublets", {...sublet});
    return response.data;
}
export const deleteSublet = (assetKey: string): Promise<any> => {
    return RenaissanceApi.delete("sublets/" + assetKey);
}
export const postAsset = async (assetKey: string, file: File, name: string, isCoverImage: boolean, onUploadProgress?: (e: any) => void): Promise<Asset> => {
    let formData: FormData = new FormData();
    formData.append("name", name);
    formData.append("file", file);
    formData.append("isCoverImage", isCoverImage + "");
    console.log("Uploading image: ", name, " for asset: ", assetKey);
    const response = await RenaissanceApi.post("sublets/" + assetKey + "/assets", formData, {
        headers: {"Content-Type": "multipart/form-data"},
        onUploadProgress
    });
    return response.data;
};

export const sendMessage = (assetKey: string, subletMessage: SubletMessage) => {
    console.log("sending...");
    return RenaissanceApi.post("sublets/" + assetKey + "/messages", {...subletMessage});
}
