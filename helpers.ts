export const throttledClick = (fn: () => void, interval: number) => {
  let lastExecution = 0;
  return () => {
    const now = performance.now();
    if (now - lastExecution >= interval) {
      lastExecution = now;
      fn();
    }
  };
};

export const batchExecute = <T>(tasks: (() => T)[], batchSize: number): T[] => {
  const results: T[] = [];
  for (let i = 0; i < tasks.length; i += batchSize) {
    const batch = tasks.slice(i, i + batchSize);
    results.push(...batch.map((task) => task()));
  }
  return results;
};

export const memoizeClickState = <T>(fn: (state: T) => void) => {
  let lastState: T | null = null;
  return (state: T) => {
    if (JSON.stringify(state) === JSON.stringify(lastState)) return;
    lastState = state;
    fn(state);
  };
};

export const getPerformanceMarker = () => performance.now();