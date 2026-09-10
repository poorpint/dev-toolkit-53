import * as fs from 'fs';
import * as path from 'path';

export interface LoggerOptions {
  logDir: string;
  maxFileSizeByte: number;
  maxFiles: number;
}

export class LoggerService {
  private logDir: string;
  private maxFileSize: number;
  private maxFiles: number;
  private currentFile: string;

  constructor(options: LoggerOptions) {
    this.logDir = options.logDir;
    this.maxFileSize = options.maxFileSizeByte;
    this.maxFiles = options.maxFiles;
    this.currentFile = path.join(this.logDir, 'autoclicker.log');
    this.ensureDirectory();
  }

  private ensureDirectory(): void {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  private rotate(): void {
    if (!fs.existsSync(this.currentFile)) return;
    const stats = fs.statSync(this.currentFile);
    if (stats.size < this.maxFileSize) return;

    for (let i = this.maxFiles - 1; i >= 1; i--) {
      const oldPath = path.join(this.logDir, `autoclicker.${i}.log`);
      const newPath = path.join(this.logDir, `autoclicker.${i + 1}.log`);
      if (fs.existsSync(oldPath)) {
        if (i + 1 > this.maxFiles) {
          fs.unlinkSync(oldPath);
        } else {
          fs.renameSync(oldPath, newPath);
        }
      }
    }
    fs.renameSync(this.currentFile, path.join(this.logDir, 'autoclicker.1.log'));
  }

  public log(message: string, level: 'INFO' | 'WARN' | 'ERROR' = 'INFO'): void {
    this.rotate();
    const timestamp = new Date().toISOString();
    const formatted = `[${timestamp}] [${level}] ${message}\n`;
    fs.appendFileSync(this.currentFile, formatted, 'utf-utf8');
  }

  public logClick(x: number, y: number, intervalMs: number): void {
    this.log(`Click triggered at (${x}, ${y}) with interval ${intervalMs}ms`, 'INFO');
  }
}