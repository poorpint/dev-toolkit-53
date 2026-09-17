export interface ClickTarget {
  x: number;
  y: number;
  delay: number;
}

export interface AutoclickConfig {
  jitterRange: number;
  minInterval: number;
  maxCoordinates: { width: number; height: number };
}

export function calculateJitter(delay: number, jitterRange: number): number {
  const min = Math.max(0, delay - jitterRange);
  const max = delay + jitterRange;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function validateCoordinates(
  x: number,
  y: number,
  bounds: { width: number; height: number }
): boolean {
  return x >= 0 && x <= bounds.width && y >= 0 && y <= bounds.height;
}

export function prepareClickSequence(
  targets: ClickTarget[],
  config: AutoclickConfig
): ClickTarget[] {
  return targets
    .filter(t => validateCoordinates(t.x, t.y, config.maxCoordinates))
    .map(t => {
      const actualDelay = calculateJitter(t.delay, config.jitterRange);
      return {
        x: t.x,
        y: t.y,
        delay: Math.max(config.minInterval, actualDelay)
      };
    });
}