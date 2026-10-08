// ── Intelligent Bouquet Generator ──
// Composes bouquets like a florist, not a randomizer.

import type {
  GeneratedBouquet,
  FlowerInstance,
  StemData,
  WrappingData,
  RibbonData,
  FlowerPalette,
  SilhouetteParams,
  FlowerType,
} from '../types/bouquet';

// ── Seeded Random ──
function mulberry32(seed: number): () => number {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

let rng: () => number;

function random(): number {
  return rng();
}

function randomRange(min: number, max: number): number {
  return min + random() * (max - min);
}

function randomInt(min: number, max: number): number {
  return Math.floor(randomRange(min, max + 1));
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Palette Generation ──
const palettes: FlowerPalette[] = [
  {
    tulipColors: ['#F4A0B0', '#E8879B', '#F9C2CF', '#FDE8EC'],
    peonyColors: ['#F9D5DC', '#F4BCC8', '#FDE8EC', '#FFF0F3'],
    lilyColors: ['#FFF5F5', '#FEF0F2', '#FDE8EC', '#FFFFFF'],
    foliageColors: ['#A3B89F', '#8DA88A', '#B5C9B2', '#9AB89C'],
    accentPink: '#E8879B',
    cream: '#FFF8F0',
  },
  {
    tulipColors: ['#E8A0B4', '#D4889B', '#F0B8C6', '#FBE4EA'],
    peonyColors: ['#F8D0D9', '#F3B8C5', '#FCE5EC', '#FFF2F5'],
    lilyColors: ['#FFF8F8', '#FFF0F3', '#FCE5EC', '#FFFFFF'],
    foliageColors: ['#93A88F', '#7D9879', '#A5B9A2', '#8AA88B'],
    accentPink: '#D4889B',
    cream: '#FFF5ED',
  },
  {
    tulipColors: ['#F5B0C0', '#E997A8', '#FAC8D4', '#FEEEF2'],
    peonyColors: ['#FADBE3', '#F5C2CF', '#FEEEF2', '#FFF5F7'],
    lilyColors: ['#FFF0F0', '#FEE8EC', '#FCE0E5', '#FFFFFF'],
    foliageColors: ['#B3C8AF', '#9DB89A', '#C5D9C2', '#AAB8A4'],
    accentPink: '#E997A8',
    cream: '#FFFAF5',
  },
];

// ── Silhouette Generation ──
function generateSilhouette(): SilhouetteParams {
  return {
    width: randomRange(0.75, 0.92),
    height: randomRange(0.78, 0.92),
    waistRatio: randomRange(0.55, 0.72),
    asymmetry: randomRange(-0.06, 0.06),
    topRoundness: randomRange(0.5, 0.8),
  };
}

// ── Main Generation Function ──
export function generateBouquet(): GeneratedBouquet {
  const seed = Date.now() ^ (Math.random() * 0xffffffff);
  rng = mulberry32(seed);

  const palette = randomChoice(palettes);
  const silhouette = generateSilhouette();

  // Determine flower counts
  const tulipCount = randomInt(4, 6);
  const peonyCount = randomInt(2, 3);
  const lilyCount = randomInt(2, 3);
  const foliageCount = randomInt(10, 14);

  const flowers: FlowerInstance[] = [];
  let idCounter = 0;

  const bouquetCX = 0.5; // center of the bouquet area (normalized 0-1)
  const bouquetCY = 0.45;
  const bouquetW = silhouette.width;
  const bouquetH = silhouette.height;
  const waistR = silhouette.waistRatio;

  // Helper: check if a point is within the bouquet silhouette
  function insideSilhouette(x: number, y: number, margin = 0): boolean {
    const dx = (x - bouquetCX) / (bouquetW / 2);
    const dy = (y - bouquetCY) / (bouquetH / 2);

    // Distorted ellipse: narrower at bottom, wider at middle/top
    const waistY = 0.65; // where waist is tightest (normalized 0-1 from top)
    const normalizedY = (y - (bouquetCY - bouquetH / 2)) / bouquetH;

    let effectiveW = 1.0;
    if (normalizedY > waistY) {
      // Bottom: taper from waist to bottom
      const t = (normalizedY - waistY) / (1 - waistY);
      effectiveW = 1 - t * (1 - waistR);
    }

    const dist = Math.sqrt(dx * dx / (effectiveW * effectiveW) + dy * dy);
    return dist <= 1 - margin;
  }

  function silhouetteEdge(x: number, y: number): number {
    const dx = (x - bouquetCX) / (bouquetW / 2);
    const dy = (y - bouquetCY) / (bouquetH / 2);
    const waistY = 0.65;
    const normalizedY = (y - (bouquetCY - bouquetH / 2)) / bouquetH;
    let effectiveW = 1.0;
    if (normalizedY > waistY) {
      const t = (normalizedY - waistY) / (1 - waistY);
      effectiveW = 1 - t * (1 - waistR);
    }
    return Math.sqrt(dx * dx / (effectiveW * effectiveW) + dy * dy);
  }

  // Place a flower with collision avoidance
  function tryPlaceFlower(
    type: FlowerType,
    preferredRegion: { cx: number; cy: number; rx: number; ry: number },
    minDist: number,
    existingFlowers: FlowerInstance[],
    attempts = 30,
  ): { x: number; y: number } | null {
    for (let i = 0; i < attempts; i++) {
      const angle = random() * Math.PI * 2;
      const radius = random() * 0.8;
      const x =
        preferredRegion.cx + Math.cos(angle) * preferredRegion.rx * radius;
      const y =
        preferredRegion.cy + Math.sin(angle) * preferredRegion.ry * radius;

      if (!insideSilhouette(x, y, 0.02)) continue;

      let tooClose = false;
      for (const f of existingFlowers) {
        if (f.type === 'foliage') continue; // flowers can overlap foliage
        const dx = x - f.x;
        const dy = y - f.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDist * f.scale * 0.6) {
          tooClose = true;
          break;
        }
      }
      if (!tooClose) return { x, y };
    }
    return null;
  }

  // ── Layer 1: Rear Foliage (behind everything, along stem area) ──
  const rearFoliageCount = Math.floor(foliageCount * 0.6);
  for (let i = 0; i < rearFoliageCount; i++) {
    // Place foliage in the middle-lower area, close to where stems converge
    // and radiating outward along stem-like rays
    const stemAngle = random() * Math.PI * 2;
    const stemRadius = randomRange(0.05, 0.25);
    const x = bouquetCX + Math.cos(stemAngle) * stemRadius;
    const y = bouquetCY + Math.sin(stemAngle) * stemRadius * 0.7 + randomRange(-0.05, 0.15);
    if (!insideSilhouette(x, y, -0.02)) continue;

    flowers.push({
      id: `foliage-r-${idCounter++}`,
      type: 'foliage',
      x,
      y,
      scale: randomRange(0.55, 0.9),
      rotation: randomRange(-30, 30),
      depthLayer: 0,
      color: randomChoice(palette.foliageColors),
      colorAlt: randomChoice(palette.foliageColors),
      variant: randomInt(0, 3),
    });
  }

  // ── Layer 2: Major Peonies (focal flowers) ──
  const peonyFlowers: FlowerInstance[] = [];
  for (let i = 0; i < peonyCount; i++) {
    const region = {
      cx: bouquetCX + randomRange(-0.12, 0.12),
      cy: bouquetCY + randomRange(-0.1, 0.08),
      rx: 0.28,
      ry: 0.22,
    };
    const pos = tryPlaceFlower('peony', region, 0.22, [
      ...flowers.filter((f) => f.type !== 'foliage'),
      ...peonyFlowers,
    ]);
    if (!pos) continue;

    const flower: FlowerInstance = {
      id: `peony-${idCounter++}`,
      type: 'peony',
      x: pos.x,
      y: pos.y,
      scale: randomRange(0.85, 1.2),
      rotation: randomRange(-15, 15),
      depthLayer: 1,
      color: randomChoice(palette.peonyColors),
      colorAlt: randomChoice(palette.peonyColors),
      variant: randomInt(0, 2),
    };
    peonyFlowers.push(flower);
    flowers.push(flower);
  }

  // ── Layer 3: Middle Foliage (between flowers, along stems) ──
  const midFoliageCount = Math.floor(foliageCount * 0.25);
  for (let i = 0; i < midFoliageCount; i++) {
    // Place foliage between the convergence point and flowers
    const stemAngle = random() * Math.PI * 2;
    const stemRadius = randomRange(0.08, 0.22);
    const x = bouquetCX + Math.cos(stemAngle) * stemRadius;
    const y = bouquetCY + Math.sin(stemAngle) * stemRadius * 0.7 + randomRange(0.0, 0.12);
    if (!insideSilhouette(x, y, -0.02)) continue;

    flowers.push({
      id: `foliage-m-${idCounter++}`,
      type: 'foliage',
      x,
      y,
      scale: randomRange(0.45, 0.8),
      rotation: randomRange(-30, 30),
      depthLayer: 1,
      color: randomChoice(palette.foliageColors),
      colorAlt: randomChoice(palette.foliageColors),
      variant: randomInt(0, 3),
    });
  }

  // ── Layer 4: Lilies (edges, spread out) ──
  const lilyFlowers: FlowerInstance[] = [];
  for (let i = 0; i < lilyCount; i++) {
    const angle = randomRange(0, Math.PI * 2);
    const radius = randomRange(0.15, 0.3);
    const x = bouquetCX + Math.cos(angle) * radius;
    const y = bouquetCY + Math.sin(angle) * radius;
    if (!insideSilhouette(x, y, -0.04)) continue;

    let tooClose = false;
    const allExisting = [...flowers.filter((f) => f.type !== 'foliage'), ...lilyFlowers];
    for (const f of allExisting) {
      const dx = x - f.x;
      const dy = y - f.y;
      if (Math.sqrt(dx * dx + dy * dy) < 0.16) {
        tooClose = true;
        break;
      }
    }
    if (tooClose) continue;

    const flower: FlowerInstance = {
      id: `lily-${idCounter++}`,
      type: 'lily',
      x,
      y,
      scale: randomRange(0.8, 1.15),
      rotation: randomRange(-25, 25),
      depthLayer: 1,
      color: randomChoice(palette.lilyColors),
      colorAlt: palette.accentPink,
      variant: randomInt(0, 2),
    };
    lilyFlowers.push(flower);
    flowers.push(flower);
  }

  // ── Layer 5: Tulips (vertical accent clusters) ──
  const tulipFlowers: FlowerInstance[] = [];

  // Generate 2 clusters for tulips
  const numClusters = 2;
  type Cluster = { cx: number; cy: number };
  const clusters: Cluster[] = [];

  for (let c = 0; c < numClusters; c++) {
    const cx = bouquetCX + randomRange(-0.2, 0.2);
    const cy = bouquetCY + randomRange(-0.15, 0.12);
    if (insideSilhouette(cx, cy, 0.04)) {
      clusters.push({ cx, cy });
    }
  }

  const tulipsPerCluster = Math.ceil(tulipCount / clusters.length);
  for (const cluster of clusters) {
    const count = randomInt(
      Math.max(2, tulipsPerCluster - 1),
      tulipsPerCluster + 1,
    );
    for (let i = 0; i < count && tulipFlowers.length < tulipCount; i++) {
      const offsetX = randomRange(-0.06, 0.06);
      const offsetY = randomRange(-0.08, 0.04);
      const x = cluster.cx + offsetX;
      const y = cluster.cy + offsetY;

      if (!insideSilhouette(x, y, 0.02)) continue;

      let tooClose = false;
      for (const f of [
        ...peonyFlowers,
        ...lilyFlowers,
        ...tulipFlowers,
      ]) {
        if (f.type === 'foliage') continue;
        const dx = x - f.x;
        const dy = y - f.y;
        if (Math.sqrt(dx * dx + dy * dy) < 0.12) {
          tooClose = true;
          break;
        }
      }
      if (tooClose) continue;

      const flower: FlowerInstance = {
        id: `tulip-${idCounter++}`,
        type: 'tulip',
        x,
        y,
        scale: randomRange(0.6, 0.9),
        rotation: randomRange(-12, 12),
        depthLayer: 2,
        color: randomChoice(palette.tulipColors),
        colorAlt: randomChoice(palette.tulipColors),
        variant: randomInt(0, 2),
      };
      tulipFlowers.push(flower);
      flowers.push(flower);
    }
  }

  // Fill any remaining tulips not placed
  while (tulipFlowers.length < tulipCount) {
    const region = {
      cx: bouquetCX + randomRange(-0.15, 0.15),
      cy: bouquetCY + randomRange(-0.12, 0.1),
      rx: 0.25,
      ry: 0.2,
    };
    const pos = tryPlaceFlower('tulip', region, 0.12, [
      ...flowers.filter((f) => f.type !== 'foliage'),
      ...tulipFlowers,
    ]);
    if (!pos) break;

    const flower: FlowerInstance = {
      id: `tulip-${idCounter++}`,
      type: 'tulip',
      x: pos.x,
      y: pos.y,
      scale: randomRange(0.6, 0.9),
      rotation: randomRange(-12, 12),
      depthLayer: 2,
      color: randomChoice(palette.tulipColors),
      colorAlt: randomChoice(palette.tulipColors),
      variant: randomInt(0, 2),
    };
    tulipFlowers.push(flower);
    flowers.push(flower);
  }

  // ── Layer 6: Front Foliage (lower zone, near stems) ──
  const frontFoliageCount = foliageCount - rearFoliageCount - midFoliageCount;
  for (let i = 0; i < frontFoliageCount; i++) {
    const stemAngle = random() * Math.PI * 2;
    const stemRadius = randomRange(0.03, 0.18);
    const x = bouquetCX + Math.cos(stemAngle) * stemRadius;
    const y = bouquetCY + Math.sin(stemAngle) * stemRadius * 0.6 + randomRange(0.03, 0.18);
    if (!insideSilhouette(x, y, -0.02)) continue;

    flowers.push({
      id: `foliage-f-${idCounter++}`,
      type: 'foliage',
      x,
      y,
      scale: randomRange(0.4, 0.7),
      rotation: randomRange(-25, 25),
      depthLayer: 2,
      color: randomChoice(palette.foliageColors),
      colorAlt: randomChoice(palette.foliageColors),
      variant: randomInt(0, 3),
    });
  }

  // ── Sort by depth layer ──
  flowers.sort((a, b) => a.depthLayer - b.depthLayer);

  // ── Generate Stems ──
  const stems: StemData[] = [];
  const convergenceX = bouquetCX + randomRange(-0.02, 0.02);
  const convergenceY = bouquetCY + bouquetH * 0.52;
  const flowerTypesForStems: string[] = ['tulip', 'peony', 'lily', 'foliage'];

  for (const flower of flowers) {
    if (!flowerTypesForStems.includes(flower.type)) continue;

    const startX = convergenceX + randomRange(-0.03, 0.03);
    const startY = convergenceY;
    const endX = flower.x;
    const endY = flower.y - 0.02;

    const midX = (startX + endX) / 2 + randomRange(-0.03, 0.03);
    const midY = (startY + endY) / 2;

    stems.push({
      id: `stem-${flower.id}`,
      x1: startX,
      y1: startY,
      x2: endX,
      y2: endY,
      cx: midX,
      cy: midY,
    });
  }

  // ── Generate Wrapping ──
  const wrapPath = generateWrappingPath(silhouette);

  // ── Generate Ribbon ──
  const ribbon: RibbonData = {
    x: convergenceX + randomRange(-0.01, 0.01),
    y: convergenceY + randomRange(-0.02, -0.005),
    width: randomRange(0.06, 0.1),
    rotation: randomRange(-8, 8),
    color: randomChoice([palette.accentPink, '#E8879B', '#D4889B']),
  };

  return {
    flowers,
    stems,
    wrapping: { path: wrapPath },
    ribbon,
    palette,
  };
}

function generateWrappingPath(silhouette: SilhouetteParams): string {
  // Create a wrapping paper shape that follows the bouquet silhouette
  const cx = 0.5;
  const cy = 0.45;
  const w = silhouette.width / 2;
  const h = silhouette.height / 2;
  const waist = silhouette.waistRatio;

  // Points around the wrapping
  const topY = cy - h * 0.78;
  const bottomY = cy + h * 0.58;
  const midY = cy + h * 0.15;

  // Width at different heights
  const topW = w * 0.9;
  const midW = w * 0.95;
  const waistW = w * waist * 1.05;
  const bottomW = w * waist * 0.65;

  const leftTop = { x: cx - topW, y: topY };
  const rightTop = { x: cx + topW, y: topY };
  const leftMid = { x: cx - midW, y: midY };
  const rightMid = { x: cx + midW, y: midY };
  const leftWaist = { x: cx - waistW, y: cy + h * 0.28 };
  const rightWaist = { x: cx + waistW, y: cy + h * 0.28 };
  const leftBot = { x: cx - bottomW, y: bottomY };
  const rightBot = { x: cx + bottomW, y: bottomY };

  return `M ${leftTop.x},${leftTop.y} 
    C ${leftMid.x},${topY + (midY - topY) * 0.4} ${leftMid.x},${midY - (midY - topY) * 0.4} ${leftMid.x},${midY}
    C ${leftWaist.x},${midY + (cy + h * 0.28 - midY) * 0.4} ${leftWaist.x},${cy + h * 0.28 - (cy + h * 0.28 - midY) * 0.4} ${leftWaist.x},${cy + h * 0.28}
    L ${leftBot.x},${bottomY}
    L ${rightBot.x},${bottomY}
    L ${rightWaist.x},${cy + h * 0.28}
    C ${rightWaist.x},${cy + h * 0.28 - (cy + h * 0.28 - midY) * 0.4} ${rightMid.x},${midY + (cy + h * 0.28 - midY) * 0.4} ${rightMid.x},${midY}
    C ${rightMid.x},${topY + (midY - topY) * 0.4} ${rightTop.x},${midY - (midY - topY) * 0.4} ${rightTop.x},${topY}
    Z`;
}