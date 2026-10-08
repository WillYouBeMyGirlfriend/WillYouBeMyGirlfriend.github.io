// ── Background Music ──
// Plays bg-music.mp3 in a loop, starting after first user interaction

import { useEffect, useRef } from 'react';

interface BackgroundMusicProps {
  shouldPlay: boolean;
}

export default function BackgroundMusic({ shouldPlay }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!shouldPlay) return;

    const audio = new Audio('/bg-music.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    audio.play().catch(() => {
      // Autoplay blocked — start on first click/tap
      const resume = () => {
        audio.play();
        document.removeEventListener('click', resume);
        document.removeEventListener('touchstart', resume);
      };
      document.addEventListener('click', resume);
      document.addEventListener('touchstart', resume);
    });

    return () => {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, [shouldPlay]);

  return null;
}