export interface ClickConfig {
  interval: number;
  button: 'left' | 'right' | 'middle';
  repeat: number;
}

export const validateClickConfig = (config: unknown): config is ClickConfig => {
  if (typeof config !== 'object' || config === null) return false;
  const { interval, button, repeat } = config as ClickConfig;
  return (
    typeof interval === 'number' && interval > 0 &&
    ['left', 'right', 'middle'].includes(button) &&
    typeof repeat === 'number' && repeat >= -1
  );
};

export const serializeConfig = (config: ClickConfig): string => {
  return JSON.stringify(config);
};

export const deserializeConfig = (data: string): ClickConfig | null => {
  try {
    const parsed = JSON.parse(data);
    return validateClickConfig(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

export const calculateTotalDelay = (config: ClickConfig): number => {
  return config.interval * (config.repeat === -1 ? 1 : config.repeat);
};