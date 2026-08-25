export interface AutoclickerOptions {
  delay: number;
  maxClicks: number;
  x: number;
  y: number;
  randomFactor: number;
}

export type Coordinates = {
  x: number;
  y: number;
};

export function getRandomizedCoordinates(options: AutoclickerOptions): Coordinates {
  const offset = Math.random() * options.randomFactor - options.randomFactor / 2;
  return {
    x: options.x + offset,
    y: options.y + offset
  };
}

export function shouldContinue(currentClicks: number, maxClicks: number): boolean {
  return currentClicks < maxClicks;
}

export function computeDelay(baseDelay: number, factor: number): number {
  return baseDelay * (1 + Math.random() * factor);
}

export function validateCoordinates(coords: Coordinates): boolean {
  return coords.x > 0 && coords.y > 0;
}

export function buildClickPayload(coords: Coordinates, time: number): {x: number, y: number, t: number} {
  return {x: coords.x, y: coords.y, t: time};
}

export function delayToInterval(delay: number): number {
  return Math.floor(delay / 1000);
}

export function resetCounter(): number {
  return 0;
}

export function incrementClick(count: number): number {
  return count + 1;
}

export function isClickTime(currentTime: number, nextTime: number): boolean {
  return currentTime >= nextTime;
}

export function calculateAverageDelay(delays: number[]): number {
  if (delays.length === 0) return 0;
  const sum = delays.reduce((a, b) => a + b, 0);
  return sum / delays.length;
}