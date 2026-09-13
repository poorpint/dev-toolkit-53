export interface AppConfig {
  interval: number;
  clicksPerSecond: number;
  autoStart: boolean;
}

const DEFAULT_CONFIG: AppConfig = {
  interval: 100,
  clicksPerSecond: 10,
  autoStart: false,
};

export const loadConfig = (overrides: Partial<AppConfig> = {}): AppConfig => {
  const stored = localStorage.getItem('dt53_config');
  const parsed = stored ? JSON.parse(stored) : {};
  return { ...DEFAULT_CONFIG, ...parsed, ...overrides };
};

export const saveConfig = (config: AppConfig): void => {
  localStorage.setItem('dt53_config', JSON.stringify(config));
};