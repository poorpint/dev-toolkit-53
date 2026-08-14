export interface Config {  interval: number;  clickCount: number;  autoStart: boolean;}

export const defaultConfig: Config = {  interval: 100,  clickCount: 10,  autoStart: false};

export const validateConfig = (config: Partial<Config>): config is Config => {  return typeof config.interval === 'number' && typeof config.clickCount === 'number' && typeof config.autoStart === 'boolean';};

export const loadConfig = (): Config => {  const storedConfig = localStorage.getItem('autoClickerConfig');  if (storedConfig) {    const parsedConfig = JSON.parse(storedConfig);    if (validateConfig(parsedConfig)) {      return parsedConfig;    }  }  return defaultConfig;};

export const saveConfig = (config: Config): void => {  localStorage.setItem('autoClickerConfig', JSON.stringify(config));};