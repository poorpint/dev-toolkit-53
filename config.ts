interface AutoclickerConfig {
  interval: number;
  clicksPerBurst: number;
  randomization: number;
}

const DEFAULT_CONFIG: AutoclickerConfig = {
  interval: 100,
  clicksPerBurst: 1,
  randomization: 0.1,
};

export const loadConfig = (overrides: Partial<AutoclickerConfig> = {}): AutoclickerConfig => ({
  ...DEFAULT_CONFIG,
  ...overrides,
});

export const validateConfig = (config: AutoclickerConfig): boolean => {
  return (
    config.interval > 0 &&
    config.clicksPerBurst > 0 &&
    config.randomization >= 0 &&
    config.randomization <= 1
  );
};