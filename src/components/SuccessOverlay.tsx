// ── Success Overlay ──
// "I LOVE YOU TOO" box with celebration flowers

import { motion } from 'framer-motion';
import EdgeFlowers from './EdgeFlowers';

interface SuccessOverlayProps {
  visible: boolean;
}

export default function SuccessOverlay({ visible }: SuccessOverlayProps) {
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
      {/* Dimmed backdrop */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(255,245,245,0.85)',
          backdropFilter: 'blur(4px)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Edge celebration flowers */}
      <EdgeFlowers count={35} active={visible} />

      {/* Central card */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 10,
          background: '#FDE8EC',
          borderRadius: '24px',
          padding: '40px 56px',
          boxShadow: '0 8px 40px rgba(232,135,155,0.25), 0 2px 8px rgba(232,135,155,0.15)',
          border: '2px solid #F4BCC8',
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
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.6) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <motion.h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(28px, 5vw, 48px)',
            color: '#D4687C',
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
          I LOVE
          <br />
          YOU TOO
        </motion.h1>

        {/* Small heart decoration */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: -18,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: 'spring', stiffness: 300 }}
        >
          <svg width={36} height={36} viewBox="0 0 36 36">
            <path
              d="M18,30 C10,22 2,16 2,10 C2,5 6,2 10,2 C13,2 16,4 18,7 C20,4 23,2 26,2 C30,2 34,5 34,10 C34,16 26,22 18,30Z"
              fill="#F4A0B0"
              opacity={0.8}
            />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}