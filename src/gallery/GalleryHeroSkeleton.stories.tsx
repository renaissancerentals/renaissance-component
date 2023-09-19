import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {GalleryHeroSkeleton} from "./GalleryHeroSkeleton";

export default {
    title: "Section/GalleryHeroMain Skeleton",
    component: GalleryHeroSkeleton
} as ComponentMeta<typeof GalleryHeroSkeleton>;

export const Default: ComponentStory<typeof GalleryHeroSkeleton> = (args) =>
    <GalleryHeroSkeleton/>

