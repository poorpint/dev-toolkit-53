export interface Position {
  x: number;
  y: number;
}
export interface ClickData {
  position: Position;
  delayMs: number;
  button: number;
}
export interface AutoclickerConfig {
  clicks: ClickData[];
  repeat: number;
  speed: number;
  randomize: boolean;
}
export function handleAutoclickerData(rawData: unknown): AutoclickerConfig | null {
  if (!rawData || typeof rawData !== 'object') {
    return null;
  }
  const data = rawData as Record<string, unknown>;
  const clicks: ClickData[] = [];
  if (Array.isArray(data.clicks)) {
    for (const item of data.clicks) {
      if (item && typeof item === 'object') {
        const clickItem = item as Record<string, unknown>;
        if (typeof clickItem.x === 'number' && typeof clickItem.y === 'number' &&
            typeof clickItem.delay === 'number' && typeof clickItem.button === 'number') {
          clicks.push({ position: { x: clickItem.x, y: clickItem.y }, delayMs: clickItem.delay, button: clickItem.button });
        }
      }
    }
  }
  const repeat = typeof data.repeat === 'number' && data.repeat > 0 ? data.repeat : 1;
  const speed = typeof data.speed === 'number' && data.speed > 0 ? data.speed : 100;
  const randomize = typeof data.randomize === 'boolean' ? data.randomize : false;
  if (clicks.length === 0) {
    return null;
  }
  return { clicks, repeat, speed, randomize };
}
export function serializeAutoclickerData(config: AutoclickerConfig): string {
  return JSON.stringify({ clicks: config.clicks.map(c => ({ x: c.position.x, y: c.position.y, delay: c.delayMs, button: c.button })), repeat: config.repeat, speed: config.speed, randomize: config.randomize });
}
export function deserializeAutoclickerData(json: string): AutoclickerConfig | null {
  try {
    const parsed = JSON.parse(json);
    return handleAutoclickerData(parsed);
  } catch (error) {
    return null;
  }
}
export function adjustClickDelays(config: AutoclickerConfig, factor: number): AutoclickerConfig {
  if (factor <= 0) {
    return config;
  }
  return { ...config, clicks: config.clicks.map(click => ({ ...click, delayMs: Math.max(0, Math.floor(click.delayMs * factor)) })) };
}