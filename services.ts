import fs from 'fs';
import path from 'path';
import { createLogger, format, transports } from 'winston';

const logDir = path.join(__dirname, 'log');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json(),
  ),
  transports: [
    new transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      handleExceptions: true,
    }),
    new transports.File({
      filename: path.join(logDir, 'combined.log'),
      maxsize: 5242880,
      maxFiles: '5d',
      tailable: true,
    }),
  ],
});

logger.add(
  new transports.Console({
    format: format.simple(),
  })
);

export default logger;
