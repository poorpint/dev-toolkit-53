export interface Point {
  x: number;
  y: number;
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getRandomDelay(baseDelay: number, variance: number): number {
  const min = Math.max(0, baseDelay - variance);
  const max = baseDelay + variance;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function applyJitter(point: Point, maxJitter: number): Point {
  if (maxJitter <= 0) return { ...point };
  const dx = Math.floor(Math.random() * (maxJitter * 2 + 1)) - maxJitter;
  const dy = Math.floor(Math.random() * (maxJitter * 2 + 1)) - maxJitter;
  return {
    x: point.x + dx,
    y: point.y + dy
  };
}

export function generateClickSequence(
  target: Point,
  clicks: number,
  interval: number,
  jitter: number
): Array<{ point: Point; delay: number }> {
  const sequence = [];
  for (let i = 0; i < clicks; i++) {
    sequence.push({
      point: applyJitter(target, jitter),
      delay: getRandomDelay(interval, interval * 0.15)
    });
  }
  return sequence;
}