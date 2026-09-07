export interface ClickConfig {
  delay: number;
  button: 'left' | 'right' | 'middle';
  iterations: number;
}

export interface ClickState {
  isActive: boolean;
  elapsed: number;
}

export const validateConfig = (config: ClickConfig): boolean => {
  return config.delay >= 0 && config.iterations >= -1;
};

export const formatDuration = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  return `${minutes.toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
};

export const createDefaultConfig = (): ClickConfig => ({
  delay: 100,
  button: 'left',
  iterations: -1
});