import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { FloorplanDetails, FloorplanStyle } from "../data/Floorplan";
import { Pet } from "../data/Unit";
import { FloorplanCardSlider } from "./FloorplanCardSlider";

export default {
  title: "Slider/Floorplan Card Slider",
  component: FloorplanCardSlider,
} as ComponentMeta<typeof FloorplanCardSlider>;

const Template: ComponentStory<typeof FloorplanCardSlider> = (args) => {
  const floorplans: FloorplanDetails[] = [
    {
      name: "Valencia",
      id: "valencia",
      active: true,
      units: [
        {
          id: "1100-13",
          active: true,
          squareFoot: 710,
          rent: 1229.0,
          deposit: 600.0,
          discountedRent: 0.0,
          garages: 0,
          allowedPet: Pet.CAT,
          moveInDate: "2023-07-27",
          furnished: false,
        },
        {
          id: "1100-7",
          active: true,
          squareFoot: 710,
          rent: 1199.0,
          deposit: 600.0,
          discountedRent: 0.0,
          garages: 0,
          allowedPet: Pet.CAT,
          moveInDate: "2023-08-01",
          furnished: true,
        },
      ],
      floorPlanFolderId: "12ZY9LcHiPL20Hiuj3CPlviNaekVXKY-C",
      photo:
        "https://drive.google.com/uc?id=1ut81-OY8YaYd4Hi4wft3hjHKY0M0EnsR&export=download",
      style: FloorplanStyle.APARTMENT,
      bathroom: 1.0,
      videoTourLink: "https://youtu.be/lFZeh4jr9UI",
      threeSixtyVideoTourLink: "https://youtu.be/Kbj7KG2O1fk",
      virtualTourLink: "https://www.paneek.net/#/tour/view/8392",
      featured: false,
      bedroom: 1,
      photosFolderId: "1uCaV8cGwH6o8Pd3CoHSbHYZWvTWY64_e",
      coverImage:
        "https://drive.google.com/uc?id=1w7shVoej3HEjVQdh7pWbq8GioITwVrF6&export=download",
      greenCertified: true,
      amenities: [],
    },
    {
      name: "Madrid",
      id: "madrid",
      active: true,
      units: [
        {
          id: "1100-11",
          active: true,
          squareFoot: 620,
          rent: 1174.0,
          deposit: 600.0,
          discountedRent: 0.0,
          garages: 0,
          allowedPet: Pet.CAT,
          moveInDate: "2023-07-28",
          furnished: false,
        },
        {
          id: "1100-3",
          active: true,
          squareFoot: 620,
          rent: 1145.0,
          deposit: 600.0,
          discountedRent: 0.0,
          garages: 0,
          allowedPet: Pet.CAT,
          moveInDate: "2023-08-02",
          furnished: false,
        },
        {
          id: "1100-4",
          active: true,
          squareFoot: 620,
          rent: 1145.0,
          deposit: 600.0,
          discountedRent: 0.0,
          garages: 0,
          allowedPet: Pet.CAT,
          moveInDate: "2022-07-22",
          furnished: false,
        },
        {
          id: "1100-9",
          active: true,
          squareFoot: 620,
          rent: 1174.0,
          deposit: 600.0,
          discountedRent: 0.0,
          garages: 0,
          allowedPet: Pet.CAT,
          moveInDate: "2023-08-01",
          furnished: false,
        },
        {
          id: "1100-5",
          active: true,
          squareFoot: 620,
          rent: 1145.0,
          deposit: 600.0,
          discountedRent: 0.0,
          garages: 0,
          allowedPet: Pet.CAT,
          moveInDate: "2023-08-05",
          furnished: false,
        },
        {
          id: "1100-6",
          active: true,
          squareFoot: 620,
          rent: 1145.0,
          deposit: 600.0,
          discountedRent: 0.0,
          garages: 0,
          allowedPet: Pet.CAT,
          moveInDate: "2023-06-13",
          furnished: false,
        },
        {
          id: "1100-10",
          active: true,
          squareFoot: 620,
          rent: 1174.0,
          deposit: 600.0,
          discountedRent: 0.0,
          garages: 0,
          allowedPet: Pet.CAT,
          moveInDate: "2023-07-22",
          furnished: false,
        },
        {
          id: "1100-12",
          active: true,
          squareFoot: 620,
          rent: 1174.0,
          deposit: 600.0,
          discountedRent: 0.0,
          garages: 0,
          allowedPet: Pet.CAT,
          moveInDate: "2023-07-15",
          furnished: false,
        },
      ],
      floorPlanFolderId: "1eMZPVo_u6GluIIc4gzLR4RVCs-sN-xoO",
      photo:
        "https://drive.google.com/uc?id=1bY_Kz1k4o1ccvKqfPZdO-n4DvL0FfpVw&export=download",
      style: FloorplanStyle.APARTMENT,
      bathroom: 1.0,
      videoTourLink: "https://youtu.be/MSSC9-1tYXc",
      threeSixtyVideoTourLink: "https://youtu.be/aqeJXubgJcU",
      virtualTourLink: "https://www.paneek.net/#/tour/view/8238",
      featured: true,
      bedroom: 1,
      photosFolderId: "1pheAjxscVrjsqsd84zJkx6jis5HFf11e",
      coverImage:
        "https://drive.google.com/uc?id=1A7SFA_TBc6RrhweDyphHFTPs9qsT6MUA&export=download",
      greenCertified: true,
      amenities: [],
    },
    {
      name: "Palermo",
      id: "palermo",
      active: true,
      units: [
        {
          id: "1100-1",
          active: true,
          squareFoot: 710,
          rent: 1155.0,
          deposit: 600.0,
          discountedRent: 0.0,
          garages: 0,
          allowedPet: Pet.LARGE_DOG_SMALL_DOG_CAT,
          moveInDate: "2023-07-19",
          furnished: false,
        },
      ],
      floorPlanFolderId: "1mkMGhP0SsFxLSAUIthUzWQCGg3tZ4P7o",
      photo:
        "https://drive.google.com/uc?id=1QTREl65XNYc6NuEysvnabQJyOSXPJxjT&export=download",
      style: FloorplanStyle.APARTMENT,
      bathroom: 1.0,
      videoTourLink: "https://youtu.be/LnDUy5qwwSo",
      threeSixtyVideoTourLink: "https://youtu.be/sljv7l2ynzY",
      virtualTourLink: "https://www.paneek.net/#/tour/view/12337",
      featured: false,
      bedroom: 1,
      photosFolderId: "1k4E33yYZ0GeG3AiP5by8av4PjCJ1c_S0",
      coverImage:
        "https://drive.google.com/uc?id=16Vp3oXvTbja6jdmAVvlrz-i8-P8h62WJ&export=download",
      greenCertified: true,
      amenities: [],
    },
    {
      name: "Barcelona",
      id: "barcelona",
      active: true,
      units: [
        {
          id: "asiktest",
          active: false,
          squareFoot: 1000,
          rent: 1000.0,
          deposit: 0.0,
          discountedRent: 750,
          garages: 0,
          allowedPet: Pet.LARGE_DOG_SMALL_DOG_CAT,
          moveInDate: '2024-09-22',
          furnished: false,
        },
        {
          id: "1100-8",
          active: true,
          squareFoot: 710,
          rent: 1195.0,
          deposit: 600.0,
          discountedRent: 0.0,
          garages: 0,
          allowedPet: Pet.CAT,
          moveInDate: "2023-08-04",
          furnished: false,
        },
        {
          id: "1100-2",
          active: true,
          squareFoot: 710,
          rent: 1165.0,
          deposit: 600.0,
          discountedRent: 0.0,
          garages: 0,
          allowedPet: Pet.CAT,
          moveInDate: "2023-08-09",
          furnished: false,
        },
      ],
      floorPlanFolderId: "1XKMK_9cLdVPOmhAd7CrNfvQBvtoYUUHH",
      photo:
        "https://drive.google.com/uc?id=1NSemFKUoFdNpX7ljSsLNjFVhKd3VEpEd&export=download",
      style: FloorplanStyle.APARTMENT,
      bathroom: 1.0,
      videoTourLink: null,
      threeSixtyVideoTourLink: null,
      virtualTourLink: "https://www.paneek.net/#/tour/view/8291",
      featured: true,
      bedroom: 1,
      photosFolderId: "18BL3coOPSHfMFJyJdZ4duB63SmPbgDDI",
      coverImage:
        "https://drive.google.com/uc?id=1pXtrJgJhTrdLeuwtP6lKSjULfF7TPJtf&export=download",
      greenCertified: true,
      amenities: [],
    },
  ];
  return (
    <FloorplanCardSlider
      {...args}
      floorplans={floorplans}
      propertyId="verona-park"
    />
  );
};

export const Default = Template.bind({});

export const Small = Template.bind({});

Small.args = {
  size: "small",
  propertyId: "verona-park",
};
