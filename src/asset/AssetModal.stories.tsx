import React, {useState} from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {AssetModal} from "./AssetModal";
import {Button} from "@contentmunch/muncher-ui";

export default {
    title: "Modal/AssetModal",
    component: AssetModal
} as ComponentMeta<typeof AssetModal>;

export const Default: ComponentStory<typeof AssetModal> = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <AssetModal assetUrl="https://drive.google.com/uc?id=1DDxBOSmahKAbFAD0Y31Fu8i-4VPpyMEX&export=download"
                        propertyId="verona-park"
                        assetTitle="Asset image" showModal={showModal} setShowModal={setShowModal}/>
            <Button onClick={() => {
                setShowModal(true)
            }}>Show Image</Button>
        </>
    );
}