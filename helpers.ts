export interface Point {
  x: number;
  y: number;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getRandomDelay(minMs: number, maxMs: number): number {
  const min = Math.min(minMs, maxMs);
  const max = Math.max(minMs, maxMs);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function applyJitter(point: Point, maxRadius: number): Point {
  if (maxRadius <= 0) return { ...point };
  const angle = Math.random() * 2 * Math.PI;
  const radius = Math.random() * maxRadius;
  return {
    x: Math.round(point.x + radius * Math.cos(angle)),
    y: Math.round(point.y + radius * Math.sin(angle))
  };
}

export function calculateCPS(clickCount: number, durationMs: number): number {
  if (durationMs <= 0) return 0;
  const cps = (clickCount / durationMs) * 1000;
  return Math.round(cps * 10) / 10;
}