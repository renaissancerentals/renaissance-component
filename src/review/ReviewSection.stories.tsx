import React, { useEffect, useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ReviewSection } from "./ReviewSection";
import { PropertyDetails } from "../property/data/Property";
import { getProperty } from "../property/service/PropertyService";

export default {
  title: "Section/Review Section",
  component: ReviewSection,
} as ComponentMeta<typeof ReviewSection>;

const Template: ComponentStory<typeof ReviewSection> = (args) => {
  const [property, setProperty] = useState<PropertyDetails>(
    {} as PropertyDetails,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProperty("verona-park").then((data) => {
      setProperty(data);
      setIsLoading(false);
    });
  }, []);
  return isLoading ? <></> : <ReviewSection {...args} property={property} />;
};

export const Default = Template.bind({});
