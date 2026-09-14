export interface ClickerConfig {
  interval: number;
  button: number;
  maxClicks: number;
  randomize: boolean;
}

export const DEFAULT_CONFIG: ClickerConfig = {
  interval: 100,
  button: 0,
  maxClicks: 1000,
  randomize: true,
};

export const validateConfig = (config: Partial<ClickerConfig>): ClickerConfig => {
  return {
    ...DEFAULT_CONFIG,
    ...config,
  };
};

export const getClickDelay = (base: number, randomize: boolean): number => {
  if (!randomize) return base;
  const jitter = Math.floor(Math.random() * 50);
  return Math.max(10, base + (Math.random() > 0.5 ? jitter : -jitter));
};