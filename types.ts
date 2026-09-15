export interface ClickConfig {
  interval: number;
  button: 'left' | 'right' | 'middle';
  iterations: number | null;
  randomize: boolean;
}

export interface Coordinates {
  x: number;
  y: number;
}

export interface ClickEvent {
  timestamp: number;
  coordinates: Coordinates;
  button: string;
}

export type State = 'idle' | 'running' | 'paused';

export interface AppStatus {
  state: State;
  elapsed: number;
  clicksPerformed: number;
}

/**
 * Configuration for mouse simulation behavior
 */
export type MouseAction = {
  type: 'click' | 'hold' | 'release';
  duration?: number;
  target: Coordinates;
};

export interface Logger {
  info(message: string): void;
  error(message: string): void;
}