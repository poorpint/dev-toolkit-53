export type ClickInterval = number;

export interface ClickConfig {
  delay: ClickInterval;
  iterations: number;
}

export const validateConfig = (config: ClickConfig): boolean => {
  return config.delay > 0 && config.iterations >= 0;
};

export const formatTimestamp = (date: Date): string => {
  return date.toISOString().split('T')[1].slice(0, 8);
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const createLogger = (prefix: string) => {
  return (message: string) => console.log(`[${prefix}] ${formatTimestamp(new Date())}: ${message}`);
};