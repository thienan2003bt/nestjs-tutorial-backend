import { Injectable, ConsoleLogger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { promises as fsPromises } from 'fs';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
    async logToFile(entry: string) {
        const formattedEntry = `${Intl.DateTimeFormat('vi-VN', {
            dateStyle: 'short',
            timeStyle: 'short',
            timeZone: 'Asia/Ho_Chi_Minh',
        }).format(new Date())}\t${entry}\n`;

        const logDirectory = path.join(__dirname, '..', '..', 'logs');
        try {
            if (fs.existsSync(logDirectory) === false) {
                await fsPromises.mkdir(logDirectory);
                await fsPromises.appendFile(path.join(logDirectory, 'myLogFile.log'), formattedEntry);
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error logging to file: ' + error.message);
            }
        }
    }

    log(message: any, context?: string) {
        const entry = `${context}\t${message}`;
        this.logToFile(entry);
        super.log(entry, context);
    }

    error(message: any, stackOrContext?: string) {
        const entry = `${message}\n${stackOrContext}`;
        super.error(entry, stackOrContext);
    }
}
