export async function withRetry<T>(
  operation: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (retries <= 0) throw error;
    await new Promise((resolve) => setTimeout(resolve, delay));
    return withRetry(operation, retries - 1, delay);
  }
}

export const fetchClickConfig = async (url: string): Promise<any> => {
  return withRetry(async () => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    return response.json();
  });
};