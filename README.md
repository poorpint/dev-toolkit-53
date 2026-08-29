# dev-toolkit-53

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

dev-toolkit-53 is a lightweight TypeScript autoclicker designed for developers to handle automated mouse interactions. The tool focuses on precision and reliability for use in UI testing, script development, and workflow automation.

## Features

- Sub-millisecond click interval control with drift compensation
- Configurable click types including left-click, right-click, and double-click
- Pattern-based execution using simple configuration files
- Safe operation with maximum duration limits and instant abort via ESC key

## Installation

```bash
git clone https://github.com/Developer/dev-toolkit-53.git
cd dev-toolkit-53
npm install
npm run build
```

## Usage

Start autoclicking at 1 second intervals for 50 clicks:

```bash
node dist/index.js --interval 1000 --limit 50
```

Modify behavior using command line flags or a `config.json` file.