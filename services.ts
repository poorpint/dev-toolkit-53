interface ClickEvent {
  x: number;
  y: number;
  interval: number;
}

interface ClickResult {
  success: boolean;
  timestamp: number;
}

/**
 * Orchestrates the automated clicking execution lifecycle
 */
export class AutoClickerService {
  private isRunning: boolean = false;

  public async executeClick(event: ClickEvent): Promise<ClickResult> {
    this.isRunning = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, event.interval));
      return { success: true, timestamp: Date.now() };
    } catch (error) {
      return { success: false, timestamp: Date.now() };
    } finally {
      this.isRunning = false;
    }
  }

  public getStatus(): boolean {
    return this.isRunning;
  }
}

/**
 * Validates coordinate bounds for input events
 */
export const validateCoordinates = (x: number, y: number): boolean => {
  return x >= 0 && y >= 0;
};