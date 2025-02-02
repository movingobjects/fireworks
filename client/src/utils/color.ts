/**
 * LLM'ed this util to allow color generating in hue/saturation/value ranges
 *
 * @
 */
export function hsvToHex(hue: number = 0, sat: number = 1, val: number = 1): string {
  const c = val * sat;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = val - c;

  let r = 0;
  let g = 0;
  let b = 0;

  /* eslint-disable @stylistic/array-element-newline */
  if (hue >= 0 && hue < 60) [r, g, b] = [c, x, 0];
  else if (hue >= 60 && hue < 120) [r, g, b] = [x, c, 0];
  else if (hue >= 120 && hue < 180) [r, g, b] = [0, c, x];
  else if (hue >= 180 && hue < 240) [r, g, b] = [0, x, c];
  else if (hue >= 240 && hue < 300) [r, g, b] = [x, 0, c];
  else if (hue >= 300 && hue < 360) [r, g, b] = [c, 0, x];
  /* eslint-enable @stylistic/array-element-newline */

  // Convert to 0-255 range and apply offset (m)
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  // Convert to hex string
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}