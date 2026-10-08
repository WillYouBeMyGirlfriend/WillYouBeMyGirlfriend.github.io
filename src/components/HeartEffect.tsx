// ── Success Heart Effect ──
// Floating hearts that drift across the screen on the success overlay

import { useEffect, useRef, useCallback } from 'react';

interface Heart {
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

interface HeartEffectProps {
  active: boolean;
  count?: number;
}

function drawHeart(ctx: CanvasRenderingContext2D, s: number) {
  const w = s;
  const h = s * 0.9;
  ctx.beginPath();
  ctx.moveTo(0, h * 0.3);
  ctx.bezierCurveTo(-w * 0.5, -h * 0.1, -w * 0.5, -h * 0.6, 0, -h * 0.5);
  ctx.bezierCurveTo(w * 0.5, -h * 0.6, w * 0.5, -h * 0.1, 0, h * 0.3);
  ctx.closePath();
  ctx.fill();
}

export default function HeartEffect({ active, count = 40 }: HeartEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heartsRef = useRef<Heart[]>([]);
  const animFrameRef = useRef<number>(0);
  const idRef = useRef(0);
  const hasSpawned = useRef(false);

  const updateCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const hearts = heartsRef.current;

    for (let i = hearts.length - 1; i >= 0; i--) {
      const h = hearts[i];
      h.life -= 0.003;
      if (h.life <= 0) {
        hearts.splice(i, 1);
        continue;
      }

      h.x += h.vx;
      h.y += h.vy;
      h.vy += 0.015; // gentle gravity
      h.rotation += h.vRotation;
      h.vx *= 0.995;
      h.vy *= 0.995;
      h.opacity = Math.min(h.life * 0.8, 0.65);

      ctx.save();
      ctx.translate(h.x, h.y);
      ctx.rotate(h.rotation);
      ctx.globalAlpha = h.opacity;

      // Outer heart
      const s = h.size;
      ctx.fillStyle = '#F4A0B0';
      drawHeart(ctx, s);

      // Inner highlight heart
      ctx.fillStyle = '#FDE8EC';
      ctx.save();
      ctx.scale(0.55, 0.55);
      drawHeart(ctx, s);
      ctx.restore();

      ctx.restore();
    }

    animFrameRef.current = requestAnimationFrame(updateCanvas);
  }, []);

  // Single effect: resize canvas, then spawn, then animate
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active) {
      heartsRef.current = [];
      hasSpawned.current = false;
      return;
    }

    // Resize canvas to full window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Spawn hearts across the full window
    if (!hasSpawned.current) {
      hasSpawned.current = true;
      const hearts = heartsRef.current;
      for (let i = 0; i < count; i++) {
        hearts.push({
          id: idRef.current++,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2 - 1.2,
          rotation: Math.random() * Math.PI * 2,
          vRotation: (Math.random() - 0.5) * 0.025,
          opacity: 0.65,
          size: 6 + Math.random() * 16,
          life: 0.6 + Math.random() * 0.6,
        });
      }
    }

    // Handle resize
    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    // Start animation
    animFrameRef.current = requestAnimationFrame(updateCanvas);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [active, count, updateCanvas]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    />
  );
}