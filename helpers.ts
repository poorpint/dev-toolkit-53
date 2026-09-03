/**
 * Calculates a randomized click delay in milliseconds based on clicks per second and jitter.
 *
 * @param cps - Target clicks per second.
 * @param jitterPercentage - Variance percentage (0 to 100) applied to the interval.
 * @returns Calculated delay in milliseconds.
 */
export function calculateClickDelay(cps: number, jitterPercentage: number = 0): number {
  if (cps <= 0) {
    throw new Error('Clicks per second must be greater than zero.');
  }
  const baseDelayMs = 1000 / cps;
  if (jitterPercentage <= 0) {
    return Math.round(baseDelayMs);
  }
  const maxJitter = baseDelayMs * (Math.min(jitterPercentage, 100) / 100);
  const randomOffset = (Math.random() * 2 - 1) * maxJitter;
  return Math.max(1, Math.round(baseDelayMs + randomOffset));
}

/**
 * Clamps target screen coordinates within specified viewport boundaries.
 *
 * @param x - Horizontal coordinate.
 * @param y - Vertical coordinate.
 * @param bounds - Viewport dimension boundaries.
 * @returns A tuple containing clamped [x, y] coordinates.
 */
export function clampCoordinates(
  x: number,
  y: number,
  bounds: { width: number; height: number }
): [number, number] {
  const clampedX = Math.max(0, Math.min(x, bounds.width));
  const clampedY = Math.max(0, Math.min(y, bounds.height));
  return [clampedX, clampedY];
}

/**
 * Formats a millisecond duration into a human-readable string.
 *
 * @param durationMs - Duration in milliseconds.
 * @returns Formatted time string (e.g., "1m 30s 500ms").
 */
export function formatDuration(durationMs: number): string {
  if (durationMs < 0) {
    return '0ms';
  }
  const ms = durationMs % 1000;
  const totalSeconds = Math.floor(durationMs / 1000);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60);

  const parts: string[] = [];
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0) parts.push(`${seconds}s`);
  if (ms > 0 || parts.length === 0) parts.push(`${ms}ms`);

  return parts.join(' ');
}
