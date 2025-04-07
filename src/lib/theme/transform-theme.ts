import { hexFromArgb, rgbaFromArgb } from "@material/material-color-utilities";

import type { Theme } from "./create-theme";
import type { Palettes, TonalGroup } from "./palettes";
import type { Scheme } from "./schemes";

export function transformTheme(theme: Theme): {
  light: ThemeProperties;
  dark: ThemeProperties;
} {
  // const seed = transformSeed(theme.seed);
  // const lightScheme = transformScheme(theme.schemes.light);
  // const darkScheme = transformScheme(theme.schemes.dark);
  // const palettes = transformPalettes(theme.palettes);

  // const result: {
  //   [key: string]: ThemeProperties;
  //   light: ThemeProperties;
  //   dark: ThemeProperties;
  // } = {
  //   ...seed,
  //   ...palettes,
  //   light: lightScheme,
  //   dark: darkScheme,
  // };

  console.log({ theme });

  const result = deepTransform(theme);
  console.log({ result });

  return result;
}

function deepTransform(obj: Theme): any {
  if (typeof obj === "object" && obj !== null) {
    const newObj = Array.isArray(obj) ? [] : {};
    for (let k in obj) {
      newObj[k] = deepTransform(obj[k]);
    }
    return newObj;
  } else if (typeof obj === "number") {
    const rgba = rgbaFromArgb(obj);
    const hex = hexFromArgb(obj);
    return {
      argb: obj,
      rgba,
      hex,
    };
  }
  return obj;
}

// function transformSeed(seed: number): ThemeProperties {
//   const rgbaValue = rgbaFromArgb(seed);
//   const hexValue = hexFromArgb(seed);

//   const propertyKey = "seed";
//   const propertyCssVar = `--colors-seed`;
//   const propertyRgb = [rgbaValue.r, rgbaValue.g, rgbaValue.b].join(",");
//   const propertyHex = hexValue;

//   return {
//     [propertyKey]: {
//       cssVar: propertyCssVar,
//       rgb: propertyRgb,
//       hex: propertyHex,
//     },
//   };
// }

// function transformScheme(scheme: Scheme): ThemeProperties {
//   const properties: ThemeProperties = {};

//   for (const [key, value] of Object.entries(scheme)) {
//     const token = key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
//     const rgbaValue = rgbaFromArgb(value);
//     const hexValue = hexFromArgb(value);

//     const propertyKey = `${token}`;
//     const propertyCssVar = `--colors-${token}`;
//     const propertyRgb = [rgbaValue.r, rgbaValue.g, rgbaValue.b].join(",");
//     const propertyHex = hexValue;

//     properties[propertyKey] = {
//       cssVar: propertyCssVar,
//       rgb: propertyRgb,
//       hex: propertyHex,
//     };
//   }

//   return properties;
// }

// function transformPalettes(palettes: Palettes): ThemeProperties {
//   const properties: ThemeProperties = {};

//   for (const [key, palette] of Object.entries(palettes) as [
//     keyof Palettes,
//     TonalGroup
//   ][]) {
//     const paletteKey = key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

//     console.log(paletteKey);

//     for (const [toneKey, toneValue] of Object.entries(palette)) {
//       const rgbaValue = rgbaFromArgb(toneValue);
//       const hexValue = hexFromArgb(toneValue);

//       const propertyKey = `${paletteKey}-${toneKey}`;
//       const propertyCssVar = `--colors-${paletteKey}-${toneKey}`;
//       const propertyRgb = [rgbaValue.r, rgbaValue.g, rgbaValue.b].join(",");
//       const propertyHex = hexValue;

//       properties[propertyKey] = {
//         cssVar: propertyCssVar,
//         rgb: propertyRgb,
//         hex: propertyHex,
//       };
//     }
//   }

//   return properties;
// }

type ThemeProperty = {
  argb: number;
  rgba: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
  hex: string;
};

export type ThemeProperties = Record<string, ThemeProperty>;
