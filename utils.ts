export interface ClickConfig {
  interval: number;
  button: 'left' | 'right' | 'middle';
  iterations: number;
}

export interface ClickResult {
  success: boolean;
  timestamp: number;
  error?: string;
}

/**
 * Delays execution for a specified duration
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Validates click configuration parameters
 */
export const validateConfig = (config: ClickConfig): boolean => {
  return config.interval > 0 && config.iterations >= 0;
};

/**
 * Formats timestamp into human-readable string
 */
export const formatTimestamp = (date: Date): string => {
  return date.toISOString().replace('T', ' ').substring(0, 19);
};

/**
 * Generates jitter for click intervals
 */
export const applyJitter = (base: number, factor: number = 0.1): number => {
  const jitter = base * factor;
  return base + (Math.random() * 2 - 1) * jitter;
};