import { createLogger, format, transports } from 'winston';
import * as path from 'path';

const logDirectory = path.join(__dirname, '../logs');

const transport = new transports.File({
  filename: path.join(logDirectory, 'app-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    transport,
    new transports.Console(),
  ],
});

export const logInfo = (message: string) => logger.info(message);
export const logError = (message: string) => logger.error(message);
export const logWarning = (message: string) => logger.warn(message);
