import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { GridGallerySkeleton } from "./GridGallerySkeleton";

export default {
  title: "Section/GalleryHeroMain Skeleton",
  component: GridGallerySkeleton,
} as ComponentMeta<typeof GridGallerySkeleton>;

export const Default: ComponentStory<typeof GridGallerySkeleton> = (args) => (
  <GridGallerySkeleton />
);
