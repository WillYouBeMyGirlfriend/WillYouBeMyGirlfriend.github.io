// ── Tulip SVG ──
// ~30-unit native space

interface TulipProps {
  color: string;
  colorAlt: string;
  variant?: number;
}

export default function Tulip({ color, colorAlt }: TulipProps) {
  return (
    <g>
      <line x1={0} y1={24} x2={0} y2={-18} stroke="#8AAB85" strokeWidth={2.5} strokeLinecap="round" />
      <path d="M 0,-18 C -12,-8 -9,6 -1,10 L 0,0 Z" fill={color} />
      <path d="M 0,-18 C 12,-8 9,6 1,10 L 0,0 Z" fill={colorAlt} />
      <path d="M -1,10 C -0.5,3 0,-1 0,0 L 0,5 Z" fill={colorAlt} opacity={0.5} />
      <path d="M 1,10 C 0.5,3 0,-1 0,0 L 0,5 Z" fill={color} opacity={0.4} />
    </g>
  );
}