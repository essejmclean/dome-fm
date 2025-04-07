/**
 * Seriously inspired by `create-theme.ts` in `rodydavis/vscode-dynamic-theme`.
 * @see https://github.com/rodydavis/vscode-dynamic-theme/blob/9398acad4b8fde05420f4c34962b876d6f32ef74/src/web/utils/create-theme.ts#L131
 *
 * This code uses the `@material/material-color-utilities` package to generate
 * a theme based on a seed color. We are not necessarily using Google's Material
 * Design color guidelines, but these utilities do a good job of generating
 * dynamic color palettes for user-generated themes.
 */

import { argbFromHex, Hct } from "@material/material-color-utilities";

import { createCustomColors, type CustomColor } from "./custom";
import {
  createPalette,
  type Palettes,
  paletteToTonalGroup,
  TonalGroup,
} from "./palettes";
import { convertDynamicScheme, createSchemes, type Scheme } from "./schemes";
import { Variant } from "./variant";

/**
 * A `Theme` is a collection of colors and schemes that can be used to style
 * components. It is generated from a seed color, contrast value, and variant.
 *
 * The seed color typically influences all colors in the schemes and palettes.
 *
 * Colors are stored as integers in the ARGB format.
 */
export interface Theme {
  /** The seed color as an integer in ARGB format */
  // seed: number;
  /** The color schemes for light and dark themes */
  // schemes: { light: Scheme; dark: Scheme };
  /** The color palettes for the theme */
  // palettes: { light: Record<string, number>; dark: Record<string, number> };
  /** Custom colors for the theme (if any exist) */
  // custom: { [key: string]: CustomColor };
  light: Scheme & Record<string, number>;
  dark: Scheme & Record<string, number>;
}

/**
 * Creates a new theme based on the provided parameters.
 * @param seed - The seed color in hexadecimal format.
 * @param variant - The variant of the theme.
 * @param contrast - The contrast value for the theme. Defaults to 0.
 * @param blend - Whether to blend the colors. Defaults to false.
 * @param content - Whether to include content. Defaults to false.
 * @param customColors - Custom colors for the theme.
 * @returns A new `Theme` object.
 */
export function createTheme({
  seed,
  variant,
  contrast = 0,
  blend = false,
  content = false,
  customColors = {},
}: {
  seed: string;
  variant?: Variant;
  contrast?: number;
  blend?: boolean;
  content?: boolean;
  customColors?: { [key: string]: string };
}): Theme {
  const source: Hct = Hct.fromInt(argbFromHex(seed));

  const { lightScheme, darkScheme } = createSchemes(source, contrast, variant);

  const lightPalette = createPalette(lightScheme);
  const darkPalette = createPalette(darkScheme);

  const custom = createCustomColors(customColors, blend, content, source);

  const result: Theme = {
    // seed: source.toInt(),
    // schemes: {
    //   light: convertDynamicScheme(lightScheme),
    //   dark: convertDynamicScheme(darkScheme),
    // },
    // palettes: {
    //   light: lightPalette,
    //   dark: darkPalette,
    // },
    // custom,
    light: {
      ...convertDynamicScheme(lightScheme),
      ...lightPalette,
    },
    dark: {
      ...convertDynamicScheme(darkScheme),
      ...darkPalette,
    },
  };

  return result;
}
