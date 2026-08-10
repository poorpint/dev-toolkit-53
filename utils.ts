export async function retry<T>(fn: () => Promise<T>, retries: number, delay: number): Promise<T> {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (i === retries - 1) throw error;
            await new Promise(res => setTimeout(res, delay));
        }
    }
}

export const fetchWithRetry = async (url: string, options: RequestInit = {}, retries = 3, delay = 1000): Promise<Response> => {
    return await retry(() => fetch(url, options), retries, delay);
};