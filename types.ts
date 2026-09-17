export interface ClickConfig {
  delay: number;
  button: 'left' | 'right' | 'middle';
  iterations: number;
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface ClickEvent {
  timestamp: number;
  position: Coordinate;
  success: boolean;
}

export interface StateManager {
  isActive: boolean;
  toggle(): void;
  reset(): void;
}

export type ClickResult = {
  status: 'success' | 'failure';
  error?: string;
};

/**
 * Represents the current execution context for the autoclicker daemon
 */
export interface DaemonContext {
  interval: NodeJS.Timeout | null;
  config: ClickConfig;
  history: ClickEvent[];
}