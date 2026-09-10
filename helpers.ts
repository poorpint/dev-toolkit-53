import * as fs from 'fs';
import * as path from 'path';

interface LoggerConfig {
  logDir: string;
  maxSizeMB: number;
}

export class Logger {
  private logFile: string;
  private config: LoggerConfig;

  constructor(config: LoggerConfig) {
    this.config = config;
    if (!fs.existsSync(config.logDir)) fs.mkdirSync(config.logDir);
    this.logFile = path.join(config.logDir, 'app.log');
  }

  public log(message: string): void {
    this.rotate();
    const entry = `[${new Date().toISOString()}] ${message}\n`;
    fs.appendFileSync(this.logFile, entry);
  }

  private rotate(): void {
    if (!fs.existsSync(this.logFile)) return;
    const stats = fs.statSync(this.logFile);
    if (stats.size > this.config.maxSizeMB * 1024 * 1024) {
      const timestamp = Date.now();
      fs.renameSync(this.logFile, `${this.logFile}.${timestamp}.old`);
    }
  }
}