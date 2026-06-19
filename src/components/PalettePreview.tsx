type Props = {
  colors: string[];
  isDark?: boolean;
};

export default function PalettePreview({
  colors,
  isDark = true,
}: Props) {
  return (
    <div>
      <h2
        style={{
          color: isDark
            ? "#fff"
            : "#111",
        }}
      >
        Generated Palette
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(120px,1fr))",
          gap: 12,
        }}
      >
        {colors.map((color) => (
          <div
            key={color}
            style={{
              background: isDark
                ? "#111"
                : "#fff",
              border: `1px solid ${
                isDark
                  ? "#262626"
                  : "#d9d9d9"
              }`,
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: 50,
                background: color,
              }}
            />

            <div
              style={{
                padding: 10,
                color: isDark
                  ? "#fff"
                  : "#111",
                fontFamily:
                  "monospace",
              }}
            >
              {color}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}