export enum AutoclickerErrorCode {
  INVALID_COORDINATES = 'INVALID_COORDINATES',
  INVALID_INTERVAL = 'INVALID_INTERVAL',
  SIMULATION_FAILURE = 'SIMULATION_FAILURE',
  ALREADY_RUNNING = 'ALREADY_RUNNING',
  INVALID_MAX_CLICKS = 'INVALID_MAX_CLICKS'
}
export class AutoclickerError extends Error {
  code: AutoclickerErrorCode;
  constructor(message: string, code: AutoclickerErrorCode) {
    super(message);
    this.code = code;
    this.name = 'AutoclickerError';
  }
}
export interface ClickPosition {
  x: number;
  y: number;
}
export interface AutoclickerConfig {
  position: ClickPosition;
  intervalMs: number;
  maxClicks?: number;
}
export function validateConfig(config: AutoclickerConfig): void {
  if (config.position.x < 0 || config.position.y < 0) {
    throw new AutoclickerError('Coordinates must be non-negative', AutoclickerErrorCode.INVALID_COORDINATES);
  }
  if (config.intervalMs <= 0) {
    throw new AutoclickerError('Interval must be positive', AutoclickerErrorCode.INVALID_INTERVAL);
  }
  if (config.maxClicks !== undefined && config.maxClicks <= 0) {
    throw new AutoclickerError('Max clicks must be positive if set', AutoclickerErrorCode.INVALID_MAX_CLICKS);
  }
}
export class Autoclicker {
  private config: AutoclickerConfig;
  private running: boolean = false;
  private clickCount: number = 0;
  constructor(config: AutoclickerConfig) {
    validateConfig(config);
    this.config = config;
  }
  async start(): Promise<void> {
    if (this.running) {
      throw new AutoclickerError('Autoclicker is already running', AutoclickerErrorCode.ALREADY_RUNNING);
    }
    this.running = true;
    this.clickCount = 0;
    try {
      while (this.running) {
        await this.simulateClick();
        this.clickCount++;
        if (this.config.maxClicks !== undefined && this.clickCount >= this.config.maxClicks) {
          this.running = false;
          break;
        }
        await new Promise(resolve => setTimeout(resolve, this.config.intervalMs));
      }
    } catch (err) {
      this.running = false;
      if (err instanceof AutoclickerError) {
        throw err;
      }
      throw new AutoclickerError('Unexpected error during click', AutoclickerErrorCode.SIMULATION_FAILURE);
    }
  }
  stop(): void {
    this.running = false;
  }
  getClickCount(): number {
    return this.clickCount;
  }
  private async simulateClick(): Promise<void> {
    if (Math.random() < 0.05) {
      throw new AutoclickerError('Failed to simulate click', AutoclickerErrorCode.SIMULATION_FAILURE);
    }
  }
}