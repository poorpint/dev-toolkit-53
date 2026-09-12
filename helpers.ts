export const getTimestamp = (): number => performance.now();

export const throttle = <T extends (...args: any[]) => void>(fn: T, limit: number) => {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = getTimestamp();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn(...args);
    }
  };
};

export const batchProcess = <T>(items: T[], chunkSize: number, callback: (batch: T[]) => void): void => {
  for (let i = 0; i < items.length; i += chunkSize) {
    callback(items.slice(i, i + chunkSize));
  }
};

export const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new Map<string, ReturnType<T>>();
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
};

export const requestIdleCallbackPolyfill = (cb: IdleRequestCallback): number => {
  return typeof requestIdleCallback !== 'undefined' 
    ? requestIdleCallback(cb) 
    : setTimeout(() => cb({ didTimeout: false, timeRemaining: () => 1 }), 1) as any;
};