export type ClickButton = 'left' | 'right' | 'middle';

export interface ClickCoordinates {
  x: number;
  y: number;
}

export interface ClickTarget {
  type: 'fixed' | 'cursor';
  coordinates?: ClickCoordinates;
}

export interface ClickInterval {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export interface AutoclickerConfig {
  interval: ClickInterval;
  button: ClickButton;
  clickType: 'single' | 'double';
  repeatLimit: number;
  target: ClickTarget;
}

export type AutoclickerStatus = 'idle' | 'running' | 'paused';

export interface AutoclickerState {
  status: AutoclickerStatus;
  clicksCompleted: number;
  elapsedTime: number;
}