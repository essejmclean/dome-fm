/**
 * `Variant` is used to generate different color schemes. Each variant
 * influences how colors generated for a theme are distributed.
 *
 * - `MONOCHROME`:  A grayscale palette.
 *
 * - `NEUTRAL`:     A palette of colors that are near grayscale.
 *
 * - `TONAL_SPOT`:  Low to medium colorfulness and a tertiary hue related to the
 *                  source color.
 *
 * - `VIBRANT`:     Maxes out colorfulness at each opportunity.
 *
 * - `EXPRESSIVE`:  High colorfulness and intentionally detached from the source
 *                  color.
 *
 * - `FIDELITY`:    TODO -> Describe the fidelity variant...
 *
 * - `CONTENT`:     Primary colors are generated from the source color with a
 *                  constant appearance in light mode and dark mode while the
 *                  tertiary color is the complement to the source color.
 */
export enum Variant {
  MONOCHROME = 0,
  NEUTRAL = 1,
  TONAL_SPOT = 2,
  VIBRANT = 3,
  EXPRESSIVE = 4,
  FIDELITY = 5,
  CONTENT = 6,
}
