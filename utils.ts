export interface ClickConfig {
  interval: number;
  button: 'left' | 'right' | 'middle';
  iterations: number | null;
  randomizationMs: number;
}

export const validateConfig = (config: Partial<ClickConfig>): ClickConfig => {
  const defaults: ClickConfig = {
    interval: 100,
    button: 'left',
    iterations: null,
    randomizationMs: 0,
  };

  return {
    ...defaults,
    ...config,
    interval: Math.max(10, config.interval || defaults.interval),
    randomizationMs: Math.max(0, config.randomizationMs || defaults.randomizationMs),
  };
};

export const getNextDelay = (base: number, jitter: number): number => {
  const offset = Math.random() * jitter * 2 - jitter;
  return Math.max(1, base + offset);
};

export const formatDuration = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m ${seconds % 60}s`;
};