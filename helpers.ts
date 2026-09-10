export interface ClickConfig {
  interval: number;
  button: 'left' | 'right' | 'middle';
  iterations: number;
}

export interface Coordinates {
  x: number;
  y: number;
}

/**
 * Delays execution for a specified duration in milliseconds.
 */
export const sleep = (ms: number): Promise<void> => 
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Validates click coordinates against screen boundaries.
 */
export const isWithinBounds = (
  pos: Coordinates, 
  width: number, 
  height: number
): boolean => {
  return pos.x >= 0 && pos.x <= width && pos.y >= 0 && pos.y <= height;
};

/**
 * Calculates the dynamic interval based on jitter factor.
 */
export const calculateJitter = (base: number, factor: number): number => {
  const variance = base * factor;
  return base + (Math.random() * 2 * variance - variance);
};

/**
 * Formats click statistics for logging output.
 */
export const formatStats = (count: number, duration: number): string => {
  const rate = (count / (duration / 1000)).toFixed(2);
  return `clicks: ${count}, rate: ${rate} cps`;
};