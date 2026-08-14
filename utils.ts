export const retryOperation = async <T>(operation: () => Promise<T>, retries: number, delay: number): Promise<T> => {
    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            return await operation();
        } catch (error) {
            if (attempt < retries - 1) {
                await new Promise(res => setTimeout(res, delay));
            } else {
                throw error;
            }
        }
    }
};

export const fetchWithRetry = async (url: string, options: RequestInit = {}, retries: number = 3, delay: number = 1000): Promise<Response> => {
    return retryOperation(() => fetch(url, options), retries, delay);
};
