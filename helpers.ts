export const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const generateClickJitter = (base: number, variation: number): number => {
  return base + (Math.random() * 2 - 1) * variation;
};

export const isWithinBounds = (x: number, y: number, width: number, height: number): boolean => {
  return x >= 0 && x <= width && y >= 0 && y <= height;
};

export type Point = { x: number; y: number };

export const formatTimestamp = (): string => {
  return new Date().toISOString();
};