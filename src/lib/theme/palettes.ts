import type {
  DynamicScheme,
  TonalPalette,
} from "@material/material-color-utilities";

/**
 * Converts a `TonalPalette` to a `TonalGroup` of colors represented in ARGB
 * format. This is used to convert the colors from the Material Design color
 * system to the format used by the theme.
 *
 * @param {TonalPalette} palette - The palette to convert.
 * @returns {TonalGroup} - The converted tonal group.
 */
export function paletteToTonalGroup(
  name: string,
  palette: TonalPalette
): TonalGroup {
  const paletteTones = tones.map(
    (tone) =>
      [`${name}${tone}`, palette.tone(tone)] as [`${Palette}${Tone}`, number]
  );

  return typeSafeObjectFromEntries(paletteTones);
}

export function createPalette(scheme: DynamicScheme): Record<string, number> {
  const palettes = {
    primary: scheme.primaryPalette,
    secondary: scheme.secondaryPalette,
    tertiary: scheme.tertiaryPalette,
    neutral: scheme.neutralPalette,
    neutralVariant: scheme.neutralVariantPalette,
    error: scheme.errorPalette,
  };

  let flatObject: Record<string, number> = {};

  for (const [key, palette] of typeSafeObjectEntries(palettes)) {
    const tonalGroup = paletteToTonalGroup(key, palette);
    flatObject = { ...flatObject, ...tonalGroup };
  }

  return flatObject;
}

/**
 * The `tones` are used to define the "steps" in a color palette. They are
 * used to generate a color palette for each color in a theme. The higher the
 * tone, the lighter the color.
 */
const tones = [
  100, 99, 98, 96, 95, 94, 92, 90, 87, 80, 70, 60, 50, 40, 35, 30, 25, 24, 22,
  20, 17, 12, 10, 6, 5, 4, 0,
] as const;
type Tone = (typeof tones)[number];

const palettes = [
  "primary",
  "secondary",
  "tertiary",
  "neutral",
  "neutralVariant",
  "error",
] as const;
type Palette = (typeof palettes)[number];

/**
 * A `TonalGroup` represents a series of colors from a theme with each key in
 * the record corresponding to a `Tone` for consistent color distribution.
 *
 * Colors are stored as integers in the ARGB format.
 */
export type TonalGroup = Record<`${Palette}${Tone}`, number>;

/**
 * `Palettes` represents the main color groupings that make up the semantic
 * schemes used in a theme. It includes primary, secondary, tertiary, neutral,
 * neutral variant, and error palettes.
 */
export type Palettes = Record<Palette, TonalGroup>;

const typeSafeObjectFromEntries = <
  const T extends ReadonlyArray<readonly [PropertyKey, unknown]>
>(
  entries: T
): { [K in T[number] as K[0]]: K[1] } => {
  return Object.fromEntries(entries) as { [K in T[number] as K[0]]: K[1] };
};

const typeSafeObjectEntries = <T extends Record<PropertyKey, unknown>>(
  obj: T
): { [K in keyof T]: [K, T[K]] }[keyof T][] => {
  return Object.entries(obj) as { [K in keyof T]: [K, T[K]] }[keyof T][];
};
