export interface ClickerConfig {
  interval: number;
  button: 'left' | 'right';
  repeat: number | 'infinite';
}

export const DEFAULT_CONFIG: ClickerConfig = {
  interval: 100,
  button: 'left',
  repeat: 'infinite',
};

export const validateConfig = (config: Partial<ClickerConfig>): ClickerConfig => {
  return {
    interval: Math.max(10, config.interval ?? DEFAULT_CONFIG.interval),
    button: config.button ?? DEFAULT_CONFIG.button,
    repeat: config.repeat ?? DEFAULT_CONFIG.repeat,
  };
};

export type StateUpdate = {
  active: boolean;
  timestamp: number;
};

export const INITIAL_STATE: StateUpdate = {
  active: false,
  timestamp: Date.now(),
};