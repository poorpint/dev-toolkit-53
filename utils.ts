export interface ClickConfig {
  delay: number;
  button: 'left' | 'right' | 'middle';
  iterations: number | null;
}

export const validateClickConfig = (config: unknown): config is ClickConfig => {
  if (typeof config !== 'object' || config === null) return false;
  const { delay, button, iterations } = config as any;
  return (
    typeof delay === 'number' &&
    delay >= 0 &&
    ['left', 'right', 'middle'].includes(button) &&
    (iterations === null || (typeof iterations === 'number' && iterations > 0))
  );
};

export const serializeConfig = (config: ClickConfig): string => JSON.stringify(config);

export const deserializeConfig = (data: string): ClickConfig | null => {
  try {
    const parsed = JSON.parse(data);
    return validateClickConfig(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

export const calculateInterval = (delay: number, jitter: number = 0): number => {
  const drift = Math.random() * jitter;
  return Math.max(0, delay + (Math.random() > 0.5 ? drift : -drift));
};

export const formatTimestamp = (date: Date): string => {
  return date.toISOString().replace('T', ' ').slice(0, 19);
};