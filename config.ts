export interface Config {
  interval: number;
  clicks: number;
  randomization: number;
}

const defaults: Config = {
  interval: 100,
  clicks: 1000,
  randomization: 0,
};

export const loadConfig = (input: Partial<Config> = {}): Config => {
  return {
    ...defaults,
    ...input,
  };
};

export const validateConfig = (config: Config): void => {
  if (config.interval < 1) {
    throw new Error('interval must be positive');
  }
  if (config.clicks < 0) {
    throw new Error('clicks cannot be negative');
  }
};
