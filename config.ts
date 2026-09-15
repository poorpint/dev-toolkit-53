export interface AutoclickerConfig {
  clickInterval: number;
  clickType: 'single' | 'double';
  button: 'left' | 'right' | 'middle';
  hotkey: string;
  repeatLimit: number;
  cursorLock: boolean;
}

export const DEFAULT_CONFIG: AutoclickerConfig = {
  clickInterval: 100,
  clickType: 'single',
  button: 'left',
  hotkey: 'F10',
  repeatLimit: 0,
  cursorLock: false,
};

export class ConfigLoader {
  private currentConfig: AutoclickerConfig;

  constructor(initialConfig?: Partial<AutoclickerConfig>) {
    this.currentConfig = { ...DEFAULT_CONFIG, ...initialConfig };
  }

  public get(): AutoclickerConfig {
    return this.currentConfig;
  }

  public update(newConfig: Partial<AutoclickerConfig>): AutoclickerConfig {
    this.currentConfig = {
      ...this.currentConfig,
      ...newConfig,
      clickInterval: Math.max(10, newConfig.clickInterval ?? this.currentConfig.clickInterval)
    };
    return this.currentConfig;
  }
}