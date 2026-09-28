// ── Tulip SVG ──
// Draws in 40-unit native space; scaled by parent transform

interface TulipProps {
  color: string;
  colorAlt: string;
}

export default function Tulip({ color, colorAlt }: TulipProps) {
  return (
    <g>
      {/* Stem */}
      <line x1={0} y1={18} x2={0} y2={-12} stroke="#7A9B75" strokeWidth={2.5} strokeLinecap="round" />
      {/* Left petal */}
      <path
        d="M 0,-14 C -9,-6 -7,5 -1,8 L 0,0 Z"
        fill={color}
      />
      {/* Right petal */}
      <path
        d="M 0,-14 C 9,-6 7,5 1,8 L 0,0 Z"
        fill={colorAlt}
      />
      {/* Front petal */}
      <path
        d="M -1,8 C -0.5,2 0,-1 0,0 L 0,4 Z"
        fill={colorAlt}
        opacity={0.6}
      />
      <path
        d="M 1,8 C 0.5,2 0,-1 0,0 L 0,4 Z"
        fill={color}
        opacity={0.5}
      />
    </g>
  );
}