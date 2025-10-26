import React from "react";
import type {Meta, StoryFn} from '@storybook/react';
import {FaqsCard} from "./FaqsCard";

const meta = {
    title: "Card/Faqs Card",
    component: FaqsCard,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof FaqsCard>;
export default meta;
type Story = StoryFn<typeof meta>;
export const Default: Story = (args) => {

    return (
        <FaqsCard faqs={[
            {
                id: "67",
                lastModifiedBy: "asikpradhan",
                lastModifiedDate: "2025-10-12T22:53:02.603246",
                question: "Lorem Ipsum",
                answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In urna elit, pulvinar nec dignissim vitae, eleifend sit amet lectus. Vestibulum placerat auctor elementum. In posuere leo tellus, ut luctus augue dignissim sit amet. Sed tristique lectus urna, at accumsan ipsum malesuada in. Phasellus risus libero, bibendum non enim et, congue pellentesque magna. Praesent gravida velit sit amet lacus ultrices, sed hendrerit urna lobortis. Etiam congue lorem et neque rhoncus, laoreet scelerisque leo fringilla. Donec consequat pretium orci, vel tristique tellus. Donec fringilla purus in neque sodales, ut pharetra ligula blandit. Vivamus auctor sed mi sit amet ultrices. Aenean a diam leo. Aliquam fermentum orci id tellus porta finibus in ac diam. Phasellus in egestas nunc. Mauris sed mi volutpat, volutpat mauris eu, lobortis mi. Mauris congue magna et neque auctor blandit. Nulla eu massa at velit posuere facilisis at nec justo.",
                "sortOrder": 67.0,
            }, {
                id: "68",
                lastModifiedBy: "asikpradhan",
                lastModifiedDate: "2025-10-12T22:53:02.603246",
                question: "In et aliquet lorem.",
                answer: "Pellentesque maximus nec metus ac pretium. Sed facilisis tempor lacinia. Integer maximus maximus semper. Integer accumsan dolor at diam faucibus sollicitudin. Nunc faucibus leo justo, eget tristique orci auctor ut. Phasellus fermentum, magna sed fringilla aliquam, sem massa faucibus urna, id rutrum nunc ligula quis neque. Fusce at mauris feugiat, accumsan tortor a, mattis eros. Sed ac urna purus. Cras pulvinar mauris nulla, ut sollicitudin odio tristique sed. Vivamus pretium euismod massa quis vehicula. Praesent vel augue sed mi dictum volutpat sit amet ac est. Nam arcu erat, posuere id diam in, posuere ullamcorper felis. Donec cursus odio a lacus ultricies, ac bibendum massa cursus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris posuere rhoncus libero sit amet rhoncus.",
                sortOrder: 68.0,
            }
        ]} title="Frequently Asked Questions"/>
    );
}
