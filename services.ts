export interface RetryOptions {
  maxRetries?: number;
  delayMs?: number;
  backoffFactor?: number;
}

export class NetworkService {
  private static async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public static async fetchWithRetry<T>(
    fn: () => Promise<T>,
    options: RetryOptions = {}
  ): Promise<T> {
    const { maxRetries = 3, delayMs = 500, backoffFactor = 2 } = options;
    let currentDelay = delayMs;
    let lastError: unknown;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        if (attempt === maxRetries) {
          break;
        }
        await this.sleep(currentDelay);
        currentDelay *= backoffFactor;
      }
    }

    throw new Error(
      `Network operation failed after ${maxRetries} attempts: ${
        lastError instanceof Error ? lastError.message : String(lastError)
      }`
    );
  }

  public static async syncClickPresets(
    endpoint: string,
    payload: Record<string, unknown>
  ): Promise<Response> {
    return this.fetchWithRetry(async () => {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
      }

      return response;
    });
  }
}
