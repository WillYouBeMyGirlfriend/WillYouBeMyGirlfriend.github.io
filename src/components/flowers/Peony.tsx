// ── Peony SVG ──
// Full layered flower in ~35-unit native space

interface PeonyProps {
  color: string;
  colorAlt: string;
  variant?: number;
}

export default function Peony({ color, colorAlt }: PeonyProps) {
  const petals = 8;
  return (
    <g>
      {/* Outer ring */}
      {Array.from({ length: petals }).map((_, i) => {
        const a = (i / petals) * Math.PI * 2 - Math.PI / 2;
        const px = Math.cos(a) * 7;
        const py = Math.sin(a) * 7;
        return (
          <ellipse
            key={`o-${i}`}
            cx={px} cy={py}
            rx={8} ry={11}
            transform={`rotate(${(a * 180) / Math.PI + 90}, ${px}, ${py})`}
            fill={i % 2 === 0 ? color : colorAlt}
            opacity={0.85}
          />
        );
      })}
      {/* Middle ring */}
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <ellipse
            key={`m-${i}`}
            cx={Math.cos(a) * 3} cy={Math.sin(a) * 3}
            rx={5.5} ry={7.5}
            transform={`rotate(${(a * 180) / Math.PI + 90}, ${Math.cos(a) * 3}, ${Math.sin(a) * 3})`}
            fill={colorAlt}
            opacity={0.9}
          />
        );
      })}
      {/* Center */}
      <circle cx={0} cy={0} r={4.5} fill={colorAlt} opacity={0.7} />
      <circle cx={-1.5} cy={-2} r={3} fill="white" opacity={0.18} />
    </g>
  );
}