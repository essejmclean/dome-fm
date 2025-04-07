import {
  DynamicScheme,
  Hct,
  MaterialDynamicColors,
  SchemeContent,
  SchemeExpressive,
  SchemeFidelity,
  SchemeMonochrome,
  SchemeNeutral,
  SchemeTonalSpot,
  SchemeVibrant,
} from "@material/material-color-utilities";

import { Variant } from "./variant";

/**
 * Creates light and dark color schemes based on the provided source, contrast,
 * and variant.
 *
 * @param source - The HCT color value used as the base for the color schemes.
 * @param contrast - The contrast value used to generate the color schemes.
 * @param variant - The variant of the color scheme to generate.
 * @returns An object containing the light and dark color schemes.
 * @throws Will throw an error if an unknown variant is provided.
 */
export function createSchemes(
  source: Hct,
  contrast: number,
  variant: Variant = Variant.TONAL_SPOT
): { lightScheme: DynamicScheme; darkScheme: DynamicScheme } {
  const schemeMapping = {
    [Variant.MONOCHROME]: SchemeMonochrome,
    [Variant.NEUTRAL]: SchemeNeutral,
    [Variant.VIBRANT]: SchemeVibrant,
    [Variant.EXPRESSIVE]: SchemeExpressive,
    [Variant.FIDELITY]: SchemeFidelity,
    [Variant.CONTENT]: SchemeContent,
    [Variant.TONAL_SPOT]: SchemeTonalSpot,
  };

  const SchemeClass = schemeMapping[variant];

  if (!SchemeClass) {
    throw new Error(`Unknown variant: ${variant}`);
  }

  const lightScheme = new SchemeClass(source, false, contrast);
  const darkScheme = new SchemeClass(source, true, contrast);

  return { lightScheme, darkScheme };
}

/**
 * Convert a `DynamicScheme` to a `Scheme` of colors represented in ARGB.
 * This is used to convert the colors from the Material Design color system to
 * the format used by the theme.
 *
 * @param {DynamicScheme} scheme - The scheme to convert.
 * @returns {Scheme} - The converted scheme.
 */
