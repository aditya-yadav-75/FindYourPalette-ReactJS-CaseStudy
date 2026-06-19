type SavedPalettesProps = {
  palettes: string[][];
  onSelect: (palette: string[]) => void;
  isDark?: boolean;
};

export default function SavedPalettes({
  palettes,
  onSelect,
  isDark = true,
}: SavedPalettesProps) {
  if (palettes.length === 0) {
    return (
      <div
        style={{
          color: isDark ? "#888888" : "#666666",
          fontSize: 14,
          textAlign: "center",
          padding: "12px 0",
        }}
      >
        No saved palettes yet.
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gap: 12,
      }}
    >
      {palettes.map((palette, index) => (
        <div
          key={index}
          onClick={() => onSelect(palette)}
          style={{
            cursor: "pointer",
            background: isDark ? "#101010" : "#ffffff",
            border: `1px solid ${
              isDark ? "#2a2a2a" : "#d9d9d9"
            }`,
            borderRadius: 12,
            overflow: "hidden",
            transition: "all 0.25s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              height: 40,
            }}
          >
            {palette.map((color) => (
              <div
                key={color}
                style={{
                  flex: 1,
                  background: color,
                }}
              />
            ))}
          </div>

          <div
            style={{
              padding: 10,
              color: isDark ? "#9a9a9a" : "#555555",
              fontSize: 13,
              fontFamily: "monospace",
            }}
          >
            {palette.join(" • ")}
          </div>
        </div>
      ))}
    </div>
  );
}