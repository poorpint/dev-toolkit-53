interface ClickConfig {
  interval: number;
  clicks: number;
}

export class AutoClickerService {
  public process(config: unknown): void {
    const validated = this.validate(config);
    if (!validated) {
      throw new Error('invalid configuration parameters');
    }

    const { interval, clicks } = validated;
    for (let i = 0; i < clicks; i++) {
      setTimeout(() => this.executeClick(), i * interval);
    }
  }

  private validate(config: unknown): ClickConfig | null {
    if (typeof config !== 'object' || config === null) return null;
    const { interval, clicks } = config as any;

    if (
      typeof interval !== 'number' || interval < 10 ||
      typeof clicks !== 'number' || clicks < 1
    ) {
      return null;
    }

    return { interval, clicks };
  }

  private executeClick(): void {
    // Native click trigger logic
  }
}