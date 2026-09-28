// ── Mouse Petal Effect ──
// Subtle pink petals that follow the cursor

import { useEffect, useRef, useCallback } from 'react';

interface Petal {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vRotation: number;
  opacity: number;
  size: number;
  life: number;
}

export default function PetalEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const animFrameRef = useRef<number>(0);
  const idRef = useRef(0);
  const isMobile = useRef(false);

  const updateCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const petals = petalsRef.current;

    for (let i = petals.length - 1; i >= 0; i--) {
      const p = petals[i];
      p.life -= 0.008;
      if (p.life <= 0) {
        petals.splice(i, 1);
        continue;
      }

      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.02; // gravity
      p.rotation += p.vRotation;
      p.vx *= 0.98;
      p.vy *= 0.98;
      p.opacity = p.life * 0.6;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;

      // Draw tiny petal shape
      const s = p.size;
      ctx.fillStyle = '#F4BCC8';
      ctx.beginPath();
      ctx.ellipse(0, 0, s, s * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#F9D5DC';
      ctx.beginPath();
      ctx.ellipse(s * 0.3, -s * 0.1, s * 0.4, s * 0.3, 0.3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    animFrameRef.current = requestAnimationFrame(updateCanvas);
  }, []);

  useEffect(() => {
    isMobile.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isMobile.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Spawn petals
      const petals = petalsRef.current;
      if (petals.length < 25) {
        petals.push({
          id: idRef.current++,
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6 - 0.3,
          rotation: Math.random() * Math.PI * 2,
          vRotation: (Math.random() - 0.5) * 0.05,
          opacity: 0.6,
          size: 4 + Math.random() * 6,
          life: 1,
        });
      }
    };

    window.addEventListener('mousemove', onMove);
    animFrameRef.current = requestAnimationFrame(updateCanvas);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [updateCanvas]);

  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 100,
      }}
    />
  );
}