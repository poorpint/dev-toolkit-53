export interface ClickConfig {
  interval: number;
  duration: number;
  clicks: number;
}

export const validateClickConfig = (config: Partial<ClickConfig>): ClickConfig => {
  const interval = config.interval ?? 100;
  const duration = config.duration ?? 0;
  const clicks = config.clicks ?? 1;

  if (interval < 10) {
    throw new Error('Interval must be at least 10ms');
  }

  if (duration < 0) {
    throw new Error('Duration cannot be negative');
  }

  if (clicks < 0) {
    throw new Error('Click count cannot be negative');
  }

  return { interval, duration, clicks };
};

export const processClickLoop = async (config: unknown, callback: () => void): Promise<void> => {
  try {
    const validated = validateClickConfig(config as Partial<ClickConfig>);
    let count = 0;

    while (validated.clicks === 0 || count < validated.clicks) {
      callback();
      count++;
      await new Promise((resolve) => setTimeout(resolve, validated.interval));
    }
  } catch (error) {
    console.error('Processing failed:', error instanceof Error ? error.message : 'Unknown error');
  }
};