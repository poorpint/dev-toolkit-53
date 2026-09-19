# dev-toolkit-53

`dev-toolkit-53` is a high-performance, cross-platform autoclicker built with TypeScript and Node.js. It leverages native OS hooks to provide precision automation for repetitive tasks with minimal system overhead.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

*   **Precision Interval Control:** Execute clicks with millisecond accuracy using non-blocking asynchronous loops.
*   **Dynamic Targeting:** Support for coordinate-based clicking or active-cursor tracking via global event listeners.
*   **Human-like Randomization:** Integrated jitter algorithm to introduce randomized offsets, mimicking organic interaction patterns.
*   **Hotkey Interruption:** Built-in listener to immediately toggle execution state using customizable keyboard shortcuts.

## Installation

Ensure you have [Node.js](https://nodejs.org/) installed (v16+ recommended). Clone the repository and install the dependencies:

```bash
git clone https://github.com/Developer/dev-toolkit-53.git
cd dev-toolkit-53
npm install
```

To build the project from source:

```bash
npm run build
```

## Usage

You can initialize a click sequence directly through the CLI or by importing the controller into your existing TypeScript projects.

**Basic CLI Execution:**
```bash
# Clicks at current cursor position every 500ms
node dist/index.js --interval 500 --mode cursor
```

** programmatic Example:**
```typescript
import { AutoClicker } from './src/core';

const bot = new AutoClicker({
  interval: 100,
  jitter: 10,
  trigger: 'F6'
});

bot.start();
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss the proposed functionality. 

## License
Distributed under the MIT License. See `LICENSE` for more information.