export interface ClickEvent {
    target: HTMLElement;
    delay: number;
    duration: number;
}

export type ClickerState = 'active' | 'paused' | 'stopped';

export interface Config {
    clickInterval: number;
    maxClicks: number;
    randomDelay: boolean;
}

export interface PerformanceMetrics {
    totalClicks: number;
    clickRate: number;
}

export interface AutoClicker {
    start(config: Config): void;
    stop(): void;
    pause(): void;
    resume(): void;
    getMetrics(): PerformanceMetrics;
}

export function createAutoClicker(): AutoClicker {
    let state: ClickerState = 'stopped';
    let totalClicks = 0;
    let intervalId: NodeJS.Timeout | null = null;

    return {
        start(config: Config) {
            if (state === 'active') return;
            state = 'active';
            totalClicks = 0;
            intervalId = setInterval(() => {
                if (totalClicks < config.maxClicks) {
                    document.dispatchEvent(new Event('click'));
                    totalClicks++;
                } else {
                    this.stop();
                }
            }, config.clickInterval);
        },
        stop() {
            state = 'stopped';
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        },
        pause() {
            state = 'paused';
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        },
        resume() {
            if (state === 'paused') {
                state = 'active';
                this.start({ clickInterval: 100, maxClicks: 1000, randomDelay: false });
            }
        },
        getMetrics() {
            return { totalClicks, clickRate: totalClicks / (totalClicks > 0 ? (Date.now() / 1000) : 1)};
        }
    };
}