// ── Lily SVG ──
// Open flower with long petals, ~45-unit native space

interface LilyProps {
  color: string;
  colorAlt: string;
  variant?: number;
}

export default function Lily({ color, colorAlt }: LilyProps) {
  const petalCount = 6;
  return (
    <g>
      {/* Petals */}
      {Array.from({ length: petalCount }).map((_, i) => {
        const a = (i / petalCount) * Math.PI * 2 - Math.PI / 2;
        return (
          <ellipse
            key={i}
            cx={Math.cos(a) * 3}
            cy={Math.sin(a) * 3}
            rx={4}
            ry={14}
            transform={`rotate(${(a * 180) / Math.PI + 90}, ${Math.cos(a) * 3}, ${Math.sin(a) * 3})`}
            fill={i % 2 === 0 ? color : colorAlt}
            opacity={0.88}
          />
        );
      })}
      {/* Stamens */}
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i / 6) * Math.PI * 2 + 0.15;
        return (
          <g key={`s-${i}`}>
            <line
              x1={Math.cos(a) * 1} y1={Math.sin(a) * 1}
              x2={Math.cos(a) * 9} y2={Math.sin(a) * 9}
              stroke="#D4A574" strokeWidth={0.7}
            />
            <circle cx={Math.cos(a) * 9} cy={Math.sin(a) * 9} r={1.8} fill="#E8B878" />
          </g>
        );
      })}
      <circle cx={0} cy={0} r={2.2} fill="#F5E6D0" opacity={0.5} />
    </g>
  );
}