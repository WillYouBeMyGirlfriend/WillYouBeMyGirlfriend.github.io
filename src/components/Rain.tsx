// ── Rain Component ──
// Gentle rain during No hover. Pre-generated stable drops.

import { motion } from 'framer-motion';

interface RainProps {
  active: boolean;
  intensity: number;
}

const MAX_DROPS = 40;
const DROPS = Array.from({ length: MAX_DROPS }, (_, i) => ({
  id: i,
  x: 25 + ((i * 47) % 55),
  length: 8 + ((i * 13) % 16),
  duration: 0.6 + ((i * 11) % 90) / 100,
  delay: ((i * 19) % 100) / 100,
  opacity: 0.15 + ((i * 31) % 40) / 100,
}));

export default function Rain({ active, intensity }: RainProps) {
  if (!active) return null;

  const visibleCount = Math.floor(intensity * MAX_DROPS);
  if (visibleCount === 0) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 4, overflow: 'hidden' }}>
      {DROPS.slice(0, visibleCount).map((d) => (
        <motion.div
          key={d.id}
          style={{
            position: 'absolute',
            left: `${d.x}%`,
            top: '-5%',
            width: 1.5,
            height: d.length,
            borderRadius: 2,
            background: 'linear-gradient(to bottom, transparent, rgba(150,170,200,0.7))',
            opacity: d.opacity,
          }}
          initial={{ y: '-5%' }}
          animate={{ y: '105%' }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}