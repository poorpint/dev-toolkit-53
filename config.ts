export interface ClickerConfig {
  interval: number;
  maxClicks: number;
}

export class ConfigManager {
  private static readonly MIN_INTERVAL = 10;
  private static readonly MAX_CLICKS_LIMIT = 1000000;

  public static validate(config: ClickerConfig): void {
    if (typeof config.interval !== 'number' || config.interval < this.MIN_INTERVAL) {
      throw new Error(`interval must be at least ${this.MIN_INTERVAL}ms`);
    }

    if (!Number.isInteger(config.maxClicks) || config.maxClicks <= 0) {
      throw new Error('maxClicks must be a positive integer');
    }

    if (config.maxClicks > this.MAX_CLICKS_LIMIT) {
      throw new Error(`maxClicks exceeds limit of ${this.MAX_CLICKS_LIMIT}`);
    }
  }

  public static sanitize(config: unknown): ClickerConfig {
    if (typeof config !== 'object' || config === null) {
      throw new Error('invalid configuration object');
    }

    const c = config as Record<string, unknown>;
    const validated: ClickerConfig = {
      interval: Number(c.interval),
      maxClicks: Number(c.maxClicks)
    };

    this.validate(validated);
    return validated;
  }
}