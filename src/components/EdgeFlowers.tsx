// ── Edge Flowers Component ──
// Decorative flowers around viewport edges. Pre-generates all flowers
// and staggers their visibility based on count.

import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface EdgeFlower {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  type: 'tulip' | 'peony' | 'lily';
  color: string;
}

interface EdgeFlowersProps {
  count: number;
  active: boolean;
}

const MAX_FLOWERS = 35;
const COLORS = ['#F4A0B0', '#F9D5DC', '#E8879B', '#F9C2CF', '#FDE8EC', '#F4BCC8', '#FFF0F3'];
const TYPES: EdgeFlower['type'][] = ['tulip', 'peony', 'lily'];

// Pre-generate stable flower data
function generateEdgeFlowers(): EdgeFlower[] {
  const items: EdgeFlower[] = [];
  for (let i = 0; i < MAX_FLOWERS; i++) {
    const edge = i % 4;
    let x: number, y: number;
    switch (edge) {
      case 0: x = 3 + ((i * 31) % 94); y = 2 + ((i * 17) % 8); break;
      case 1: x = 90 + ((i * 23) % 8); y = 3 + ((i * 41) % 94); break;
      case 2: x = 3 + ((i * 37) % 94); y = 88 + ((i * 13) % 10); break;
      default: x = 2 + ((i * 29) % 8); y = 3 + ((i * 47) % 94); break;
    }
    items.push({
      id: i,
      x, y,
      size: 14 + (i * 7) % 22,
      rotation: (i * 137) % 360,
      type: TYPES[i % 3],
      color: COLORS[i % COLORS.length],
    });
  }
  return items;
}

const STABLE_FLOWERS = generateEdgeFlowers();

export default function EdgeFlowers({ count, active }: EdgeFlowersProps) {
  const visibleCount = active ? Math.min(count, MAX_FLOWERS) : 0;

  if (visibleCount === 0) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 5 }}>
      {STABLE_FLOWERS.slice(0, visibleCount).map((f, i) => (
        <motion.div
          key={f.id}
          style={{
            position: 'absolute',
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: f.size,
            height: f.size,
            transform: `translate(-50%, -50%) rotate(${f.rotation}deg)`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.75, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.4, delay: i * 0.05, type: 'spring', stiffness: 180, damping: 14 }}
        >
          <svg viewBox="0 0 40 40" style={{ width: '100%', height: '100%' }}>
            {f.type === 'tulip' && (
              <g transform="translate(20,20)">
                <path d="M0,-12 C-8,-4 -7,5 -1,8 L0,1 Z" fill={f.color} />
                <path d="M0,-12 C8,-4 7,5 1,8 L0,1 Z" fill={f.color} opacity={0.8} />
              </g>
            )}
            {f.type === 'peony' && (
              <g transform="translate(20,20)">
                {[0, 60, 120, 180, 240, 300].map((a) => (
                  <ellipse
                    key={a}
                    cx={Math.cos(a * Math.PI / 180) * 4}
                    cy={Math.sin(a * Math.PI / 180) * 4}
                    rx={5} ry={7}
                    transform={`rotate(${a + 90}, ${Math.cos(a * Math.PI / 180) * 4}, ${Math.sin(a * Math.PI / 180) * 4})`}
                    fill={f.color} opacity={0.8}
                  />
                ))}
                <circle cx={0} cy={0} r={3} fill={f.color} />
              </g>
            )}
            {f.type === 'lily' && (
              <g transform="translate(20,20)">
                {[0, 72, 144, 216, 288].map((a) => (
                  <ellipse
                    key={a}
                    cx={Math.cos(a * Math.PI / 180) * 3}
                    cy={Math.sin(a * Math.PI / 180) * 3}
                    rx={3} ry={10}
                    transform={`rotate(${a + 90}, ${Math.cos(a * Math.PI / 180) * 3}, ${Math.sin(a * Math.PI / 180) * 3})`}
                    fill={f.color} opacity={0.8}
                  />
                ))}
              </g>
            )}
          </svg>
        </motion.div>
      ))}
    </div>
  );
}