export interface AutoClickerConfig {
  clickInterval: number;
  clickCount: number;
  targetElement: string;
}

export const defaultConfig: AutoClickerConfig = {
  clickInterval: 100,
  clickCount: 10,
  targetElement: '.target'
};

export function validateConfig(config: Partial<AutoClickerConfig>): AutoClickerConfig {
  return {
    clickInterval: config.clickInterval ?? defaultConfig.clickInterval,
    clickCount: config.clickCount ?? defaultConfig.clickCount,
    targetElement: config.targetElement ?? defaultConfig.targetElement,
  };
}

export function updateConfig(newConfig: Partial<AutoClickerConfig>): AutoClickerConfig {
  const validatedConfig = validateConfig(newConfig);
  return { ...validatedConfig };
}
