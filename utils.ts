export interface ClickCoordinates {
  x: number;
  y: number;
}

export interface ClickOptions {
  interval: number;
  iterations?: number;
}

/**
 * Delays execution for a specified duration in milliseconds.
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Validates screen coordinates within bound constraints.
 */
export const validateCoordinates = (coords: ClickCoordinates, maxWidth: number, maxHeight: number): boolean => {
  return (
    coords.x >= 0 &&
    coords.x <= maxWidth &&
    coords.y >= 0 &&
    coords.y <= maxHeight
  );
};

/**
 * Calculates the dynamic interval based on jitter factors.
 */
export const getJitteredInterval = (base: number, variance: number): number => {
  const jitter = (Math.random() * 2 - 1) * variance;
  return Math.max(0, base + jitter);
};

/**
 * Formats click sequence metadata for logging purposes.
 */
export const formatSequenceSummary = (options: ClickOptions): string => {
  return `Sequence initialized: ${options.interval}ms interval, ${options.iterations ?? 'infinite'} iterations`;
};