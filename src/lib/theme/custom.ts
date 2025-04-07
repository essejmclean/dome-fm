import {
  argbFromHex,
  Blend,
  CorePalette,
  Hct,
} from "@material/material-color-utilities";

/**
 * Creates a custom color scheme based on the provided custom colors.
 *
 * @param customColors - An object where each key-value pair represents a custom color.
 * @param blend - A boolean indicating whether to blend the custom colors with the source color.
 * @param content - A boolean indicating whether to use the content palette or the default palette.
 * @param source - The source color used for blending.
 * @returns An object where each key-value pair represents a CustomColor object.
 */
export function createCustomColors(
  customColors: { [key: string]: string },
  blend: boolean,
  content: boolean,
  source: Hct
): { [key: string]: CustomColor } {
  const custom: { [key: string]: CustomColor } = {};

  if (Object.keys(customColors).length === 0) {
    return custom;
  }

  for (const [key, value] of Object.entries(customColors)) {
    const seed = argbFromHex(value);
    let target = blend ? Blend.harmonize(seed, source.toInt()) : seed;

    const palettes = content
      ? CorePalette.contentOf(target)
      : CorePalette.of(target);
    const { a1: palette } = palettes;

    const createColorFamily = (
      colorTone: number,
      onColorTone: number,
      colorContainerTone: number,
      onColorContainerTone: number
    ) => ({
      color: palette.tone(colorTone),
      onColor: palette.tone(onColorTone),
      colorContainer: palette.tone(colorContainerTone),
      onColorContainer: palette.tone(onColorContainerTone),
    });

    custom[key] = {
      seed,
      target,
      light: createColorFamily(40, 100, 90, 10),
      dark: createColorFamily(80, 20, 30, 90),
    };
  }

  return custom;
}

/**
 * CustomColor object that represents the color scheme for a custom theme.
 * It includes the seed color, target color, and color families for light and dark themes.
 */
export interface CustomColor {
  seed: number;
  target: number;
  light: ColorFamily;
  dark: ColorFamily;
}

/**
 * ColorFamily object that represents the color scheme for a specific theme (light or dark).
 * It includes the main color, onColor, colorContainer, and onColorContainer.
 * These colors are used to style components with some context awareness.
 */
interface ColorFamily {
  color: number;
  onColor: number;
  colorContainer: number;
  onColorContainer: number;
}
