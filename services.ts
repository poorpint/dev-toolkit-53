export async function withRetry<T>(operation: () => Promise<T>, retries: number = 3, delay: number = 1000): Promise<T> {
  let lastError: unknown;

  for (let i = 0; i < retries; i++) {
    try {
      return await operation();
    } catch (err) {
      lastError = err;
      if (i < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }

  throw lastError;
}

export const fetchWithRetry = async (url: string, options?: RequestInit): Promise<Response> => {
  return withRetry(async () => {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  });
};