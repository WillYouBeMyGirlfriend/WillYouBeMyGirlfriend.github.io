// ── Foliage SVG ──
// Varied leaf shapes, ~35-unit native space

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
          <ellipse cx={0} cy={-3} rx={9} ry={20} fill={color} opacity={0.82} />
          <line x1={0} y1={-22} x2={0} y2={15} stroke={colorAlt} strokeWidth={0.7} opacity={0.45} />
          <ellipse cx={8} cy={-2} rx={5} ry={12} fill={colorAlt} opacity={0.6} transform="rotate(25, 8, -2)" />
        </>
      )}
      {variant === 1 && (
        <>
          <path
            d="M 0,-22 Q 8,-5 2.5,13 L 0,16 Q -8,-5 0,-22 Z"
            fill={color} opacity={0.82}
          />
          <ellipse cx={5} cy={3} rx={4} ry={9} fill={colorAlt} opacity={0.5} transform="rotate(-15, 5, 3)" />
        </>
      )}
      {variant === 2 && (
        <>
          <ellipse cx={-3} cy={-2} rx={6} ry={15} fill={color} opacity={0.8} />
          <ellipse cx={4} cy={-3} rx={5.5} ry={13} fill={colorAlt} opacity={0.65} transform="rotate(20, 4, -3)" />
          <ellipse cx={-2} cy={-4} rx={4.5} ry={10} fill={color} opacity={0.6} transform="rotate(-15, -2, -4)" />
        </>
      )}
      {variant === 3 && (
        <>
          {[-0.8, -0.3, 0.3, 0.8].map((off, j) => (
            <ellipse
              key={j}
              cx={3 + off * 3}
              cy={-10 + j * 5}
              rx={3}
              ry={8}
              fill={j % 2 === 0 ? color : colorAlt}
              opacity={0.65}
              transform={`rotate(${18 - j * 12}, ${3 + off * 3}, ${-10 + j * 5})`}
            />
          ))}
        </>
      )}
    </g>
  );
}