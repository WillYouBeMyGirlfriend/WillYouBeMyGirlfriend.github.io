// ── Foliage SVG ──
// Varied leaf shapes in ~25-unit native space

interface FoliageProps {
  color: string;
  colorAlt: string;
  variant: number;
}

export default function Foliage({ color, colorAlt, variant }: FoliageProps) {
  return (
    <g>
      {variant === 0 && (
        <>
          <ellipse cx={0} cy={-2} rx={7} ry={16} fill={color} opacity={0.82} />
          <line x1={0} y1={-17} x2={0} y2={12} stroke={colorAlt} strokeWidth={0.6} opacity={0.45} />
          <ellipse cx={6} cy={-1} rx={4} ry={9} fill={colorAlt} opacity={0.65} transform="rotate(25, 6, -1)" />
        </>
      )}
      {variant === 1 && (
        <>
          <path
            d="M 0,-18 Q 6,-4 2,10 L 0,13 Q -6,-4 0,-18 Z"
            fill={color} opacity={0.82}
          />
          <ellipse cx={4} cy={2} rx={3} ry={7} fill={colorAlt} opacity={0.55} transform="rotate(-15, 4, 2)" />
        </>
      )}
      {variant === 2 && (
        <>
          <ellipse cx={-2} cy={-1} rx={5} ry={12} fill={color} opacity={0.8} />
          <ellipse cx={3} cy={-2} rx={4.5} ry={10} fill={colorAlt} opacity={0.7} transform="rotate(20, 3, -2)" />
          <ellipse cx={-1.5} cy={-3} rx={3.5} ry={8} fill={color} opacity={0.65} transform="rotate(-15, -1.5, -3)" />
        </>
      )}
      {variant === 3 && (
        <>
          {[-0.6, -0.2, 0.2, 0.6].map((off, j) => (
            <ellipse
              key={j}
              cx={2 + off * 2}
              cy={-8 + j * 4}
              rx={2.5}
              ry={6}
              fill={j % 2 === 0 ? color : colorAlt}
              opacity={0.7}
              transform={`rotate(${15 - j * 10}, ${2 + off * 2}, ${-8 + j * 4})`}
            />
          ))}
        </>
      )}
    </g>
  );
}