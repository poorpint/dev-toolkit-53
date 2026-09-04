export interface Position {
  x: number;
  y: number;
}

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getRandomDelay = (baseDelay: number, variance: number): number => {
  const min = Math.max(0, baseDelay - variance);
  const max = baseDelay + variance;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getJitteredPosition = (pos: Position, maxRadius: number): Position => {
  if (maxRadius <= 0) return { ...pos };
  const angle = Math.random() * 2 * Math.PI;
  const radius = Math.random() * maxRadius;
  return {
    x: Math.round(pos.x + radius * Math.cos(angle)),
    y: Math.round(pos.y + radius * Math.sin(angle))
  };
};

export const calculateClicksPerSecond = (intervalMs: number): number => {
  if (intervalMs <= 0) return 0;
  return parseFloat((1000 / intervalMs).toFixed(2));
};