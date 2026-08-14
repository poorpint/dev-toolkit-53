import fs from 'fs';
import path from 'path';
import { createLogger, format, transports } from 'winston';

const logDirectory = path.join(__dirname, 'logs');

if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.File({
            filename: path.join(logDirectory, 'combined.log'),
            maxsize: 5242880,  // 5MB
            maxFiles: '5d',
            zippedArchive: true
        }),
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        })
    ]
});

export default logger;