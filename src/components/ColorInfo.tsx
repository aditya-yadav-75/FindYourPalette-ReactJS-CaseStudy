type ColorInfoProps = {
  color: string;
  isDark?: boolean;
};

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");

  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16),
  };
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
          ((g - b) / d +
            (g < b ? 6 : 0)) *
          60;
        break;

      case g:
        h =
          ((b - r) / d + 2) * 60;
        break;

      case b:
        h =
          ((r - g) / d + 4) * 60;
        break;
    }
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export default function ColorInfo({
  color,
  isDark = true,
}: ColorInfoProps) {
  const rgb = hexToRgb(color);
  const hsl = rgbToHsl(
    rgb.r,
    rgb.g,
    rgb.b
  );

  return (
    <div
      style={{
        marginTop: 24,
        padding: 18,
        background: isDark
          ? "#181818"
          : "#ffffff",
        border: `1px solid ${
          isDark
            ? "#2a2a2a"
            : "#d9d9d9"
        }`,
        borderRadius: 12,
        color: isDark
          ? "#ffffff"
          : "#111111",
      }}
    >
      <h3>Color Details</h3>

      <strong>HEX</strong>
      <div>{color.toUpperCase()}</div>

      <br />

      <strong>RGB</strong>
      <div>
        {rgb.r}, {rgb.g}, {rgb.b}
      </div>

      <br />

      <strong>HSL</strong>
      <div>
        {hsl.h}°, {hsl.s}%, {hsl.l}%
      </div>
    </div>
  );
}