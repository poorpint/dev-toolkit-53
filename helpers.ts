export interface ClickConfig {
  interval: number;
  clicks: number;
  button: 'left' | 'right' | 'middle';
  coordinates?: { x: number; y: number };
}

export function validateClickConfig(config: unknown): ClickConfig {
  if (!config || typeof config !== 'object') {
    throw new Error('Configuration must be an object');
  }

  const { interval, clicks, button, coordinates } = config as Partial<ClickConfig>;

  if (typeof interval !== 'number' || interval < 10) {
    throw new Error('Interval must be at least 10ms');
  }

  if (typeof clicks !== 'number' || clicks < 0 || !Number.isInteger(clicks)) {
    throw new Error('Clicks must be a non-negative integer');
  }

  const validButtons = ['left', 'right', 'middle'];
  if (typeof button !== 'string' || !validButtons.includes(button)) {
    throw new Error("Button must be 'left', 'right', or 'middle'");
  }

  if (coordinates !== undefined) {
    if (
      typeof coordinates !== 'object' ||
      coordinates === null ||
      typeof coordinates.x !== 'number' ||
      typeof coordinates.y !== 'number' ||
      coordinates.x < 0 ||
      coordinates.y < 0
    ) {
      throw new Error('Coordinates must be valid non-negative coordinates');
    }
  }

  return {
    interval,
    clicks,
    button,
    coordinates: coordinates ? { x: coordinates.x, y: coordinates.y } : undefined
  };
}