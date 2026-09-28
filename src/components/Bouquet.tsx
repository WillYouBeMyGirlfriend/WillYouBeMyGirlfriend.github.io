// ── Bouquet Component ──
// ViewBox 0-1; flowers positioned in that space

import { motion } from 'framer-motion';
import type { GeneratedBouquet } from '../types/bouquet';
import Tulip from './flowers/Tulip';
import Peony from './flowers/Peony';
import Lily from './flowers/Lily';
import Foliage from './flowers/Foliage';
import Wrapping from './Wrapping';

interface BouquetProps {
  bouquet: GeneratedBouquet;
  wiltLevel: number;
}

export default function Bouquet({ bouquet, wiltLevel }: BouquetProps) {
  const { flowers, stems, wrapping, ribbon, palette } = bouquet;

  return (
    <motion.svg
      viewBox="0 0 1 1"
      style={{
        width: '100%',
        height: '100%',
        filter: `saturate(${1 - wiltLevel * 0.5}) brightness(${1 - wiltLevel * 0.25})`,
        overflow: 'visible',
      }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <defs>
        <pattern id="paperTexture" patternUnits="userSpaceOnUse" width="0.02" height="0.02">
          <circle cx="0.01" cy="0.01" r="0.003" fill="#D4C4B8" opacity="0.15" />
        </pattern>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="0.5" cy="0.64" rx="0.25" ry="0.05" fill="rgba(0,0,0,0.06)" />

      {/* Wrapping */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        <Wrapping path={wrapping.path} ribbon={ribbon} palette={palette} />
      </motion.g>

      {/* Stems */}
      {stems.map((stem, i) => (
        <motion.path
          key={stem.id}
          d={`M ${stem.x1},${stem.y1} Q ${stem.cx},${stem.cy} ${stem.x2},${stem.y2}`}
          fill="none"
          stroke="#7A9B75"
          strokeWidth={0.003}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 + i * 0.03, ease: 'easeOut' }}
        />
      ))}

      {/* Flowers */}
      {flowers.map((flower, i) => {
        const delay = 0.55 + i * 0.04;
        const wiltRot =
          flower.type !== 'foliage'
            ? flower.rotation + wiltLevel * (flower.x > 0.5 ? 15 : -15)
            : flower.rotation;
        const wiltY =
          flower.type !== 'foliage'
            ? flower.y + wiltLevel * 0.018
            : flower.y;

        const FlowerComponent =
          flower.type === 'tulip' ? Tulip :
          flower.type === 'peony' ? Peony :
          flower.type === 'lily' ? Lily :
          Foliage;

        return (
          <motion.g
            key={flower.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.35,
              delay,
            }}
          >
            {/* Inner group handles positioning via SVG transform */}
            <g
              data-type={flower.type}
              transform={`translate(${flower.x}, ${wiltY}) rotate(${wiltRot}) scale(${flower.scale * 0.00165})`}
            >
              <FlowerComponent
                color={flower.color}
                colorAlt={flower.colorAlt}
                variant={flower.variant}
              />
            </g>
          </motion.g>
        );
      })}
    </motion.svg>
  );
}