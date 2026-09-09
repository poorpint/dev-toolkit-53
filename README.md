# dev-toolkit-53

`dev-toolkit-53` is a high-performance, TypeScript-based autoclicker designed for rapid automation tasks and stress testing. It utilizes native OS event hooks to provide millisecond-level precision while maintaining low system resource consumption.

## Features

*   **Configurable Interval Control:** Set precise delay thresholds between clicks, ranging from 1ms to custom periodic intervals.
*   **Targeted Coordinates:** Programmatically trigger events at specific X/Y coordinates or toggle follow-mode to track the current cursor position.
*   **Advanced Trigger Sequences:** Support for infinite loops, fixed-count repetitions, and randomized jitter to mimic human interaction.
*   **Low-Level Hooking:** Leverages Node.js native bindings to ensure seamless integration across Windows, macOS, and Linux environments.

## Installation

Ensure you have [Node.js](https://nodejs.org/) (v18+) installed. Clone the repository and install the dependencies:

```bash
git clone https://github.com/Developer/dev-toolkit-53.git
cd dev-toolkit-53
npm install
```

## Basic Usage

To initialize the clicker with a 100ms interval targeting the current mouse position, use the following implementation:

```typescript
import { AutoClicker } from './src/core';

const clicker = new AutoClicker({
  interval: 100,
  jitter: 5,
  repeat: Infinity
});

// Start automation
clicker.start();

// Stop after 10 seconds
setTimeout(() => clicker.stop(), 10000);
```

## License

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.