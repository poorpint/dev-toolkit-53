export interface ClickConfig {
  interval: number;
  button: 'left' | 'right' | 'middle';
  iterations: number | null;
  randomization: number;
}

export const DEFAULT_CONFIG: ClickConfig = {
  interval: 100,
  button: 'left',
  iterations: null,
  randomization: 0,
};

export const validateConfig = (config: Partial<ClickConfig>): ClickConfig => {
  return {
    ...DEFAULT_CONFIG,
    ...config,
    interval: Math.max(1, config.interval || DEFAULT_CONFIG.interval),
  };
};

export const loadConfig = (key: string): ClickConfig => {
  const raw = localStorage.getItem(key);
  if (!raw) return DEFAULT_CONFIG;
  try {
    return JSON.parse(raw);
  } catch {
    return DEFAULT_CONFIG;
  }
};

export const saveConfig = (key: string, config: ClickConfig): void => {
  localStorage.setItem(key, JSON.stringify(config));
};