// ── Miffy-Inspired Bunny ──
// Original minimalist bunny character

import { motion } from 'framer-motion';

interface BunnyProps {
  mood: 'neutral' | 'happy' | 'sad';
  visible: boolean;
}

export default function Bunny({ mood, visible }: BunnyProps) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        top: '4%',
        right: 'clamp(3%, 5vw, 8%)',
        width: 'clamp(40px, 8vw, 60px)',
        height: 'clamp(48px, 9vw, 70px)',
        zIndex: 20,
        pointerEvents: 'none',
      }}
      initial={{ opacity: 0, scale: 0.5, y: 10 }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.5,
        y: visible ? 0 : 10,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
    >
      <svg viewBox="0 0 60 70" style={{ width: '100%', height: '100%' }}>
        {/* Body */}
        <ellipse cx={30} cy={48} rx={16} ry={18} fill="#FFF8F0" stroke="#E8D5C8" strokeWidth={1.5} />

        {/* Head */}
        <circle cx={30} cy={26} r={14} fill="#FFF8F0" stroke="#E8D5C8" strokeWidth={1.5} />

        {/* Left ear */}
        <ellipse
          cx={21}
          cy={8}
          rx={6}
          ry={16}
          fill="#FFF8F0"
          stroke="#E8D5C8"
          strokeWidth={1.5}
          transform="rotate(-10, 21, 8)"
        />
        <ellipse
          cx={21}
          cy={8}
          rx={3.5}
          ry={12}
          fill="#FDE8EC"
          transform="rotate(-10, 21, 8)"
        />

        {/* Right ear */}
        <ellipse
          cx={39}
          cy={8}
          rx={6}
          ry={16}
          fill="#FFF8F0"
          stroke="#E8D5C8"
          strokeWidth={1.5}
          transform="rotate(10, 39, 8)"
        />
        <ellipse
          cx={39}
          cy={8}
          rx={3.5}
          ry={12}
          fill="#FDE8EC"
          transform="rotate(10, 39, 8)"
        />

        {/* Eyes */}
        <motion.g
          animate={{ scaleY: mood === 'happy' ? 0.3 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <circle cx={24} cy={24} r={2} fill="#4A3728" />
          <circle cx={36} cy={24} r={2} fill="#4A3728" />
        </motion.g>

        {/* Happy eyes (crescents) */}
        {mood === 'happy' && (
          <g>
            <path d="M22,25 Q24,21 26,25" fill="none" stroke="#4A3728" strokeWidth={1.2} strokeLinecap="round" />
            <path d="M34,25 Q36,21 38,25" fill="none" stroke="#4A3728" strokeWidth={1.2} strokeLinecap="round" />
          </g>
        )}

        {/* Sad eyes */}
        {mood === 'sad' && (
          <g>
            <circle cx={24} cy={25} r={1.8} fill="#4A3728" />
            <circle cx={36} cy={25} r={1.8} fill="#4A3728" />
            <path d="M21,28 Q24,29 27,28" fill="none" stroke="#4A3728" strokeWidth={0.8} strokeLinecap="round" />
            <path d="M33,28 Q36,29 39,28" fill="none" stroke="#4A3728" strokeWidth={0.8} strokeLinecap="round" />
          </g>
        )}

        {/* Nose */}
        <motion.ellipse
          cx={30}
          cy={28}
          rx={2}
          ry={1.5}
          fill={mood === 'sad' ? '#D4A0A0' : '#F0B8C8'}
          animate={{ cy: mood === 'sad' ? 29 : 28 }}
          transition={{ duration: 0.2 }}
        />

        {/* Mouth */}
        <motion.path
          d={
            mood === 'happy'
              ? 'M27,31 Q30,35 33,31'
              : mood === 'sad'
                ? 'M27,32 Q30,29 33,32'
                : 'M28,31 L32,31'
          }
          fill="none"
          stroke="#4A3728"
          strokeWidth={1}
          strokeLinecap="round"
          animate={{ d: mood === 'happy' ? 'M27,31 Q30,35 33,31' : mood === 'sad' ? 'M27,32 Q30,29 33,32' : 'M28,31 L32,31' }}
          transition={{ duration: 0.2 }}
        />

        {/* Cheeks */}
        <circle cx={18} cy={29} r={3} fill="#FDE8EC" opacity={0.6} />
        <circle cx={42} cy={29} r={3} fill="#FDE8EC" opacity={0.6} />

        {/* Arms */}
        <ellipse cx={15} cy={44} rx={4} ry={7} fill="#FFF8F0" stroke="#E8D5C8" strokeWidth={1} transform="rotate(15, 15, 44)" />
        <ellipse cx={45} cy={44} rx={4} ry={7} fill="#FFF8F0" stroke="#E8D5C8" strokeWidth={1} transform="rotate(-15, 45, 44)" />

        {/* Feet */}
        <ellipse cx={21} cy={66} rx={7} ry={4} fill="#FFF8F0" stroke="#E8D5C8" strokeWidth={1} />
        <ellipse cx={39} cy={66} rx={7} ry={4} fill="#FFF8F0" stroke="#E8D5C8" strokeWidth={1} />
      </svg>
    </motion.div>
  );
}