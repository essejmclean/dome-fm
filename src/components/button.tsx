/**
 * Buttons communicate actions that users can take. They are typically placed
 * throughout your UI, in places like Dialogs, Modal windows, Forms, Cards and
 * Toolbars.
 *
 * Filled buttons are high-emphasis buttons. They have the most visual impact
 * after the FAB, and should be used for important, final actions that complete
 * a flow, like "Save", "Join now", or "Confirm".
 */

import { Slot } from "@radix-ui/react-slot";
import React from "react";

import { cva, type VariantProps } from "@/lib/cva.config";

export const buttonVariants = cva({
  base: [
    "relative inline-flex h-10 px-6 justify-center items-center gap-2 shrink-0 rounded-full text-label-lg whitespace-nowrap transition select-none",
    // We use the `before` layer to create our state effects.
    "before:absolute before:inset-0 before:rounded-full before:transition before:pointer-events-none",
    "after:absolute after:inset-0 after:rounded-full after:transition after:pointer-events-none",
    "focus:outline-none",
    "disabled:cursor-not-allowed",
  ],
  variants: {
    variant: {
      primary: [
        // Base
        "bg-primary-container text-on-primary-container",
        // Hovered
        "hover:before:bg-on-primary-container/hovered",
        // Pressed / Active
        "active:before:bg-on-primary-container/pressed",
        // Focused
        "focus-visible:before:bg-on-primary-container/focused",
        "after:focus-visible:ring-2 after:ring-inset after:focus-visible:ring-on-primary-container",
        // Selected
        "data-[selected]:before:bg-on-primary-container/selected",
        // Disabled
        "disabled:bg-primary-container/disabled disabled:text-on-primary-container/disabled",
      ],
      secondary: [
        // Base
        "bg-secondary-container text-on-secondary-container",
        // Hovered
        "hover:before:bg-on-secondary-container/hovered",
        // Pressed
        "active:before:bg-on-secondary-container/pressed",
        // Focused
        "focus-visible:before:bg-on-secondary-container/focused",
        "after:focus-visible:ring-2 after:ring-inset after:focus-visible:ring-on-secondary-container",
        // Selected
        "data-[selected]:before:bg-on-secondary-container/selected",
        // Disabled
        "disabled:bg-secondary-container/disabled disabled:text-on-secondary-container/disabled",
      ],
      tertiary: [
        // Base
        "bg-tertiary-container text-on-tertiary-container",
        // Hovered
        "hover:before:bg-on-tertiary-container/hovered",
        // Pressed
        "active:before:bg-on-tertiary-container/pressed",
        // Focused
        "focus-visible:before:bg-on-tertiary-container/focused",
        "after:focus-visible:ring-2 after:ring-inset after:focus-visible:ring-on-tertiary-container",
        // Selected
        "data-[selected]:before:bg-on-tertiary-container/selected",
        // Disabled
        "disabled:bg-tertiary-container/disabled disabled:text-on-tertiary-container/disabled",
      ],
      outline: [
        // Base
        "bg-transparent text-on-tertiary-container ring-[1.5px] ring-inset ring-on-tertiary-container",
        "before:ring-[1.5px] before:ring-inset before:ring-tertiary-container before:ring-opacity-0",
        // Hover
        "hover:ring-2 hover:before:ring-2 hover:before:ring-tertiary-container/50",
        // Pressed
        "active:ring-2 active:before:ring-2 active:before:ring-tertiary-container/75",
        // Focused
        "focus-visible:ring-[3px] focus-visible:before:ring-[3px]",
        // Selected
        "data-[selected]:ring-[2.5px] data-[selected]:before:ring-[2.5px] data-[selected]:ring-tertiary-container/90",
        // Disabled
        "disabled:ring-opacity-0 disabled:bg-tertiary-container/disabled disabled:text-on-tertiary-container/disabled",
      ],
    },
    fullWidth: {
      true: "w-full",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    variant: "primary",
  },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export type ButtonProps = {
  className?: string;
  /**
   * The content of the button.
   */
  children: React.ReactNode;
  /**
   * The variant to use.
   */
  variant?: ButtonVariants["variant"];
  /**
   * If `true`, the button will be disabled.
   */
  disabled?: boolean;
  /**
   * If `true`, the button will display it's selected state.
   */
  selected?: boolean;
  /**
   * If `true`, the button will take up the full width of its container.
   */
  fullWidth?: ButtonVariants["fullWidth"];
  /**
   * Use the `asChild` prop to compose functionality onto alternative element
   * types or your own React components.
   */
  asChild?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild, fullWidth, variant, selected, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        data-selected={selected ? "" : undefined}
        className={buttonVariants({
          variant,
          fullWidth: Boolean(fullWidth),
          className,
        })}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
