export interface ClickConfig {
  interval: number;
  button: 'left' | 'right' | 'middle';
  iterations: number | null;
  randomization: number;
}

export const validateConfig = (config: Partial<ClickConfig>): ClickConfig => {
  const defaults: ClickConfig = {
    interval: 100,
    button: 'left',
    iterations: null,
    randomization: 0,
  };

  return {
    interval: Math.max(1, config.interval ?? defaults.interval),
    button: config.button ?? defaults.button,
    iterations: config.iterations ?? defaults.iterations,
    randomization: Math.min(100, Math.max(0, config.randomization ?? defaults.randomization)),
  };
};

export const calculateDelay = (base: number, jitter: number): number => {
  const variance = base * (jitter / 100);
  return base - variance + Math.random() * (2 * variance);
};

export const serializeClickData = (data: ClickConfig): string => JSON.stringify(data);

export const deserializeClickData = (json: string): ClickConfig => {
  try {
    return JSON.parse(json) as ClickConfig;
  } catch {
    throw new Error('invalid click configuration format');
  }
};