import React, {useState} from "react";
import {Icon, Modal, Spinner} from "@contentmunch/muncher-ui";
import {getAssetUrl} from "./service/AssetService";
import "./assets/AssetModal.scss";

export const AssetModal: React.FC<AssetModalProps> = (
    {assetUrl, assetTitle, showModal, setShowModal, propertyId}) => {

    const [assetLoaded, setAssetLoaded] = useState(false);

    return (
        <>
            <div className="asset-modal">
                <Modal show={showModal} setShow={() => setShowModal(false)}>
                    <div className="asset">
                        <div className="close" onClick={() => setShowModal(false)}>
                            <Icon name="close" size="large"/>
                        </div>
                        {
                            assetLoaded ? "" : <Spinner/>
                        }
                        {showModal && assetUrl ?
                            <img src={getAssetUrl(assetUrl, propertyId)} alt={assetTitle}
                                 onLoad={() => setAssetLoaded(true)}/> : <></>
                        }
                    </div>
                </Modal>
            </div>

        </>
    );
};

export interface AssetModalProps {
    assetUrl: string | null;
    assetTitle: string;
    showModal: boolean;
    setShowModal: (showModal: boolean) => void;
    propertyId: string;
}