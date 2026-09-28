// ── Main Proposal Screen ──
// The core experience with bouquet, text, and interactive buttons

import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Bouquet from './Bouquet';
import Bunny from './Bunny';
import EdgeFlowers from './EdgeFlowers';
import Clouds from './Clouds';
import Rain from './Rain';
import { generateBouquet } from './BouquetGenerator';

interface MainScreenProps {
  onYes: () => void;
}

export default function MainScreen({ onYes }: MainScreenProps) {
  const [hoverState, setHoverState] = useState<'none' | 'yes' | 'no'>('none');
  const [hoverIntensity, setHoverIntensity] = useState(0);
  const hoverIntensityRef = useRef(0);
  const hoverTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [bunnyMood, setBunnyMood] = useState<'neutral' | 'happy' | 'sad'>('neutral');

  // Generate bouquet on mount - stable for the session
  const bouquet = useMemo(() => generateBouquet(), []);

  const startHover = useCallback((button: 'yes' | 'no') => {
    setHoverState(button);
    setBunnyMood(button === 'yes' ? 'happy' : 'sad');

    let intensity = 0;
    if (hoverTimerRef.current) clearInterval(hoverTimerRef.current);
    hoverTimerRef.current = setInterval(() => {
      intensity = Math.min(1, intensity + 0.04);
      setHoverIntensity(intensity);
      hoverIntensityRef.current = intensity;
      if (intensity >= 1 && hoverTimerRef.current) {
        clearInterval(hoverTimerRef.current);
      }
    }, 40);
  }, []);

  const endHover = useCallback(() => {
    setHoverState('none');
    setBunnyMood('neutral');

    if (hoverTimerRef.current) clearInterval(hoverTimerRef.current);
    let intensity = hoverIntensityRef.current;
    const fadeOut = setInterval(() => {
      intensity = Math.max(0, intensity - 0.06);
      setHoverIntensity(intensity);
      hoverIntensityRef.current = intensity;
      if (intensity <= 0) {
        clearInterval(fadeOut);
        setHoverIntensity(0);
      }
    }, 40);
    hoverTimerRef.current = fadeOut;
  }, []);

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearInterval(hoverTimerRef.current);
    };
  }, []);

  const isYesActive = hoverState === 'yes';
  const isNoActive = hoverState === 'no';

  const pageDarkness = isNoActive ? hoverIntensity * 0.3 : 0;
  const pageSaturation = isNoActive ? 1 - hoverIntensity * 0.4 : 1;
  const wiltLevel = isNoActive ? hoverIntensity * 0.6 : 0;

  const yesFlowerCount = isYesActive ? Math.floor(hoverIntensity * 18) : 0;
  const noCloudCount = isNoActive ? Math.floor(hoverIntensity * 6) : 0;

  return (
    <motion.div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(170deg, 
          hsl(30, ${100 - pageDarkness * 20}%, ${97 - pageDarkness * 7}%) 0%, 
          hsl(350, ${100 - pageDarkness * 30}%, ${92 - pageDarkness * 6}%) 40%, 
          hsl(0, ${100 - pageDarkness * 20}%, ${97 - pageDarkness * 7}%) 100%)`,
        overflow: 'hidden',
        filter: `saturate(${pageSaturation})`,
        transition: 'filter 0.3s',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Edge flowers for Yes hover */}
      <EdgeFlowers count={yesFlowerCount} active={isYesActive} />

      {/* Clouds for No hover */}
      <Clouds active={isNoActive} count={noCloudCount} />

      {/* Rain for No hover */}
      <Rain active={isNoActive} intensity={hoverIntensity} />

      {/* Subtle background decorative circles */}
      <div
        style={{
          position: 'absolute',
          top: '12%',
          left: '8%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(244,160,176,${0.08 - pageDarkness * 0.04}) 0%, transparent 70%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '18%',
          right: '10%',
          width: '140px',
          height: '140px',
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(249,213,220,${0.1 - pageDarkness * 0.05}) 0%, transparent 70%)`,
          opacity: isYesActive ? 1 + hoverIntensity : 1 - pageDarkness,
        }}
      />

      {/* Bouquet */}
      <motion.div
        style={{
          width: 'min(420px, 85vw)',
          height: 'min(420px, 85vw)',
          marginBottom: 'clamp(12px, 2vh, 24px)',
          position: 'relative',
          zIndex: 10,
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
      >
        <Bouquet bouquet={bouquet} wiltLevel={wiltLevel} />
      </motion.div>

      {/* Proposal Text */}
      <motion.p
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(18px, 2.8vw, 26px)',
          color: '#8B5E6B',
          textAlign: 'center',
          margin: '0 0 clamp(16px, 2.5vh, 28px) 0',
          lineHeight: 1.5,
          maxWidth: '90vw',
          zIndex: 10,
          position: 'relative',
        }}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        Megan, I love you, will you be my girlfriend?
      </motion.p>

      {/* Buttons */}
      <motion.div
        style={{
          display: 'flex',
          gap: 'clamp(16px, 3vw, 32px)',
          zIndex: 10,
          position: 'relative',
        }}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.3 }}
      >
        {/* Yes Button */}
        <motion.button
          onMouseEnter={() => startHover('yes')}
          onMouseLeave={() => endHover()}
          onClick={onYes}
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: 'white',
            background: 'linear-gradient(135deg, #F4A0B0, #E8879B)',
            border: 'none',
            borderRadius: '50px',
            padding: 'clamp(10px, 1.5vh, 14px) clamp(28px, 4vw, 48px)',
            cursor: 'pointer',
            letterSpacing: '0.04em',
            boxShadow: '0 4px 15px rgba(232,135,155,0.3)',
          }}
          whileHover={{
            scale: 1.06,
            boxShadow: '0 6px 25px rgba(232,135,155,0.45)',
          }}
          whileTap={{ scale: 0.96 }}
        >
          Yes
        </motion.button>

        {/* No Button */}
        <motion.button
          onMouseEnter={() => startHover('no')}
          onMouseLeave={() => endHover()}
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: '#9B8E93',
            background: 'rgba(255,255,255,0.6)',
            border: '2px solid #E0D0D5',
            borderRadius: '50px',
            padding: 'clamp(10px, 1.5vh, 14px) clamp(28px, 4vw, 48px)',
            cursor: 'pointer',
            letterSpacing: '0.04em',
          }}
          whileHover={{
            scale: 1.06,
            background: 'rgba(240,235,238,0.8)',
            borderColor: '#C8B8C0',
          }}
          whileTap={{ scale: 0.96 }}
        >
          No
        </motion.button>
      </motion.div>

      {/* Bunny */}
      <Bunny mood={bunnyMood} visible={hoverState !== 'none'} />
    </motion.div>
  );
}