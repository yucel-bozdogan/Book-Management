import pino from "pino";
import logModel from "../models/log"; // artık mognoose buradan type interface oluşturcak

// singelton değil ama return olmadığından bir kere üretiyoruz 
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';
const dbTransport = async (logData: Record<string, unknown>) => {
  // db transport fonksiyonu asenkron içine LogData atıcam anahtarı string tipi belli değil 
  try {
    const level = typeof logData.level === 'number' // level nesnesi tanımladık  eğer logdata.leveli sayı ise 
      ? pino.levels.labels[logData.level as number]  // eğer sayı ise pino.levels.labels tablosunda log data leveli sayı olarak kullan
      : logData.level as string; // eğer sayı değil ise log data leveli string olarak kullan

    await logModel.create({    
      level: level,
      message: logData.message as string,
      source: logData.source as string,              
      processId: logData.processId as string,  //aldığım LogDatayı logModel nesnesine atıyorum typescript bunu ınterface olarak alcak
      traceId: logData.traceId as string,
      userId: logData.userId as string,
      metadata: logData.metadata || {},
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Failed to save log to database:', error);
  }
};

export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: isDevelopment ? {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
      singleLine: true, // Yeni eklenen
      messageFormat: '{levelLabel} {msg}', // Yeni eklenen
      customPrettifiers: {
        time: (timestamp: string) => `🕐 ${timestamp}`,
        level: (level: string) => `📊 ${level.toUpperCase()}`
      }
    }
  } : undefined, // Production'da transport yok (JSON)
  timestamp: pino.stdTimeFunctions.isoTime, // Yeni eklenen
  formatters: {
    level: (label: string) => ({ level: label }) // Yeni eklenen
  }
});

export const log = {
  info: (message: string, meta?: Record<string, unknown>) => {
    const logData = {
      level: 'info',
      message,
      source: meta?.source || 'application',
      processId: meta?.processId,
      traceId: meta?.traceId, // Yeni eklenen
      userId: meta?.userId,
      metadata: meta,
      timestamp: new Date().toISOString() // Yeni eklenen
    };
    
    logger.info(meta, message);
    dbTransport(logData);
  },
  error: (message: string, meta?: Record<string, unknown>) => {
    const logData = {
      level: 'error',
      message,
      source: meta?.source || 'application',
      processId: meta?.processId,
      traceId: meta?.traceId, 
      userId: meta?.userId,
      metadata: meta,
      timestamp: new Date().toISOString() 
    };
    
    logger.error(meta, message);
    dbTransport(logData);
  },
  warn: (message: string, meta?: Record<string, unknown>) => {
    const logData = {
      level: 'warn',
      message,
      source: meta?.source || 'application',
      processId: meta?.processId,
      traceId: meta?.traceId, 
      userId: meta?.userId,
      metadata: meta,
      timestamp: new Date().toISOString() 
    };
    
    logger.warn(meta, message);
    dbTransport(logData);
  },
  debug: (message: string, meta?: Record<string, unknown>) => {
    const logData = {
      level: 'debug',
      message,
      source: meta?.source || 'application',
      processId: meta?.processId,
      traceId: meta?.traceId, 
      userId: meta?.userId,
      metadata: meta,
      timestamp: new Date().toISOString() 
    };
    
    logger.debug(meta, message);
    dbTransport(logData);
  }
};