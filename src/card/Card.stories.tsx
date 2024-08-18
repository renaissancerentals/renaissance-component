import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Card } from "./Card";

export default {
  title: "Card/Card",
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Default = Template.bind({});

Default.args = {
  title: "Details",
  children: (
    <>
      <h4>Lorem Ipsum Dolor</h4>
      <p>
        With three distinct floor plans and options available for the View, you
        have the flexibility to choose which one best suits you. First, here is
        what comes standard in all of them: wood floors, berber carpet, maple
        cabinetry, a full kitchen, washer/dryer, and free internet. Then you
        have the choice of either an end-unit with extra windows, a bigger
        bedroom, or a deck. All top-floor apartments have dramatic vaulted
        ceilings. With this apartment, you call the shots!
      </p>
    </>
  ),
};

export const Featured = Template.bind({});
Featured.args = {
  featured: true,
  children: (
    <>
      <blockquote>
        "This is a testimonial about how much I loved living in this unit. It
        was clean, functional, and we loved the location."
      </blockquote>
      <p>
        <i>-Anne, former tenant</i>
      </p>
    </>
  ),
};
