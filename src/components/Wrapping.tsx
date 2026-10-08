// ── Wrapping Paper & Ribbon ──

interface WrappingProps {
  path: string;
  ribbon: {
    x: number;
    y: number;
    width: number;
    rotation: number;
    color: string;
  };
  palette: {
    cream: string;
    accentPink: string;
  };
}

export default function Wrapping({ path, ribbon, palette }: WrappingProps) {
  return (
    <g>
      {/* Wrapping paper body */}
      <path
        d={path}
        fill={palette.cream}
        stroke="#DDC8BB"
        strokeWidth={0.005}
      />
      {/* Paper fold lines for texture */}
      <path
        d={path}
        fill="url(#paperTexture)"
        opacity={0.3}
      />
      {/* Subtle shadow on left */}
      <path
        d={path}
        fill="black"
        opacity={0.04}
        transform="translate(0.005, 0.005)"
      />

      {/* Ribbon - horizontal band */}
      <rect
        x={ribbon.x - 0.15}
        y={ribbon.y - ribbon.width / 2}
        width={0.3}
        height={ribbon.width}
        rx={ribbon.width / 2}
        fill={ribbon.color}
        opacity={0.85}
        transform={`rotate(${ribbon.rotation}, ${ribbon.x}, ${ribbon.y})`}
      />
      {/* Ribbon knot / bow loops */}
      <ellipse
        cx={ribbon.x - ribbon.width * 0.6}
        cy={ribbon.y}
        rx={ribbon.width * 0.6}
        ry={ribbon.width * 0.35}
        fill={ribbon.color}
        opacity={0.8}
        transform={`rotate(${ribbon.rotation - 30}, ${ribbon.x}, ${ribbon.y})`}
      />
      <ellipse
        cx={ribbon.x + ribbon.width * 0.6}
        cy={ribbon.y}
        rx={ribbon.width * 0.6}
        ry={ribbon.width * 0.35}
        fill={ribbon.color}
        opacity={0.8}
        transform={`rotate(${ribbon.rotation + 30}, ${ribbon.x}, ${ribbon.y})`}
      />
      {/* Ribbon center knot */}
      <circle
        cx={ribbon.x}
        cy={ribbon.y}
        r={ribbon.width * 0.35}
        fill={ribbon.color}
        opacity={0.9}
      />
      {/* Ribbon tails */}
      <path
        d={`M ${ribbon.x - 0.01},${ribbon.y} Q ${ribbon.x - 0.06},${ribbon.y + 0.06} ${ribbon.x - 0.04},${ribbon.y + 0.1}`}
        fill="none"
        stroke={ribbon.color}
        strokeWidth={ribbon.width * 0.5}
        strokeLinecap="round"
        opacity={0.75}
      />
      <path
        d={`M ${ribbon.x + 0.01},${ribbon.y} Q ${ribbon.x + 0.05},${ribbon.y + 0.05} ${ribbon.x + 0.06},${ribbon.y + 0.1}`}
        fill="none"
        stroke={ribbon.color}
        strokeWidth={ribbon.width * 0.5}
        strokeLinecap="round"
        opacity={0.75}
      />
    </g>
  );
}