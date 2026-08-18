import axios, { AxiosError } from 'axios';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

async function retryNetworkOperation<T>(operation: () => Promise<T>): Promise<T> {
    let attempts = 0;

    while (attempts < MAX_RETRIES) {
        try {
            return await operation();
        } catch (error) {
            if (!(error instanceof AxiosError)) throw error;
            attempts++;
            if (attempts < MAX_RETRIES) {
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
            }
        }
    }

    throw new Error('Max retries exceeded');
}

export const fetchData = async (url: string) => {
    return retryNetworkOperation(() => axios.get(url));
};

export default retryNetworkOperation;