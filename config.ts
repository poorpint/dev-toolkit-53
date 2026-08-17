export interface NetworkOptions {
  retries: number;
  delay: number;
}

export async function retry<T>(fn: () => Promise<T>, options: NetworkOptions): Promise<T> {
  const { retries, delay } = options;
  let attempts = 0;
  while (attempts < retries) {
    try {
      return await fn();
    } catch (error) {
      attempts++;
      if (attempts === retries) throw error;
      await new Promise(res => setTimeout(res, delay));
    }
  }
  throw new Error('Max retries reached');
}