export enum ClickerErrorType {
  INVALID_COORDINATES = 'INVALID_COORDINATES',
  INTERVAL_OUT_OF_BOUNDS = 'INTERVAL_OUT_OF_BOUNDS',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  SYSTEM_INTERRUPTED = 'SYSTEM_INTERRUPTED',
}

export interface ClickerError {
  type: ClickerErrorType;
  message: string;
  timestamp: number;
}

export class ClickerException extends Error {
  public readonly detail: ClickerError;

  constructor(type: ClickerErrorType, message: string) {
    super(message);
    this.detail = {
      type,
      message,
      timestamp: Date.now(),
    };
    Object.setPrototypeOf(this, ClickerException.prototype);
  }
}

export type ClickResult = { success: true } | { success: false; error: ClickerError };

export const validateCoordinates = (x: number, y: number): void => {
  if (x < 0 || y < 0) {
    throw new ClickerException(ClickerErrorType.INVALID_COORDINATES, 'Coordinates must be non-negative');
  }
};

export const validateInterval = (ms: number): void => {
  if (ms < 10) {
    throw new ClickerException(ClickerErrorType.INTERVAL_OUT_OF_BOUNDS, 'Interval too low for hardware stability');
  }
};