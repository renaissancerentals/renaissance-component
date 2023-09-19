import React from "react";
import {FeatureSection, FeatureSectionProps} from "./FeatureSection";
import {Meta, Story} from "@storybook/react";

export default {
    title: "Section/Feature",
    component: FeatureSection
} as Meta;

const Template: Story<FeatureSectionProps> = () => {
    return (
        <FeatureSection>
            <h3>Featured Section</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eleifend quam justo, eget efficitur nisl
                tincidunt in. Nam interdum velit eget justo consectetur, sed rhoncus nunc pellentesque. Maecenas
                faucibus ligula vel neque sodales, at tempus tellus pretium. Donec non nisl a ante tincidunt egestas.
                Duis vel ligula venenatis, mattis lorem malesuada, imperdiet quam. Phasellus nec tincidunt metus, non
                scelerisque elit. Nam luctus risus ligula, ac congue sem euismod eget. Sed in sem sit amet felis
                bibendum bibendum. Vivamus vestibulum erat id suscipit tincidunt. Proin purus neque, tempus nec mi a,
                mollis lacinia nibh. Ut id imperdiet diam, quis aliquam lorem.</p>
        </FeatureSection>
    );
};

export const Default = Template.bind({});
