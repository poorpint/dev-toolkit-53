export interface ClickEvent {
  x: number;
  y: number;
  interval: number;
}

export class AutoClickerService {
  private intervalId: NodeJS.Timeout | null = null;
  private active: boolean = false;

  constructor(private config: ClickEvent) {}

  public toggle(): void {
    this.active = !this.active;
    this.active ? this.start() : this.stop();
  }

  private start(): void {
    this.intervalId = setInterval(() => {
      this.executeClick();
    }, this.config.interval);
  }

  private stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private executeClick(): void {
    const { x, y } = this.config;
    process.stdout.write(`Click event at (${x}, ${y})\n`);
  }

  public isActive(): boolean {
    return this.active;
  }
}