/**
 * Seriously inspired by `create-theme.ts` in `rodydavis/vscode-dynamic-theme`.
 * @see https://github.com/rodydavis/vscode-dynamic-theme/blob/9398acad4b8fde05420f4c34962b876d6f32ef74/src/web/utils/create-theme.ts#L131
 *
 * This code uses the `@material/material-color-utilities` package to generate
 * a theme based on a seed color. We are not necessarily using Google's Material
 * Design color guidelines, but these utilities do a good job of generating
 * dynamic color palettes for user-generated themes.
 */

import {
  argbFromHex,
  Blend,
  CorePalette,
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
  TonalPalette,
} from "@material/material-color-utilities";

export function createTheme({
  seed,
  variant,
  contrast,
  customColors,
  blend,
  content,
}: {
  seed: string;
  contrast: number;
  variant?: Variant;
  blend?: boolean;
  content?: boolean;
  customColors?: { [key: string]: string };
}): Theme {
  const source: Hct = Hct.fromInt(argbFromHex(seed));

  let lightScheme: DynamicScheme;
  let darkScheme: DynamicScheme;

  switch (variant ?? Variant.TONAL_SPOT) {
    case Variant.MONOCHROME:
      lightScheme = new SchemeMonochrome(source, false, contrast);
      darkScheme = new SchemeMonochrome(source, true, contrast);
      break;
    case Variant.NEUTRAL:
      lightScheme = new SchemeNeutral(source, false, contrast);
      darkScheme = new SchemeNeutral(source, true, contrast);
      break;
    case Variant.VIBRANT:
      lightScheme = new SchemeVibrant(source, false, contrast);
      darkScheme = new SchemeVibrant(source, true, contrast);
      break;
    case Variant.EXPRESSIVE:
      lightScheme = new SchemeExpressive(source, false, contrast);
      darkScheme = new SchemeExpressive(source, true, contrast);
      break;
    case Variant.FIDELITY:
      lightScheme = new SchemeFidelity(source, false, contrast);
      darkScheme = new SchemeFidelity(source, true, contrast);
      break;
    case Variant.CONTENT:
      lightScheme = new SchemeContent(source, false, contrast);
      darkScheme = new SchemeContent(source, true, contrast);
      break;
    case Variant.TONAL_SPOT:
      lightScheme = new SchemeTonalSpot(source, false, contrast);
      darkScheme = new SchemeTonalSpot(source, true, contrast);
      break;
    default:
      throw new Error(`Unknown variant: ${variant}`);
  }

  const custom: { [key: string]: CustomColor } = {};

  if (customColors) {
    for (const [key, value] of Object.entries(customColors)) {
      const seed = argbFromHex(value);
      let target = seed;

      if (blend === true) {
        target = Blend.harmonize(seed, source.toInt());
      }

      const palettes = content
        ? CorePalette.contentOf(target)
        : CorePalette.of(target);
      const palette = palettes.a1;

      custom[key] = {
        seed,
        target,
        light: {
          color: palette.tone(40),
          onColor: palette.tone(100),
          colorContainer: palette.tone(90),
          onColorContainer: palette.tone(10),
        },
        dark: {
          color: palette.tone(80),
          onColor: palette.tone(20),
          colorContainer: palette.tone(30),
          onColorContainer: palette.tone(90),
        },
      };
    }
  }

  const result: Theme = {
    seed: source.toInt(),
    palettes: {
      primary: tonesToTonalGroup(lightScheme.primaryPalette),
      secondary: tonesToTonalGroup(lightScheme.secondaryPalette),
      tertiary: tonesToTonalGroup(lightScheme.tertiaryPalette),
      neutral: tonesToTonalGroup(lightScheme.neutralPalette),
      neutralVariant: tonesToTonalGroup(lightScheme.neutralVariantPalette),
      error: tonesToTonalGroup(lightScheme.errorPalette),
    },
    schemes: {
      light: convertDynamicScheme(lightScheme),
      dark: convertDynamicScheme(darkScheme),
    },
    custom,
  };

  return result;
}

const toneOptions = [
  100, 99, 98, 96, 95, 94, 92, 90, 87, 80, 70, 60, 50, 40, 35, 30, 25, 24, 22,
  20, 17, 12, 10, 6, 5, 4, 0,
] as const;
export type ToneOption = (typeof toneOptions)[number];

function tonesToTonalGroup(tones: TonalPalette): Record<ToneOption, number> {
  const result = new Map<ToneOption, number>();
  for (const tone of toneOptions) {
    result.set(tone, tones.tone(tone));
  }
  return Object.fromEntries(result) as Record<ToneOption, number>;
}

function convertDynamicScheme(scheme: DynamicScheme): Scheme {
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

export interface Theme {
  seed: number;
  palettes: Palettes;
  schemes: Schemes;
  custom: { [key: string]: CustomColor };
}

export interface Palettes {
  primary: Palette;
  secondary: Palette;
  tertiary: Palette;
  neutral: Palette;
  neutralVariant: Palette;
  error: Palette;
}

export type Palette = Record<ToneOption, number>;

export interface Schemes {
  light: Scheme;
  dark: Scheme;
}

export interface CustomColor {
  seed: number;
  target: number;
  light: ColorFamily;
  dark: ColorFamily;
}

interface ColorFamily {
  color: number;
  onColor: number;
  colorContainer: number;
  onColorContainer: number;
}

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

export enum Variant {
  MONOCHROME = 0,
  NEUTRAL = 1,
  TONAL_SPOT = 2,
  VIBRANT = 3,
  EXPRESSIVE = 4,
  FIDELITY = 5,
  CONTENT = 6,
}
