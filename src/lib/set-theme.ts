import { hexFromArgb, rgbaFromArgb } from "@material/material-color-utilities";
import type {
  RecursiveKeyValuePair,
  ResolvableTo,
} from "tailwindcss/types/config";

import {
  createTheme,
  CustomColor,
  Palette,
  Palettes,
  Scheme,
  Schemes,
  Theme,
  ToneOption,
  Variant,
} from "./create-theme";

export function getTailwindColorsFromTheme(
  theme: ThemeProperties
): ResolvableTo<RecursiveKeyValuePair<string, string>> {
  const colors: ResolvableTo<RecursiveKeyValuePair<string, string>> = {};

  for (const [key, color] of Object.entries(theme)) {
    colors[key] = `rgba(var(${color.cssVar}), <alpha-value>)`;
  }

  return colors;
}

export function getTailwindVariables(
  theme: ThemeProperties
): ResolvableTo<RecursiveKeyValuePair<string, string>> {
  const colors: ResolvableTo<RecursiveKeyValuePair<string, string>> = {};

  for (const [key, color] of Object.entries(theme)) {
    colors[key] = color.rgb;
  }

  return colors;
}

export function setTheme({
  seed,
  contrast,
  variant,
  blend,
  content,
  customColors,
  dark,
}: {
  seed: string;
  contrast: number;
  variant?: Variant;
  blend?: boolean;
  content?: boolean;
  customColors?: { [key: string]: string };
  dark?: boolean;
}): ThemeProperties {
  const theme = createTheme({
    seed,
    contrast,
    variant,
    blend,
    content,
    customColors,
  });

  const isDark = dark ?? false;
  const scheme = isDark ? theme.schemes.dark : theme.schemes.light;
  const palettes = theme.palettes;

  const schemeProperties = transformScheme(scheme);
  const palettesProperties = transformPalettes(palettes);

  const result = {
    ...schemeProperties,
    ...palettesProperties,
    // ...theme,
  };

  return result;
}

function transformScheme(scheme: Scheme) {
  const properties: ThemeProperties = {};

  for (const [key, value] of Object.entries(scheme)) {
    const token = key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    const rgba = rgbaFromArgb(value);
    const hex = hexFromArgb(value);

    const propertyKey = `${token}`;
    const propertyCssVar = `--colors-${token}`;
    const propertyRgb = [rgba.r, rgba.g, rgba.b].join(",");
    const propertyHex = hex;

    properties[propertyKey] = {
      cssVar: propertyCssVar,
      rgb: propertyRgb,
      hex: propertyHex,
    };
  }

  return properties;
}

function transformPalettes(palettes: Palettes) {
  const properties: ThemeProperties = {};

  for (const [key, palette] of Object.entries(palettes) as [
    keyof Palettes,
    Palette
  ][]) {
    const paletteKey = key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

    for (const [toneKey, toneValue] of Object.entries(palette)) {
      const rgba = rgbaFromArgb(toneValue);
      const hex = hexFromArgb(toneValue);

      const propertyKey = `${paletteKey}-${toneKey}`;
      const propertyCssVar = `--colors-${paletteKey}-${toneKey}`;
      const propertyRgb = [rgba.r, rgba.g, rgba.b].join(",");
      const propertyHex = hex;

      properties[propertyKey] = {
        cssVar: propertyCssVar,
        rgb: propertyRgb,
        hex: propertyHex,
      };
    }
  }

  return properties;
}

type ThemeProperty = {
  cssVar: string;
  rgb: string;
  hex: string;
};

type ThemeProperties = Record<string, ThemeProperty>;
