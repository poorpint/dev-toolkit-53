export interface Config {
    clickInterval: number;
    maxClicks: number;
}

export function validateConfig(config: Config): void {
    if (config.clickInterval <= 0) {
        throw new Error('Click interval must be greater than 0');
    }
    if (config.maxClicks <= 0) {
        throw new Error('Max clicks must be greater than 0');
    }
}

export function loadConfig(): Config {
    const config: Config = { clickInterval: 1000, maxClicks: 100 };
    try {
        validateConfig(config);
    } catch (error) {
        console.error(error);
        throw error;
    }
    return config;
}