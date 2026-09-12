export interface RetryOptions {
  retries: number;
  delay: number;
  backoffFactor?: number;
  shouldRetry?: (error: any) => boolean;
}

export async function retry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = { retries: 3, delay: 1000, backoffFactor: 2 }
): Promise<T> {
  const { retries, delay, backoffFactor = 1, shouldRetry } = options;
  let currentDelay = delay;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      const isLastAttempt = attempt === retries;
      const userShouldRetry = shouldRetry ? shouldRetry(error) : true;

      if (isLastAttempt || !userShouldRetry) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, currentDelay));
      currentDelay *= backoffFactor;
    }
  }
  throw new Error("Retry limit exceeded");
}

export async function sendTelemetry(url: string, data: Record<string, unknown>): Promise<Response> {
  return retry(
    async () => {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response;
    },
    { retries: 5, delay: 500, backoffFactor: 1.5 }
  );
}