// ── Opening Screen ──
// Minimal opening with "Open" button

import { motion } from 'framer-motion';

interface OpeningScreenProps {
  onOpen: () => void;
}

export default function OpeningScreen({ onOpen }: OpeningScreenProps) {
  return (
    <motion.div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(170deg, #FFF8F0 0%, #FDE8EC 40%, #FFF5F5 100%)',
        zIndex: 1000,
      }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* Subtle decorative circles */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244,160,176,0.1) 0%, transparent 70%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '12%',
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249,213,220,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Small decorative flower */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.6, scale: 1, rotate: 15 }}
        transition={{ delay: 0.2, duration: 0.7, type: 'spring' }}
        style={{ marginBottom: '20px' }}
      >
        <svg width={80} height={80} viewBox="0 0 80 80">
          <g transform="translate(40,40)">
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse
                key={a}
                cx={Math.cos(a * Math.PI / 180) * 8}
                cy={Math.sin(a * Math.PI / 180) * 8}
                rx={12}
                ry={20}
                transform={`rotate(${a + 90}, ${Math.cos(a * Math.PI / 180) * 8}, ${Math.sin(a * Math.PI / 180) * 8})`}
                fill="#F4BCC8"
                opacity={0.7}
              />
            ))}
            <circle cx={0} cy={0} r={10} fill="#FDE8EC" opacity={0.9} />
          </g>
        </svg>
      </motion.div>

      {/* Button */}
      <motion.button
        onClick={onOpen}
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '1.4rem',
          color: '#D4687C',
          background: 'rgba(255,255,255,0.7)',
          border: '2px solid #F4BCC8',
          borderRadius: '50px',
          padding: '14px 48px',
          cursor: 'pointer',
          letterSpacing: '0.05em',
          boxShadow: '0 4px 20px rgba(232,135,155,0.15)',
          position: 'relative',
          overflow: 'hidden',
        }}
        whileHover={{
          scale: 1.05,
          background: 'rgba(255,255,255,0.9)',
          boxShadow: '0 6px 25px rgba(232,135,155,0.25)',
        }}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        💌 Open
      </motion.button>
    </motion.div>
  );
}