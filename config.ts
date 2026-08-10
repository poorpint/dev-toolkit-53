import fs from 'fs';
import path from 'path';

interface Config {  port: number;  host: string;}
const defaultConfig: Config = {  port: 3000,  host: 'localhost',};

function loadConfig(filePath: string): Config {
  const fullPath = path.resolve(__dirname, filePath);
  if (!fs.existsSync(fullPath)) return defaultConfig;
  const config = JSON.parse(fs.readFileSync(fullPath, 'utf-8')) as Partial<Config>;
  return { ...defaultConfig, ...config };
}

export { loadConfig, Config };