export interface ClickConfig {
  intervalMs: number;
  button: 'left' | 'right' | 'middle';
  clickType: 'single' | 'double';
  coordinates: { x: number; y: number } | null;
  repeatCount: number;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateClickConfig(config: unknown): ValidationResult {
  const errors: string[] = [];

  if (!config || typeof config !== 'object') {
    return { isValid: false, errors: ['Configuration must be a valid object'] };
  }

  const { intervalMs, button, clickType, coordinates, repeatCount } = config as Partial<ClickConfig>;

  if (typeof intervalMs !== 'number' || intervalMs < 10 || !Number.isInteger(intervalMs)) {
    errors.push('Interval must be an integer of at least 10ms');
  }

  const validButtons = ['left', 'right', 'middle'];
  if (!button || !validButtons.includes(button)) {
    errors.push("Button must be 'left', 'right', or 'middle'");
  }

  const validClickTypes = ['single', 'double'];
  if (!clickType || !validClickTypes.includes(clickType)) {
    errors.push("Click type must be 'single' or 'double'");
  }

  if (coordinates !== null && coordinates !== undefined) {
    if (
      typeof coordinates !== 'object' ||
      typeof coordinates.x !== 'number' ||
      typeof coordinates.y !== 'number' ||
      coordinates.x < 0 ||
      coordinates.y < 0 ||
      !Number.isInteger(coordinates.x) ||
      !Number.isInteger(coordinates.y)
    ) {
      errors.push('Coordinates must be an object with non-negative integers x and y');
    }
  }

  if (typeof repeatCount !== 'number' || repeatCount < 0 || !Number.isInteger(repeatCount)) {
    errors.push('Repeat count must be a non-negative integer');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}