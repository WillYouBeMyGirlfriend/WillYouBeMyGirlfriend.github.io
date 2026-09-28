// ── Clouds Component ──
// Soft clouds during No hover. Pre-generated stable positions.

import { motion, AnimatePresence } from 'framer-motion';
import { useMemo } from 'react';

interface CloudsProps {
  active: boolean;
  count: number;
}

const MAX_CLOUDS = 8;

// Deterministic-ish positions using index-based math
const CLOUD_DATA = Array.from({ length: MAX_CLOUDS }, (_, i) => ({
  id: i,
  x: 30 + ((i * 53) % 55),
  y: 5 + ((i * 29) % 15),
  scale: 0.5 + ((i * 37) % 60) / 100,
  opacity: 0.12 + ((i * 23) % 25) / 100,
  delay: ((i * 17) % 80) / 100,
}));

export default function Clouds({ active, count }: CloudsProps) {
  const visible = active ? Math.min(count, MAX_CLOUDS) : 0;

  if (visible === 0) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 4 }}>
      {CLOUD_DATA.slice(0, visible).map((c) => (
        <motion.div
          key={c.id}
          style={{
            position: 'absolute',
            left: `${c.x}%`,
            top: `${c.y}%`,
          }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: c.opacity, scale: c.scale }}
          exit={{ opacity: 0, scale: 0.4 }}
          transition={{ duration: 0.6, delay: c.delay }}
        >
          <svg width={80} height={50} viewBox="0 0 80 50">
            <ellipse cx={25} cy={35} rx={25} ry={15} fill="#B0B8C8" />
            <ellipse cx={45} cy={30} rx={30} ry={18} fill="#C0C8D8" />
            <ellipse cx={60} cy={35} rx={20} ry={12} fill="#A8B0C0" />
            <ellipse cx={35} cy={25} rx={22} ry={14} fill="#D0D5E0" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}