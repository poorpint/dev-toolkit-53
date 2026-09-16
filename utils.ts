export const createBuffer = (size: number): Uint32Array => new Uint32Array(size);

export const batchProcess = <T>(
  items: T[],
  callback: (item: T) => void,
  chunkSize: number = 100
): void => {
  let i = 0;
  const len = items.length;
  while (i < len) {
    const end = Math.min(i + chunkSize, len);
    for (let j = i; j < end; j++) {
      callback(items[j]);
    }
    i = end;
  }
};

export const memoize = <T, R>(fn: (arg: T) => R): ((arg: T) => R) => {
  const cache = new Map<T, R>();
  return (arg: T): R => {
    if (cache.has(arg)) return cache.get(arg)!;
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
};

export const throttle = (fn: Function, ms: number) => {
  let last = 0;
  return (...args: any[]) => {
    const now = performance.now();
    if (now - last >= ms) {
      last = now;
      fn(...args);
    }
  };
};