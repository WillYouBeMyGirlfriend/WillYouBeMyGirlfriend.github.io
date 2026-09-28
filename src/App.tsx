// ── App Root ──
// Manages overall state: opening → main → success

import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import OpeningScreen from './components/OpeningScreen';
import MainScreen from './components/MainScreen';
import SuccessOverlay from './components/SuccessOverlay';
import PetalEffect from './components/PetalEffect';
import type { AppState } from './types/bouquet';

export default function App() {
  const [state, setState] = useState<AppState>('opening');

  const handleOpen = useCallback(() => {
    setState('main');
  }, []);

  const handleYes = useCallback(() => {
    setState('success');
  }, []);

  return (
    <>
      <PetalEffect />
      <AnimatePresence mode="wait">
        {state === 'opening' && (
          <OpeningScreen key="opening" onOpen={handleOpen} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {state === 'main' && (
          <MainScreen key="main" onYes={handleYes} />
        )}
      </AnimatePresence>
      <SuccessOverlay visible={state === 'success'} />
    </>
  );
}