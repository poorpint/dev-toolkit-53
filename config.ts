import fs from 'fs';

interface Config {
    clickInterval: number;
    maxClicks: number;
    enabled: boolean;
}

const defaultConfig: Config = {
    clickInterval: 100,
    maxClicks: 1000,
    enabled: true,
};

function loadConfig(filePath: string): Config {
    if (!fs.existsSync(filePath)) {
        return defaultConfig;
    }
    const fileConfig = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return { ...defaultConfig, ...fileConfig };
}

export { loadConfig, Config };