import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

import { Variant } from "./src/lib/create-theme";
import {
  getTailwindColorsFromTheme,
  getTailwindVariables,
  setTheme,
} from "./src/lib/set-theme";

const SEED = "#1f6feb";
const CONTRAST = 0;
const VARIANT = Variant.FIDELITY;

const lightTheme = setTheme({
  seed: SEED,
  contrast: CONTRAST,
  blend: true,
  variant: VARIANT,
  dark: false,
});

const darkTheme = setTheme({
  seed: SEED,
  contrast: CONTRAST,
  blend: true,
  variant: VARIANT,
  dark: true,
});

const themeColors = getTailwindColorsFromTheme(lightTheme);
console.log({ themeColors });

const lightVars = getTailwindVariables(lightTheme);
const darkVars = getTailwindVariables(darkTheme);

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/stories/**/*.stories.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    colors: {
      inherit: "inherit",
      transparent: "transparent",
      current: "currentColor",
      ...themeColors,
    },
    fontFamily: {
      sans: ["var(--font-sans)", ...fontFamily.sans],
      mono: [...fontFamily.mono],
    },
    fontSize: {
      "title-lg": [
        "var(--domeFM-title-lg)", // 22px
        {
          lineHeight: "1.27", // 28px
          fontWeight: 400,
        },
      ],
      "title-md": [
        "var(--domeFM-title-md)", // 16px
        {
          lineHeight: "1.5", // 24px
          fontWeight: 500,
        },
      ],
      "title-sm": [
        "var(--domeFM-title-sm)", // 14px
        {
          lineHeight: "1.43", // 20px
          fontWeight: 500,
        },
      ],
      "body-lg": [
        "var(--domeFM-body-lg)", // 16px
        {
          lineHeight: "1.5", // 24px
          fontWeight: 400,
        },
      ],
      "body-md": [
        "var(--domeFM-body-md)", // 14px
        {
          lineHeight: "1.43", // 20px
          fontWeight: 400,
        },
      ],
      "body-sm": [
        "var(--domeFM-body-sm)", // 12px
        {
          lineHeight: "1.33", // 16px
          fontWeight: 400,
        },
      ],
      "label-lg": [
        "var(--domeFM-label-lg)", // 14px
        {
          lineHeight: "1.43", // 20px
          fontWeight: 500,
        },
      ],
      "label-md": [
        "var(--domeFM-label-md)", // 12px
        {
          lineHeight: "1.33", // 16px
          fontWeight: 500,
        },
      ],
      "label-sm": [
        "var(--domeFM-label-sm)", // 11px
        {
          lineHeight: "1.45", // 16px
          fontWeight: 500,
        },
      ],
    },
    variables: {
      DEFAULT: {
        colors: {
          ...lightVars,
        },
      },
    },
    darkVariables: {
      DEFAULT: {
        colors: {
          ...darkVars,
        },
      },
    },
    extend: {
      spacing: {
        18: "4.5rem", // 72px
      },
      borderColor: ({ theme }) => ({
        DEFAULT: theme("colors.outline-variant", "currentColor"),
      }),
      opacity: {
        hovered: "0.075", // Used for `hover` states on elements like buttons
        pressed: "0.1", // Used for `drag` or `selected` states on elements like buttons
        focused: "0.15", // Used for `focus` states on elements like buttons
        selected: "0.15", // Used for `selected` states on elements like buttons
        disabled: "0.38", // Used for `disabled` states on elements like buttons
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require("@mertasan/tailwindcss-variables"),
    require("@tailwindcss/forms"),
  ],
};

export default config;
