import React, {useState} from "react";
import {Sublet} from "./data/Sublet";
import "./assets/SubletImage.scss";
import {ItemSlider, NavigateButton, Spinner} from "@contentmunch/muncher-ui";
import {assetUrlFrom, getAssetsFrom, getAssetUrl} from "../asset/service/AssetService";
import {Asset} from "../asset/data/Asset";
import {renaissance} from "../data/RenaissanceData";

export const SubletImage: React.FC<SubletImageProps> = ({sublet}) => {

    const [assets, setAssets] = useState<Asset[]>([]);
    const [isAssetLoading, setIsAssetLoading] = useState(false);
    const [isAssetLoaded, setIsAssetLoaded] = useState(false);
    const loadAssets = () => {
        setIsAssetLoading(true);
        if (sublet.photosFolderId) {
            getAssetsFrom(sublet.photosFolderId).then(data => {
                setAssets(data);
            }).catch(() => {
                console.log("invalid folderId");
            }).finally(() => {
                setIsAssetLoaded(true);
                setIsAssetLoading(false);
            });
        } else {
            setIsAssetLoaded(true);
            setIsAssetLoading(false);
        }

    };
    return (
        <div className="div-sublet-image">
            {
                isAssetLoaded && assets.length > 0 ?
                    <ItemSlider navButtonSize="medium" sliderItems={
                        assets.map(
                            (asset, index) => <img className="sublet--image"
                                                   src={assetUrlFrom(asset.id, renaissance.propertyId)}
                                                   alt={"sublet image " + index + 1}/>
                        )}/> :
                    <img className="sublet--image" src={getAssetUrl(sublet.coverImage, renaissance.propertyId)}
                         alt="sublet cover"/>
            }
            {isAssetLoaded ? "" : <NavigateButton direction="right" onClick={loadAssets} size="medium"/>}

            {isAssetLoading ? <Spinner size="medium"/> : <></>}

        </div>
    );
};

export interface SubletImageProps {
    sublet: Sublet;
}
