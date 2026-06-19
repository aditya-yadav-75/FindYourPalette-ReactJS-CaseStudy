export type HarmonyMode =
  | "Complementary"
  | "Analogous"
  | "Triadic"
  | "Tetradic"
  | "Split Complementary"
  | "Monochromatic";

function normalizeHue(h: number): number {
  return ((h % 360) + 360) % 360;
}

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");

  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (v: number) =>
    Math.round(Math.max(0, Math.min(255, v)))
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = 0;
  let s = 0;

  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;

    s =
      l > 0.5
        ? d / (2 - max - min)
        : d / (max + min);

    switch (max) {
      case r:
        h =
          (g - b) / d +
          (g < b ? 6 : 0);
        break;

      case g:
        h = (b - r) / d + 2;
        break;

      case b:
        h = (r - g) / d + 4;
        break;
    }

    h *= 60;
  }

  return { h, s, l };
}

function hslToRgb(h: number, s: number, l: number) {
  h = normalizeHue(h);
  h /= 360;

  if (s === 0) {
    const gray = l * 255;

    return {
      r: gray,
      g: gray,
      b: gray,
    };
  }

  const hue2rgb = (
    p: number,
    q: number,
    t: number
  ) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;

    if (t < 1 / 6)
      return p + (q - p) * 6 * t;

    if (t < 1 / 2) return q;

    if (t < 2 / 3)
      return (
        p +
        (q - p) *
          (2 / 3 - t) *
          6
      );

    return p;
  };

  const q =
    l < 0.5
      ? l * (1 + s)
      : l + s - l * s;

  const p = 2 * l - q;

  return {
    r: hue2rgb(p, q, h + 1 / 3) * 255,
    g: hue2rgb(p, q, h) * 255,
    b: hue2rgb(p, q, h - 1 / 3) * 255,
  };
}

function hslToHex(
  h: number,
  s: number,
  l: number
): string {
  const rgb = hslToRgb(h, s, l);

  return rgbToHex(
    rgb.r,
    rgb.g,
    rgb.b
  );
}

export function generatePalette(
  baseHex: string,
  mode: HarmonyMode
): string[] {
  const { r, g, b } = hexToRgb(baseHex);

  const {
    h,
    s,
    l,
  } = rgbToHsl(r, g, b);

  switch (mode) {
    case "Complementary":
      return [
        baseHex,
        hslToHex(h + 180, s, l),
      ];

    case "Analogous":
      return [
        hslToHex(h - 30, s, l),
        baseHex,
        hslToHex(h + 30, s, l),
      ];

    case "Triadic":
      return [
        baseHex,
        hslToHex(h + 120, s, l),
        hslToHex(h + 240, s, l),
      ];

    case "Tetradic":
      return [
        baseHex,
        hslToHex(h + 90, s, l),
        hslToHex(h + 180, s, l),
        hslToHex(h + 270, s, l),
      ];

    case "Split Complementary":
      return [
        baseHex,
        hslToHex(h + 150, s, l),
        hslToHex(h + 210, s, l),
      ];

    case "Monochromatic":
      return [
        hslToHex(h, s, 0.2),
        hslToHex(h, s, 0.35),
        hslToHex(h, s, 0.5),
        hslToHex(h, s, 0.65),
        hslToHex(h, s, 0.8),
      ];

    default:
      return [baseHex];
  }
}