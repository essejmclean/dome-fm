import React from "react";

import { cva, type VariantProps } from "@/lib/cva.config";

export const textVariants = cva({
  base: "block",
  variants: {
    size: {
      "title-lg": "text-title-lg",
      "title-md": "text-title-md",
      "title-sm": "text-title-sm",
      "body-lg": "text-body-lg",
      "body-md": "text-body-md",
      "body-sm": "text-body-sm",
      "label-lg": "text-label-lg",
      "label-md": "text-label-md",
      "label-sm": "text-label-sm",
    },
    color: {
      default: "text-on-surface",
      variant: "text-on-surface-variant",
      inverse: "text-inverse-on-surface",
      current: "text-current",
      inherit: "text-inherit",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    size: "body-md",
    color: "default",
  },
});

export type TextVariants = VariantProps<typeof textVariants>;

const sizeElementMap: Record<NonNullable<TextVariants["size"]>, string> = {
  "title-lg": "h2",
  "title-md": "h2",
  "title-sm": "h2",
  "body-lg": "p",
  "body-md": "p",
  "body-sm": "p",
  "label-lg": "span",
  "label-md": "span",
  "label-sm": "span",
};

type Element = keyof JSX.IntrinsicElements;

export interface TextProps<T extends Element>
  extends Omit<React.HTMLAttributes<HTMLElement>, "color">,
    TextVariants {
  as?: T;
}

export const Text = React.forwardRef(
  <T extends Element>(
    { className, as, size = "body-md", color, ...props }: TextProps<T>,
    ref: React.ForwardedRef<HTMLElement>
  ) => {
    const Component = as ?? (size ? sizeElementMap[size] : undefined) ?? "div";

    const componentProps = {
      ref,
      className: textVariants({ size, color, className }),
      ...props,
    };

    return React.createElement(Component, componentProps);
  }
);
Text.displayName = "Text";
