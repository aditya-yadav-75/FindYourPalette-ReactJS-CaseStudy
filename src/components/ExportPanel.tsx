type ExportPanelProps = {
  palette: string[];
};

export default function ExportPanel({
  palette,
}: ExportPanelProps) {
  const copyCss = async () => {
    const css = `:root {\n${palette
      .map(
        (color, index) =>
          `  --color-${index + 1}: ${color};`
      )
      .join("\n")}\n}`;

    await navigator.clipboard.writeText(css);
    alert("CSS variables copied.");
  };

  const downloadJson = () => {
    const blob = new Blob(
      [
        JSON.stringify(
          {
            palette,
          },
          null,
          2
        ),
      ],
      {
        type: "application/json",
      }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "palette.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        marginTop: 5,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <button
        type="button"
        onClick={copyCss}
        style={{
          padding: 14,
          background: "#8B0000",
          color: "#fff",
          border: "none",
          borderRadius: 10,
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        Copy CSS Variables
      </button>

      <button
        type="button"
        onClick={downloadJson}
        style={{
          padding: 14,
          background: "#202020",
          color: "#fff",
          border: "1px solid #333",
          borderRadius: 10,
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        Download JSON
      </button>
    </div>
  );
}