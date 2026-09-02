export interface Target {
  id: string;
  element: HTMLElement;
  intervalMs: number;
}

export class AutoClickerService {
  private targets: Target[] = [];
  private lastClick: Map<string, number> = new Map();
  private timer: number | null = null;
  private running: boolean = false;

  addTarget(target: Target): void {
    this.targets.push(target);
    this.lastClick.set(target.id, 0);
  }

  start(): void {
    if (this.running) {
      return;
    }
    this.running = true;
    this.scheduleTick();
  }

  private scheduleTick(): void {
    if (!this.running) {
      return;
    }
    this.timer = window.setTimeout(() => {
      this.tick();
      this.scheduleTick();
    }, 5);
  }

  private tick(): void {
    const now = Date.now();
    this.targets.forEach((target) => {
      const last = this.lastClick.get(target.id) || 0;
      if (now - last >= target.intervalMs) {
        target.element.click();
        this.lastClick.set(target.id, now);
      }
    });
  }

  stop(): void {
    this.running = false;
    if (this.timer !== null) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }

  removeTarget(id: string): void {
    this.targets = this.targets.filter((t) => t.id !== id);
    this.lastClick.delete(id);
  }
}