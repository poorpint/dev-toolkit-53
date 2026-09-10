export interface ClickConfig {
  interval: number;
  button: 'left' | 'right' | 'middle';
  iterations: number | null;
}

export interface ClickState {
  isActive: boolean;
  elapsed: number;
}

export const validateConfig = (config: Partial<ClickConfig>): ClickConfig => {
  const interval = Math.max(10, config.interval ?? 100);
  const button = ['left', 'right', 'middle'].includes(config.button ?? '') 
    ? (config.button as ClickConfig['button']) 
    : 'left';
  const iterations = config.iterations !== undefined ? Math.max(0, config.iterations) : null;

  return { interval, button, iterations };
};

export const serializeState = (state: ClickState): string => {
  return JSON.stringify({
    ...state,
    timestamp: Date.now(),
  });
};

export const deserializeState = (data: string): ClickState => {
  const parsed = JSON.parse(data);
  return {
    isActive: Boolean(parsed.isActive),
    elapsed: Number(parsed.elapsed) || 0,
  };
};