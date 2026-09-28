// ── Bouquet Type Definitions ──

export type FlowerType = 'tulip' | 'peony' | 'lily' | 'foliage';

export interface FlowerInstance {
  id: string;
  type: FlowerType;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  depthLayer: number;
  color: string;
  colorAlt: string;
  variant: number;
}

export interface StemData {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  cx: number;
  cy: number;
}

export interface WrappingData {
  path: string;
}

export interface RibbonData {
  x: number;
  y: number;
  width: number;
  rotation: number;
  color: string;
}

export interface FlowerPalette {
  tulipColors: string[];
  peonyColors: string[];
  lilyColors: string[];
  foliageColors: string[];
  accentPink: string;
  cream: string;
}

export interface SilhouetteParams {
  width: number;
  height: number;
  waistRatio: number;
  asymmetry: number;
  topRoundness: number;
}

export interface GeneratedBouquet {
  flowers: FlowerInstance[];
  stems: StemData[];
  wrapping: WrappingData;
  ribbon: RibbonData;
  palette: FlowerPalette;
}

export type AppState = 'opening' | 'main' | 'success';