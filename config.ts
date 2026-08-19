import fs from 'fs';
import path from 'path';

interface Config {  
    clickInterval: number;  
    maxClicks: number;  
    isEnabled: boolean;
}

const DEFAULT_CONFIG: Config = {  
    clickInterval: 1000,  
    maxClicks: 100,  
    isEnabled: true,
};

function loadConfig(filePath: string): Config {  
    if (!fs.existsSync(filePath)) {  
        return DEFAULT_CONFIG;  
    }
    const rawData = fs.readFileSync(filePath, 'utf-8');  
    try {  
        const config = JSON.parse(rawData);  
        return { ...DEFAULT_CONFIG, ...config };  
    } catch {  
        return DEFAULT_CONFIG;  
    }
}

const configPath = path.resolve(__dirname, 'config.json');
const config = loadConfig(configPath);
export default config;
