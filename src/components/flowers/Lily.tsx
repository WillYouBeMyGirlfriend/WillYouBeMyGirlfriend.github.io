// ── Lily SVG ──
// Open flower, ~45-unit spread

interface LilyProps {
  color: string;
  colorAlt: string;
  variant?: number;
}

export default function Lily({ color, colorAlt }: LilyProps) {
  const petalCount = 6;
  return (
    <g>
      {Array.from({ length: petalCount }).map((_, i) => {
        const a = (i / petalCount) * Math.PI * 2 - Math.PI / 2;
        return (
          <ellipse
            key={i}
            cx={Math.cos(a) * 4}
            cy={Math.sin(a) * 4}
            rx={6} ry={18}
            transform={`rotate(${(a * 180) / Math.PI + 90}, ${Math.cos(a) * 4}, ${Math.sin(a) * 4})`}
            fill={i % 2 === 0 ? color : colorAlt}
            opacity={0.88}
          />
        );
      })}
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i / 6) * Math.PI * 2 + 0.15;
        return (
          <g key={`s-${i}`}>
            <line
              x1={Math.cos(a) * 1.5} y1={Math.sin(a) * 1.5}
              x2={Math.cos(a) * 12} y2={Math.sin(a) * 12}
              stroke="#D4A574" strokeWidth={0.8}
            />
            <circle cx={Math.cos(a) * 12} cy={Math.sin(a) * 12} r={2} fill="#E8B878" />
          </g>
        );
      })}
      <circle cx={0} cy={0} r={3} fill="#F5E6D0" opacity={0.5} />
    </g>
  );
}