export function convertDynamicScheme(scheme: DynamicScheme): Scheme {
  return {
    primary: MaterialDynamicColors.primary.getArgb(scheme),
    onPrimary: MaterialDynamicColors.onPrimary.getArgb(scheme),
    primaryContainer: MaterialDynamicColors.primaryContainer.getArgb(scheme),
    onPrimaryContainer:
      MaterialDynamicColors.onPrimaryContainer.getArgb(scheme),
    primaryFixed: MaterialDynamicColors.primaryFixed.getArgb(scheme),
    onPrimaryFixed: MaterialDynamicColors.onPrimaryFixed.getArgb(scheme),
    primaryFixedDim: MaterialDynamicColors.primaryFixedDim.getArgb(scheme),
    onPrimaryFixedVariant:
      MaterialDynamicColors.onPrimaryFixedVariant.getArgb(scheme),
    secondary: MaterialDynamicColors.secondary.getArgb(scheme),
    onSecondary: MaterialDynamicColors.onSecondary.getArgb(scheme),
    secondaryContainer:
      MaterialDynamicColors.secondaryContainer.getArgb(scheme),
    onSecondaryContainer:
      MaterialDynamicColors.onSecondaryContainer.getArgb(scheme),
    secondaryFixed: MaterialDynamicColors.secondaryFixed.getArgb(scheme),
    onSecondaryFixed: MaterialDynamicColors.onSecondaryFixed.getArgb(scheme),
    secondaryFixedDim: MaterialDynamicColors.secondaryFixedDim.getArgb(scheme),
    onSecondaryFixedVariant:
      MaterialDynamicColors.onSecondaryFixedVariant.getArgb(scheme),
    tertiary: MaterialDynamicColors.tertiary.getArgb(scheme),
    onTertiary: MaterialDynamicColors.onTertiary.getArgb(scheme),
    tertiaryContainer: MaterialDynamicColors.tertiaryContainer.getArgb(scheme),
    onTertiaryContainer:
      MaterialDynamicColors.onTertiaryContainer.getArgb(scheme),
    tertiaryFixed: MaterialDynamicColors.tertiaryFixed.getArgb(scheme),
    onTertiaryFixed: MaterialDynamicColors.onTertiaryFixed.getArgb(scheme),
    tertiaryFixedDim: MaterialDynamicColors.tertiaryFixedDim.getArgb(scheme),
    onTertiaryFixedVariant:
      MaterialDynamicColors.onTertiaryFixedVariant.getArgb(scheme),
    error: MaterialDynamicColors.error.getArgb(scheme),
    onError: MaterialDynamicColors.onError.getArgb(scheme),
    errorContainer: MaterialDynamicColors.errorContainer.getArgb(scheme),
    onErrorContainer: MaterialDynamicColors.onErrorContainer.getArgb(scheme),
    outline: MaterialDynamicColors.outline.getArgb(scheme),
    outlineVariant: MaterialDynamicColors.outlineVariant.getArgb(scheme),
    background: MaterialDynamicColors.background.getArgb(scheme),
    onBackground: MaterialDynamicColors.onBackground.getArgb(scheme),
    surface: MaterialDynamicColors.surface.getArgb(scheme),
    onSurface: MaterialDynamicColors.onSurface.getArgb(scheme),
    surfaceVariant: MaterialDynamicColors.surfaceVariant.getArgb(scheme),
    onSurfaceVariant: MaterialDynamicColors.onSurfaceVariant.getArgb(scheme),
    inverseSurface: MaterialDynamicColors.inverseSurface.getArgb(scheme),
    inverseOnSurface: MaterialDynamicColors.inverseOnSurface.getArgb(scheme),
    inversePrimary: MaterialDynamicColors.inversePrimary.getArgb(scheme),
    shadow: MaterialDynamicColors.shadow.getArgb(scheme),
    scrim: MaterialDynamicColors.scrim.getArgb(scheme),
    surfaceContainerHighest:
      MaterialDynamicColors.surfaceContainerHighest.getArgb(scheme),
    surfaceContainerHigh:
      MaterialDynamicColors.surfaceContainerHigh.getArgb(scheme),
    surfaceContainer: MaterialDynamicColors.surfaceContainer.getArgb(scheme),
    surfaceContainerLow:
      MaterialDynamicColors.surfaceContainerLow.getArgb(scheme),
    surfaceContainerLowest:
      MaterialDynamicColors.surfaceContainerLowest.getArgb(scheme),
    surfaceBright: MaterialDynamicColors.surfaceBright.getArgb(scheme),
    surfaceDim: MaterialDynamicColors.surfaceDim.getArgb(scheme),
    surfaceTint: MaterialDynamicColors.surfaceTint.getArgb(scheme),
  };
}

/**
 * A `Scheme` is a collection of colors with semantic meaning. Their names are
 * based on the Material Design color system and are used to style components.
 *
 * Colors are stored as integers in the format `0xRRGGBB` where `RR` is the red
 * channel, `GG` is the green channel, and `BB` is the blue channel. This is
 * known as ARGB format.
 */
export interface Scheme {
  primary: number;
  onPrimary: number;
  primaryContainer: number;
  onPrimaryContainer: number;
  primaryFixed: number;
  onPrimaryFixed: number;
  primaryFixedDim: number;
  onPrimaryFixedVariant: number;
  secondary: number;
  onSecondary: number;
  secondaryContainer: number;
  onSecondaryContainer: number;
  secondaryFixed: number;
  onSecondaryFixed: number;
  secondaryFixedDim: number;
  onSecondaryFixedVariant: number;
  tertiary: number;
  onTertiary: number;
  tertiaryContainer: number;
  onTertiaryContainer: number;
  tertiaryFixed: number;
  onTertiaryFixed: number;
  tertiaryFixedDim: number;
  onTertiaryFixedVariant: number;
  error: number;
  onError: number;
  errorContainer: number;
  onErrorContainer: number;
  outline: number;
  outlineVariant: number;
  background: number;
  onBackground: number;
  surface: number;
  onSurface: number;
  surfaceVariant: number;
  onSurfaceVariant: number;
  inverseSurface: number;
  inverseOnSurface: number;
  inversePrimary: number;
  shadow: number;
  scrim: number;
  surfaceContainerHighest: number;
  surfaceContainerHigh: number;
  surfaceContainer: number;
  surfaceContainerLow: number;
  surfaceContainerLowest: number;
  surfaceBright: number;
  surfaceDim: number;
  surfaceTint: number;
}
