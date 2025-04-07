import { ThemeProperties } from "./transform-theme";

export function formatTheme({
  theme,
  format,
}: {
  theme: ThemeProperties;
  format: "css" | "tailwind";
}) {
  switch (format) {
    case "css":
      return cssVariableFormatter(theme);
    case "tailwind":
      return tailwindFormatter(theme);
  }
}

function cssVariableFormatter(theme: ThemeProperties) {
  const result = Object.entries(theme).map(([key, value]) => {
    const name = camelToKebab(key);

    const cssVar = `--colors-${name}`;
    const rgb = [value.rgba.r, value.rgba.g, value.rgba.b].join(",");
    const hex = value.hex;
    const property = [cssVar, `${rgb} \/* ${hex} */`];

    return property;
  });

  const object = Object.fromEntries(result);

  return object;
}

function tailwindFormatter(theme: ThemeProperties) {
  const result = Object.entries(theme).map(([key, value]) => {
    const name = camelToKebab(key);

    const cssVar = `--colors-${name}`;
    const rgba = `rgba(${value.rgba.r}, ${value.rgba.g}, ${value.rgba.b}, ${value.rgba.a})`;
    const hex = value.hex;
    const property = `  ${cssVar}: ${rgba}; /* ${hex} */`;
    return property;
  });

  return result;
}

function camelToKebab(camelCase: string) {
  return camelCase
    .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2")
    .toLowerCase();
}
