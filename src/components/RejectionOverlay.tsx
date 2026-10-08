// ── Rejection Overlay ──
// "Aww..." card with heavy clouds, rain, and gloomy atmosphere

import { motion } from 'framer-motion';
import Clouds from './Clouds';
import Rain from './Rain';

interface RejectionOverlayProps {
  visible: boolean;
}

export default function RejectionOverlay({ visible }: RejectionOverlayProps) {
  if (!visible) return null;

  return (
    <motion.div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Dimmed backdrop with cool/gloomy tint */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(230,235,245,0.88)',
          backdropFilter: 'blur(4px)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Clouds across the full top — more prominent */}
      <Clouds active={visible} count={8} />

      {/* Rain across the whole screen */}
      <Rain active={visible} intensity={1} />

      {/* Central card */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 10,
          background: '#E8EAF0',
          borderRadius: '24px',
          padding: '40px 56px',
          boxShadow: '0 8px 40px rgba(120,130,150,0.25), 0 2px 8px rgba(120,130,150,0.15)',
          border: '2px solid #C8CED8',
        }}
        initial={{ scale: 0.5, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 15,
          delay: 0.3,
        }}
      >
        {/* Inner glow */}
        <div
          style={{
            position: 'absolute',
            inset: 8,
            borderRadius: '18px',
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.5) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Cloud icon */}
        <motion.div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '12px',
            position: 'relative',
            zIndex: 1,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        >
          <svg width={56} height={40} viewBox="0 0 80 50">
            <ellipse cx={25} cy={35} rx={25} ry={15} fill="#A0A8B8" opacity={0.6} />
            <ellipse cx={45} cy={30} rx={30} ry={18} fill="#B0B8C8" opacity={0.7} />
            <ellipse cx={60} cy={35} rx={20} ry={12} fill="#9098A8" opacity={0.5} />
            <ellipse cx={35} cy={25} rx={22} ry={14} fill="#C0C8D8" opacity={0.8} />
          </svg>
        </motion.div>

        <motion.h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(28px, 5vw, 48px)',
            color: '#6B7280',
            textAlign: 'center',
            margin: 0,
            lineHeight: 1.3,
            position: 'relative',
            zIndex: 1,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Aww...
        </motion.h1>

        {/* Small rain drop decoration */}
        <motion.div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 8,
            marginTop: '16px',
            position: 'relative',
            zIndex: 1,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              style={{
                width: 3,
                height: 14,
                borderRadius: 2,
                background: '#A0A8B8',
                opacity: 0.5,
              }}
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 1.2,
                delay: i * 0.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}