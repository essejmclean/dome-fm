import { defineConfig } from "cva";
import { extendTailwindMerge } from "tailwind-merge";

export type { VariantProps } from "cva";

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "title-lg",
            "title-md",
            "title-sm",
            "body-lg",
            "body-md",
            "body-sm",
            "label-lg",
            "label-md",
            "label-sm",
          ],
        },
      ],
    },
  },
});

export const { cva, cx, compose } = defineConfig({
  hooks: {
    onComplete: (className) => customTwMerge(className),
  },
});
