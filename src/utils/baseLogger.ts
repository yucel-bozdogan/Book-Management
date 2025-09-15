import pino from "pino";

export const baseLogger = pino({   //logger oluşturdum pinodan adı base logger
  level: "info", 
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
    },
  },
});