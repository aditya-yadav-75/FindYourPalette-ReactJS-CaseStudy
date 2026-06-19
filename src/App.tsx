import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Menu } from "lucide-react";

import ColorWheel from "./components/ColorWheel";
import ColorInfo from "./components/ColorInfo";
import PalettePreview from "./components/PalettePreview";
import ImageUploader from "./components/ImageUploader";
import SavedPalettes from "./components/SavedPalettes";

import {
  generatePalette,
  type HarmonyMode,
} from "./utils/harmony";

const harmonyModes: HarmonyMode[] = [
  "Complementary",
  "Analogous",
  "Triadic",
  "Tetradic",
  "Split Complementary",
  "Monochromatic",
];

export default function App() {
  const [color, setColor] =
    useState<string>("#8B0000");

  const [mode, setMode] =
    useState<HarmonyMode>(
      "Complementary"
    );

  const [imagePalette, setImagePalette] =
    useState<string[]>([]);

  const [savedPalettes, setSavedPalettes] =
    useState<string[][]>([]);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [theme, setTheme] =
    useState<"dark" | "light">(() => {
      const stored =
        localStorage.getItem("theme");

      return stored === "light"
        ? "light"
        : "dark";
    });

  const menuRef =
    useRef<HTMLDivElement>(null);

  const isDark =
    theme === "dark";

  const colors = {
    background: isDark
      ? "#050505"
      : "#f5f5f7",

    surface: isDark
      ? "#101010"
      : "#ffffff",

    section: isDark
      ? "#0d0d0d"
      : "#ffffff",

    border: isDark
      ? "#242424"
      : "#d9d9d9",

    text: isDark
      ? "#ffffff"
      : "#111111",

    secondary: isDark
      ? "#9a9a9a"
      : "#555555",

    accent: "#8B0000",

    footer: isDark
      ? "#666666"
      : "#777777",
  };

  useEffect(() => {
    const storedColor =
      localStorage.getItem(
        "baseColor"
      );

    const storedMode =
      localStorage.getItem(
        "harmonyMode"
      ) as HarmonyMode | null;

    const storedPalettes =
      localStorage.getItem(
        "savedPalettes"
      );

    if (storedColor) {
      setColor(storedColor);
    }

    if (
      storedMode &&
      harmonyModes.includes(
        storedMode
      )
    ) {
      setMode(storedMode);
    }

    if (storedPalettes) {
      try {
        setSavedPalettes(
          JSON.parse(
            storedPalettes
          )
        );
      } catch {
        setSavedPalettes([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "baseColor",
      color
    );

    localStorage.setItem(
      "harmonyMode",
      mode
    );
  }, [color, mode]);

  useEffect(() => {
    localStorage.setItem(
      "theme",
      theme
    );
  }, [theme]);

  const generatedPalette =
    useMemo(() => {
      return generatePalette(
        color,
        mode
      );
    }, [color, mode]);

  const activePalette =
    imagePalette.length > 0
      ? imagePalette
      : generatedPalette;
        const savePalette = () => {
    setSavedPalettes((previous) => {
      const alreadyExists = previous.some(
        (palette) =>
          JSON.stringify(palette) ===
          JSON.stringify(activePalette)
      );

      if (alreadyExists) {
        return previous;
      }

      const updated = [
        activePalette,
        ...previous,
      ].slice(0, 20);

      localStorage.setItem(
        "savedPalettes",
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  const loadSavedPalette = (
    palette: string[]
  ) => {
    setImagePalette(palette);

    if (palette.length > 0) {
      setColor(palette[0]);
    }

    setMenuOpen(false);
  };

  const clearSavedPalettes = () => {
    setSavedPalettes([]);
    localStorage.removeItem(
      "savedPalettes"
    );
  };

  const downloadPaletteJson = () => {
    const blob = new Blob(
      [
        JSON.stringify(
          activePalette,
          null,
          2
        ),
      ],
      {
        type: "application/json",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      "findyourpalette.json";

    link.click();

    URL.revokeObjectURL(url);

    setMenuOpen(false);
  };

  const copyCssVariables =
    async () => {
      const css =
        activePalette
          .map(
            (
              value,
              index
            ) =>
              `--color-${
                index + 1
              }: ${value};`
          )
          .join("\n");

      await navigator.clipboard.writeText(
        css
      );
    };

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "dark"
        ? "light"
        : "dark"
    );
  };

  const importToFigma =
    () => {
      alert(
        "Import to Figma coming soon."
      );
      setMenuOpen(false);
    };

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener(
        "mousedown",
        handleClickOutside
      );
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [menuOpen]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          colors.background,
        color: colors.text,
        padding: "24px",
        boxSizing:
          "border-box",
        transition:
          "all 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1500,
          margin: "0 auto",
        }}
      >
        <header
          style={{
            position:
              "relative",
            display: "flex",
            justifyContent:
              "center",
            alignItems:
              "center",
            borderBottom: `1px solid ${colors.border}`,
            paddingBottom: 18,
            marginBottom: 24,
            transition:
              "all 0.3s ease",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 48,
              fontWeight: 900,
              letterSpacing:
                "-0.04em",
              textAlign:
                "center",
            }}
          >
            FindYourPalette
          </h1>

          <div
            style={{
              position:
                "absolute",
              right: 0,
              top: 0,
            }}
          >
            <button
              onClick={() =>
                setMenuOpen(
                  !menuOpen
                )
              }
              style={{
                width: 46,
                height: 46,
                borderRadius: 12,
                border: `1px solid ${colors.border}`,
                background:
                  colors.surface,
                display: "flex",
                alignItems:
                  "center",
                justifyContent:
                  "center",
                cursor:
                  "pointer",
                transition:
                  "all 0.3s ease",
              }}
            >
              <Menu
                size={20}
                color={
                  colors.text
                }
              />
            </button>

            {menuOpen && (
              <div
                ref={menuRef}
                style={{
                  position:
                    "absolute",
                  top: 56,
                  right: 0,
                  width: 340,
                  background:
                    colors.surface,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 16,
                  overflow:
                    "hidden",
                  zIndex: 1000,
                  boxShadow:
                    "0 20px 40px rgba(0,0,0,0.35)",
                  transition:
                    "all 0.3s ease",
                }}
              >
                <button
                  onClick={
                    downloadPaletteJson
                  }
                  style={{
                    width: "100%",
                    padding:
                      "14px 18px",
                    background:
                      "transparent",
                    color:
                      colors.text,
                    border:
                      "none",
                    borderBottom: `1px solid ${colors.border}`,
                    textAlign:
                      "left",
                    cursor:
                      "pointer",
                  }}
                >
                  Download JSON
                </button>

                <button
                  onClick={
                    toggleTheme
                  }
                  style={{
                    width: "100%",
                    padding:
                      "14px 18px",
                    background:
                      "transparent",
                    color:
                      colors.text,
                    border:
                      "none",
                    borderBottom: `1px solid ${colors.border}`,
                    textAlign:
                      "left",
                    cursor:
                      "pointer",
                  }}
                >
                  {theme ===
                  "dark"
                    ? "Switch to Light Theme"
                    : "Switch to Dark Theme"}
                </button>

                <button
                  onClick={
                    importToFigma
                  }
                  style={{
                    width: "100%",
                    padding:
                      "14px 18px",
                    background:
                      "transparent",
                    color:
                      colors.text,
                    border:
                      "none",
                    borderBottom: `1px solid ${colors.border}`,
                    textAlign:
                      "left",
                    cursor:
                      "pointer",
                  }}
                >
                  Import to Figma
                </button>

                <div
                  style={{
                    padding: 18,
                  }}
                >
                  <h3
                    style={{
                      marginTop: 0,
                      marginBottom: 12,
                      color:
                        colors.text,
                    }}
                  >
                    Saved
                    Palettes
                  </h3>

                  <SavedPalettes
  palettes={savedPalettes}
  onSelect={loadSavedPalette}
  isDark={isDark}
/>
                </div>
              </div>
            )}
          </div>
        </header>
                <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(0, 1fr) 340px",
            gap: 24,
            alignItems: "start",
            transition: "all 0.3s ease",
          }}
        >
          <section
            style={{
              background: colors.section,
              border: `1px solid ${colors.border}`,
              borderRadius: 22,
              padding: 28,
              boxShadow:
                "0 12px 32px rgba(0,0,0,0.18)",
              transition: "all 0.3s ease",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 32,
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  flex: 1,
                  minWidth: 360,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <ColorWheel
                  selectedColor={color}
                  onColorChange={setColor}
                />
              </div>

              <div
                style={{
                  width: 300,
                  background: colors.surface,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 18,
                  padding: 20,
                  transition:
                    "all 0.3s ease",
                }}
              >
                <h2
                  style={{
                    marginTop: 0,
                    marginBottom: 16,
                    fontSize: 20,
                    color: colors.text,
                  }}
                >
                  Selected Color
                </h2>

                <label
                  style={{
                    display: "block",
                    marginBottom: 10,
                    color: colors.secondary,
                    fontSize: 14,
                  }}
                >
                  Base Color
                </label>

                <input
                  type="color"
                  value={color}
                  onChange={(e) =>
                    setColor(
                      e.target.value
                    )
                  }
                  style={{
                    width: "100%",
                    height: 52,
                    border: "none",
                    background:
                      "transparent",
                    cursor: "pointer",
                    marginBottom: 20,
                  }}
                />

                <ColorInfo
                  color={color}
                />
              </div>
            </div>

            <div
              style={{
                marginTop: 28,
              }}
            >
              <PalettePreview
                colors={activePalette}
              />
            </div>
          </section>

          <aside
            style={{
              background:
                colors.surface,
              border: `1px solid ${colors.border}`,
              borderRadius: 22,
              padding: 22,
              display: "flex",
              flexDirection: "column",
              gap: 18,
              boxShadow:
                "0 12px 32px rgba(0,0,0,0.18)",
              transition:
                "all 0.3s ease",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: 20,
                fontWeight: 700,
                color: colors.text,
              }}
            >
              Controls
            </h2>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: 15,
                  color:
                    colors.secondary,
                  fontSize: 14,
                }}
              >
                Harmony Type
              </label>

              <select
                value={mode}
                onChange={(e) =>
                  setMode(
                    e.target
                      .value as HarmonyMode
                  )
                }
                style={{
                  width: "100%",
                  height: 42,
                  padding:
                    "0 16px",
                  fontSize: 15,
                  borderRadius: 12,
                  border: `1px solid ${colors.border}`,
                  background:
                    colors.background,
                  color:
                    colors.text,
                  cursor: "pointer",
                  outline: "none",
                  transition:
                    "all 0.3s ease",
                }}
              >
                {harmonyModes.map(
                  (item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  )
                )}
              </select>
            </div>

            <ImageUploader
  onPaletteExtracted={setImagePalette}
  isDark={isDark}
/>

            {imagePalette.length >
              0 && (
              <button
                onClick={() =>
                  setImagePalette([])
                }
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 10,
                  border: `1px solid ${colors.border}`,
                  background:
                    colors.background,
                  color:
                    colors.text,
                  cursor: "pointer",
                  transition:
                    "all 0.3s ease",
                }}
              >
                Clear Uploaded
                Palette
              </button>
            )}
                        <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
              }}
            >
              <button
                onClick={savePalette}
                style={{
                  flex: 1,
                  padding: "13px",
                  border: "none",
                  borderRadius: 10,
                  background: colors.accent,
                  color: "#ffffff",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                Save Palette
              </button>

              <button
                onClick={clearSavedPalettes}
                title="Delete Saved Palettes"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  border: "none",
                  background: colors.accent,
                  color: "#ffffff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.3s ease",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6L18 20H6L5 6" />
                  <path d="M10 11V17" />
                  <path d="M14 11V17" />
                  <path d="M9 6V4H15V6" />
                </svg>
              </button>
            </div>

            <button
              onClick={copyCssVariables}
              style={{
                width: "100%",
                padding: "13px",
                border: "none",
                borderRadius: 10,
                background: colors.accent,
                color: "#ffffff",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              Copy CSS Variables
            </button>
          </aside>
        </div>

        <footer
          style={{
            marginTop: 24,
            paddingTop: 18,
            borderTop: `1px solid ${colors.border}`,
            textAlign: "center",
            color: colors.footer,
            fontSize: 12,
            transition: "all 0.3s ease",
          }}
        >
          © 2026 FindYourPalette • React + TypeScript + Vite
        </footer>
      </div>
    </div>
  );
}