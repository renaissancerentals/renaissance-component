import type {Meta, StoryObj} from '@storybook/react';
import "./assets/App.css";

const meta: Meta = {
    title: "Introduction",
    parameters: {
        layout: "padded",
    },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: () => (
        <div>
            <h1>Renaissance Rentals Storybook</h1>
            <p>
                Storybook helps you build UI components in isolation from your app&apos;s business logic, data, and
                context. That makes it easy to develop hard-to-reach states. Save these UI states as{" "}
                <strong>stories</strong> to revisit during development, testing, or QA. Storybook takes a{" "}
                <a href="https://componentdriven.org" target="_blank" rel="noreferrer"><strong>component-driven</strong></a>{" "}
                approach to building UI, starting with atomic components and ending with pages.
            </p>
            <p>Browse stories by navigating them in the sidebar.</p>
        </div>
    ),
};
