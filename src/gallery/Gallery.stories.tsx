import React, { useEffect, useState } from "react";
import { Meta, Story } from "@storybook/react";
import { Gallery, GalleryProps } from "./Gallery";
import { getAssetsFrom } from "../asset/service/AssetService";
import { Asset } from "../asset/data/Asset";

export default {
  title: "Section/Gallery",
  component: Gallery,
} as Meta;
const Template: Story<GalleryProps> = (args) => {
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<Asset[]>([]);

  useEffect(() => {
    getAssetsFrom("0B6C97UNWKNaIMXNZWFBBNmV2enM").then((galleryImages) => {
      setImages(galleryImages.filter((value, index) => index < 9));

      setIsLoading(false);
    });
  }, []);

  return (
    <Gallery
      {...args}
      images={images}
      isLoading={isLoading}
      propertyId="verona-park"
    />
  );
};

export const GridGallery = Template.bind({});
GridGallery.args = {
  type: "grid",
  propertyId: "verona-park",
};

export const SimpleGallery = Template.bind({});
SimpleGallery.args = {
  type: "simple",
  propertyId: "verona-park",
};
