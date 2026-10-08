// ── Bouquet Component ──
// ViewBox 200×200; generator outputs 0-1 coords, we scale by 200

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

const S = 200; // scale factor: generator coords (0-1) → viewBox (0-200)

export default function Bouquet({ bouquet, wiltLevel }: BouquetProps) {
  const { flowers, stems, wrapping, ribbon, palette } = bouquet;

  return (
    <motion.svg
      viewBox={`0 0 ${S} ${S}`}
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
        <pattern id="paperTexture" patternUnits="userSpaceOnUse" width="4" height="4">
          <circle cx="2" cy="2" r="0.6" fill="#D4C4B8" opacity="0.15" />
        </pattern>
      </defs>

      {/* Ground shadow */}
      <ellipse cx={S / 2} cy={S * 0.64} rx={S * 0.25} ry={S * 0.05} fill="rgba(0,0,0,0.06)" />

      {/* Wrapping paper — generator coords are 0-1, scale up */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        transform={`scale(${S})`}
      >
        <Wrapping path={wrapping.path} ribbon={ribbon} palette={palette} />
      </motion.g>

      {/* Stems — generator coords 0-1, scale up */}
      {stems.map((stem, i) => (
        <motion.path
          key={stem.id}
          d={`M ${stem.x1 * S},${stem.y1 * S} Q ${stem.cx * S},${stem.cy * S} ${stem.x2 * S},${stem.y2 * S}`}
          fill="none"
          stroke="#8AAB85"
          strokeWidth={1.5}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 + i * 0.02, ease: 'easeOut' }}
        />
      ))}

      {/* Flowers */}
      {flowers.map((flower, i) => {
        const delay = 0.55 + i * 0.03;
        const wiltRot =
          flower.type !== 'foliage'
            ? flower.rotation + wiltLevel * (flower.x > 0.5 ? 12 : -12)
            : flower.rotation;
        const wiltY =
          flower.type !== 'foliage'
            ? flower.y + wiltLevel * 0.018
            : flower.y;

        const px = flower.x * S;
        const py = wiltY * S;
        const flowerScale = flower.scale * 0.85;

        const FlowerComponent =
          flower.type === 'tulip' ? Tulip :
          flower.type === 'peony' ? Peony :
          flower.type === 'lily' ? Lily :
          Foliage;

        return (
          <motion.g
            key={flower.id}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay,
              type: 'spring',
              stiffness: 180,
              damping: 12,
            }}
          >
            <g transform={`translate(${px}, ${py}) rotate(${wiltRot}) scale(${flowerScale})`}>
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