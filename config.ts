export interface ClickConfig {
  x: number;
  y: number;
  interval: number;
  totalClicks: number;
}

export function validateInput(config: ClickConfig): boolean {
  return typeof config.x === 'number' && config.x >= 0 &&
         typeof config.y === 'number' && config.y >= 0 &&
         typeof config.interval === 'number' && config.interval > 0 &&
         typeof config.totalClicks === 'number' && config.totalClicks > 0;
}

export function runMainProcessingLoop(configs: ClickConfig[]): void {
  let index = 0;
  let clickCounter = 0;
  function loop(): void {
    if (index >= configs.length) {
      return;
    }
    const currentConfig = configs[index];
    if (!validateInput(currentConfig)) {
      console.error('Invalid input detected');
      index++;
      setTimeout(loop, 0);
      return;
    }
    if (clickCounter >= currentConfig.totalClicks) {
      clickCounter = 0;
      index++;
      setTimeout(loop, 0);
      return;
    }
    console.log('Click ' + (clickCounter + 1) + ' at ' + currentConfig.x + ',' + currentConfig.y);
    clickCounter++;
    setTimeout(loop, currentConfig.interval);
  }
  loop();
}