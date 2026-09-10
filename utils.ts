export interface ClickConfig {
  interval: number;
  button: 'left' | 'right' | 'middle';
  iterations: number;
  jitter: number;
}

export interface ClickState {
  isActive: boolean;
  count: number;
  lastClick: number;
}

export const validateConfig = (config: Partial<ClickConfig>): ClickConfig => {
  return {
    interval: Math.max(10, config.interval ?? 100),
    button: config.button ?? 'left',
    iterations: Math.max(0, config.iterations ?? 0),
    jitter: Math.max(0, Math.min(100, config.jitter ?? 0)),
  };
};

export const calculateNextDelay = (base: number, jitter: number): number => {
  if (jitter <= 0) return base;
  const variance = base * (jitter / 100);
  return base + (Math.random() * 2 * variance - variance);
};

export const formatClickRate = (interval: number): string => {
  return `${(1000 / interval).toFixed(2)} clicks/sec`;
};