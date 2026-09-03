export interface ClickConfig {
  interval: number;
  duration: number;
  x: number;
  y: number;
}

export const validateClickConfig = (config: any): config is ClickConfig => {
  return (
    typeof config.interval === 'number' && config.interval > 0 &&
    typeof config.duration === 'number' && config.duration >= 0 &&
    typeof config.x === 'number' && config.x >= 0 &&
    typeof config.y === 'number' && config.y >= 0
  );
};

export const processClickLoop = (config: unknown): void => {
  if (!validateClickConfig(config)) {
    throw new Error('invalid click configuration provided');
  }

  const { interval, duration, x, y } = config;
  let elapsed = 0;

  const intervalId = setInterval(() => {
    if (elapsed >= duration) {
      clearInterval(intervalId);
      return;
    }
    console.log(`clicking at ${x}, ${y}`);
    elapsed += interval;
  }, interval);
};