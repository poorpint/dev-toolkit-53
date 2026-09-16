const requestFrame = typeof requestAnimationFrame !== 'undefined'
  ? requestAnimationFrame
  : (cb: (time: number) => void) => setTimeout(() => cb(performance.now()), 16);

export class PreciseClickScheduler {
  private active = false;
  private lastTick = 0;

  constructor(
    private readonly intervalMs: number,
    private readonly callback: () => void
  ) {}

  public start(): void {
    if (this.active) return;
    this.active = true;
    this.lastTick = performance.now();
    requestFrame(this.loop);
  }

  public stop(): void {
    this.active = false;
  }

  private loop = (now: number): void => {
    if (!this.active) return;

    const delta = now - this.lastTick;

    if (delta >= this.intervalMs) {
      const ticks = Math.floor(delta / this.intervalMs);
      for (let i = 0; i < ticks; i++) {
        if (!this.active) break;
        this.callback();
      }
      this.lastTick = now - (delta % this.intervalMs);
    }

    if (this.active) {
      requestFrame(this.loop);
    }
  };
}