import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ApplicationModal } from "./ApplicationModal";
import { Button } from "@contentmunch/muncher-ui";

export default {
  title: "Section/Application Modal",
  component: ApplicationModal,
} as ComponentMeta<typeof ApplicationModal>;

const Template: ComponentStory<typeof ApplicationModal> = (args) => {
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  return (
    <>
      <ApplicationModal
        showApplicationModal={showApplicationModal}
        applicationModalCloseHandler={() => setShowApplicationModal(false)}
        contactClickHandler={() => console.log("contact clicked")}
      />
      <Button
        onClick={() => {
          setShowApplicationModal(true);
        }}
      >
        Application
      </Button>
    </>
  );
};
export const Default = Template.bind({});
