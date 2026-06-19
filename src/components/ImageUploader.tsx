import type { ChangeEvent } from "react";

type ImageUploaderProps = {
  onPaletteExtracted: (colors: string[]) => void;
  isDark?: boolean;
};

function rgbToHex(
  r: number,
  g: number,
  b: number
) {
  return (
    "#" +
    [r, g, b]
      .map((v) =>
        v.toString(16).padStart(2, "0")
      )
      .join("")
      .toUpperCase()
  );
}

export default function ImageUploader({
  onPaletteExtracted,
  isDark = true,
}: ImageUploaderProps) {
  const handleUpload = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const img = new Image();

    img.onload = () => {
      const canvas =
        document.createElement("canvas");

      const ctx =
        canvas.getContext("2d");

      if (!ctx) return;

      canvas.width = 100;
      canvas.height = 100;

      ctx.drawImage(
        img,
        0,
        0,
        100,
        100
      );

      const { data } =
        ctx.getImageData(
          0,
          0,
          100,
          100
        );

      const buckets =
        new Map<string, number>();

      for (
        let i = 0;
        i < data.length;
        i += 16
      ) {
        const r =
          Math.round(data[i] / 32) * 32;
        const g =
          Math.round(data[i + 1] / 32) *
          32;
        const b =
          Math.round(data[i + 2] / 32) *
          32;

        const hex = rgbToHex(
          r,
          g,
          b
        );

        buckets.set(
          hex,
          (buckets.get(hex) ?? 0) + 1
        );
      }

      const colors = [
        ...buckets.entries(),
      ]
        .sort(
          (a, b) => b[1] - a[1]
        )
        .slice(0, 5)
        .map(([hex]) => hex);

      onPaletteExtracted(colors);
    };

    img.src =
      URL.createObjectURL(file);
  };

  return (
    <div
      style={{
        marginTop: 5,
      }}
    >
      <label
        style={{
          display: "block",
          marginBottom: 10,
          color: isDark
            ? "#bdbdbd"
            : "#555555",
          fontSize: 15,
          fontWeight: 600,
        }}
      >
        Extract Palette From Image
      </label>

      <label
        htmlFor="palette-upload"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: 46,
          background: isDark
            ? "#1A1A1A"
            : "#ffffff",
          border: `1px solid ${
            isDark
              ? "#303030"
              : "#d9d9d9"
          }`,
          borderRadius: 10,
          color: isDark
            ? "#ffffff"
            : "#111111",
          fontWeight: 600,
          cursor: "pointer",
          transition:
            "all 0.25s ease",
          boxSizing: "border-box",
        }}
      >
        Upload Image
      </label>

      <input
        id="palette-upload"
        type="file"
        accept="image/*"
        onChange={handleUpload}
        style={{
          display: "none",
        }}
      />
    </div>
  );
}