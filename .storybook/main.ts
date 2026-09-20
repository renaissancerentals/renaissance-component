import type { StorybookConfig } from "@storybook/react-vite";
import { loadEnv } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions"
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  staticDirs: ["../public"],

  // The library reads process.env.REACT_APP_* at runtime so each consuming CRA app can
  // substitute its own values via webpack; that must stay untouched in the actual library
  // build (vite.config.ts has no `define` for it). Storybook's own Vite preview has no such
  // polyfill though, so shim it here for local dev only, sourced from this repo's .env.
  async viteFinal(viteConfig) {
    const env = loadEnv("development", process.cwd(), "");
    viteConfig.define = {
      ...viteConfig.define,
      "process.env.REACT_APP_DATA_BASE_URLS": JSON.stringify(env.REACT_APP_DATA_BASE_URLS ?? ""),
      "process.env.REACT_APP_ASSET_BASE_URLS": JSON.stringify(env.REACT_APP_ASSET_BASE_URLS ?? ""),
    };
    return viteConfig;
  },
};
export default config;
