// ── Peony SVG ──
// Full layered flower, ~40-unit spread

interface PeonyProps {
  color: string;
  colorAlt: string;
  variant?: number;
}

export default function Peony({ color, colorAlt }: PeonyProps) {
  const petals = 8;
  return (
    <g>
      {Array.from({ length: petals }).map((_, i) => {
        const a = (i / petals) * Math.PI * 2 - Math.PI / 2;
        const px = Math.cos(a) * 10;
        const py = Math.sin(a) * 10;
        return (
          <ellipse
            key={`o-${i}`}
            cx={px} cy={py}
            rx={11} ry={15}
            transform={`rotate(${(a * 180) / Math.PI + 90}, ${px}, ${py})`}
            fill={i % 2 === 0 ? color : colorAlt}
            opacity={0.85}
          />
        );
      })}
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <ellipse
            key={`m-${i}`}
            cx={Math.cos(a) * 4} cy={Math.sin(a) * 4}
            rx={7} ry={10}
            transform={`rotate(${(a * 180) / Math.PI + 90}, ${Math.cos(a) * 4}, ${Math.sin(a) * 4})`}
            fill={colorAlt} opacity={0.9}
          />
        );
      })}
      <circle cx={0} cy={0} r={6} fill={colorAlt} opacity={0.7} />
      <circle cx={-2} cy={-3} r={4} fill="white" opacity={0.18} />
    </g>
  );
}