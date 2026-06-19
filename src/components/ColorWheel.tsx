import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  selectedColor: string;
  onColorChange: (color: string) => void;
};

const SIZE = 420;
const RADIUS = SIZE / 2;
const INNER_RADIUS = 70;
const OUTER_RADIUS = 190;

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  const toHex = (v: number) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hexToHue(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  if (max === min) return 0;

  let h = 0;

  switch (max) {
    case r:
      h = ((g - b) / (max - min)) % 6;
      break;
    case g:
      h = (b - r) / (max - min) + 2;
      break;
    case b:
      h = (r - g) / (max - min) + 4;
      break;
  }

  h *= 60;

  if (h < 0) h += 360;

  return h;
}

export default function ColorWheel({
  selectedColor,
  onColorChange,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dragging, setDragging] = useState(false);

  const hue = useMemo(
    () => hexToHue(selectedColor),
    [selectedColor]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, SIZE, SIZE);

    for (let angle = 0; angle < 360; angle++) {
      ctx.beginPath();
      ctx.strokeStyle = `hsl(${angle},100%,50%)`;
      ctx.lineWidth = OUTER_RADIUS - INNER_RADIUS;

      ctx.arc(
        RADIUS,
        RADIUS,
        (INNER_RADIUS + OUTER_RADIUS) / 2,
        ((angle - 1) * Math.PI) / 180,
        (angle * Math.PI) / 180
      );

      ctx.stroke();
    }
  }, []);

  const updateColor = (
    clientX: number,
    clientY: number
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();

    const x = clientX - rect.left - RADIUS;
    const y = clientY - rect.top - RADIUS;

    let angle =
      (Math.atan2(y, x) * 180) / Math.PI;

    if (angle < 0) angle += 360;

    onColorChange(hslToHex(angle, 100, 50));
  };

  const marker = {
    x:
      RADIUS +
      Math.cos((hue * Math.PI) / 180) *
        ((INNER_RADIUS + OUTER_RADIUS) / 2),
    y:
      RADIUS +
      Math.sin((hue * Math.PI) / 180) *
        ((INNER_RADIUS + OUTER_RADIUS) / 2),
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: SIZE,
          height: SIZE,
        }}
      >
       <canvas
  ref={canvasRef}
  width={SIZE}
  height={SIZE}
  onMouseDown={(e) => {
    setDragging(true);
    updateColor(e.clientX, e.clientY);
  }}
  onMouseMove={(e) => {
    if (dragging) {
      updateColor(e.clientX, e.clientY);
    }
  }}
  onMouseUp={() => setDragging(false)}
  onMouseLeave={() => setDragging(false)}
  style={{
    cursor: "crosshair",
    transition: "transform 0.2s ease",
  }}
/>
        <div
          style={{
            position: "absolute",
            left: marker.x - 9,
            top: marker.y - 9,
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "#ffffff",
            border: "3px solid #000000",
            pointerEvents: "none",
            boxShadow:
  "0 0 0 3px rgba(255,255,255,.2), 0 4px 12px rgba(0,0,0,.45)"
          }}
        />

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "#050505",
            border: "3px solid #222222",
          }}
        />
      </div>
    </div>
  );
}