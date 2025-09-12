import pino from 'pino';

export const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    transport: {
        target: 'pino-pretty', // konsolda okunabilsin
        options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname' //fazla bilgileri gizle
        }
    }
});