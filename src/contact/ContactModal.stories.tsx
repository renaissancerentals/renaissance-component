import React, {useState} from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {ContactModal} from "./ContactModal";
import {Button} from "@contentmunch/muncher-ui";

export default {
    title: "Section/Contact Modal",
    component: ContactModal
} as ComponentMeta<typeof ContactModal>;

const Template: ComponentStory<typeof ContactModal> = (args => {
    const [showContactModal, setShowContactModal] = useState(false);
    return (
        <>
            <ContactModal showContactModal={showContactModal}
                          contactModalCloseHandler={() => setShowContactModal(false)} contactNumber={"8123456789"}/>
            <Button onClick={() => {
                setShowContactModal(true);
            }}>Contact</Button>
        </>
    );
});
export const Default = Template.bind({});
