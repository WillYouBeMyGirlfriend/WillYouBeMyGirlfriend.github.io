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
  const lastSpawnRef = useRef({ x: -100, y: -100 });

  const updateCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const petals = petalsRef.current;

    for (let i = petals.length - 1; i >= 0; i--) {
      const p = petals[i];
      p.life -= 0.006;
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
      p.opacity = p.life * 0.85;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;

      // Draw tiny heart shape
      const s = p.size;
      const w = s;
      const h = s * 0.9;
      ctx.fillStyle = '#F4A0B0';
      ctx.beginPath();
      ctx.moveTo(0, h * 0.3);
      ctx.bezierCurveTo(-w * 0.5, -h * 0.1, -w * 0.5, -h * 0.6, 0, -h * 0.5);
      ctx.bezierCurveTo(w * 0.5, -h * 0.6, w * 0.5, -h * 0.1, 0, h * 0.3);
      ctx.closePath();
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

      // Distance throttle — only spawn when mouse has moved enough
      const dx = e.clientX - lastSpawnRef.current.x;
      const dy = e.clientY - lastSpawnRef.current.y;
      if (Math.sqrt(dx * dx + dy * dy) < 14) return;
      lastSpawnRef.current = { x: e.clientX, y: e.clientY };

      // Spawn hearts
      const petals = petalsRef.current;
      petals.push({
        id: idRef.current++,
        x: e.clientX,
        y: e.clientY,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6 - 0.3,
        rotation: Math.random() * Math.PI * 2,
        vRotation: (Math.random() - 0.5) * 0.05,
        opacity: 0.85,
        size: 8 + Math.random() * 12,
        life: 1,
      });
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