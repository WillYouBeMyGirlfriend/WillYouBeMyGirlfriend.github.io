// ── App Root ──
// Manages overall state: opening → main → success / rejected

import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import OpeningScreen from './components/OpeningScreen';
import MainScreen from './components/MainScreen';
import SuccessOverlay from './components/SuccessOverlay';
import RejectionOverlay from './components/RejectionOverlay';
import PetalEffect from './components/PetalEffect';
import BackgroundMusic from './components/BackgroundMusic';
import type { AppState } from './types/bouquet';

export default function App() {
  const [state, setState] = useState<AppState>('opening');

  const handleOpen = useCallback(() => {
    setState('main');
  }, []);

  const handleYes = useCallback(() => {
    setState('success');
  }, []);

  const handleNo = useCallback(() => {
    setState('rejected');
  }, []);

  return (
    <>
      <BackgroundMusic shouldPlay={state !== 'opening'} />
      <PetalEffect />
      <AnimatePresence mode="wait">
        {state === 'opening' && (
          <OpeningScreen key="opening" onOpen={handleOpen} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {state === 'main' && (
          <MainScreen key="main" onYes={handleYes} onNo={handleNo} />
        )}
      </AnimatePresence>
      <SuccessOverlay visible={state === 'success'} />
      <RejectionOverlay visible={state === 'rejected'} />
    </>
  );
}