import pino from "pino";
import logModel from "../models/log"; // artık mognoose buradan type interface oluşturcak

// singelton değil ama return olmadığından bir kere üretiyoruz 

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
      userId: logData.userId as string,
      metadata: logData.metadata || {},
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Failed to save log to database:', error);
  }
};

export const logger = pino({
  level: "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,             // konsola yazmak için pino sınıfından yeni bi intence yaratıyorum
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
    },
  }
});

export const log = {
  info: (message: string, meta?: Record<string, unknown>) => { //info fonksiyonu log içinde mesaj string alsın bir de diğerlerinden ne verirse anahtarı string veri tipi her şey olabilir
    logger.info(meta, message); // pinonun log seviyesine göre meta ve messageyi atıyorum
    dbTransport({ level: 'info', message, source: meta?.source || 'application', processId: meta?.processId, userId: meta?.userId, metadata: meta, time: Date.now() });
  },// level bilgisini info al mesajı al   source u meta içinde varsa al yoksa application   
  error: (message: string, meta?: Record<string, unknown>) => {
    logger.error(meta, message);
    dbTransport({ level: 'error', message, source: meta?.source || 'application', processId: meta?.processId, userId: meta?.userId, metadata: meta, time: Date.now() });
  },
  warn: (message: string, meta?: Record<string, unknown>) => {
    logger.warn(meta, message);
    dbTransport({ level: 'warn', message, source: meta?.source || 'application', processId: meta?.processId, userId: meta?.userId, metadata: meta, time: Date.now() });
  },
  debug: (message: string, meta?: Record<string, unknown>) => {
    logger.debug(meta, message);
    dbTransport({ level: 'debug', message, source: meta?.source || 'application', processId: meta?.processId, userId: meta?.userId, metadata: meta, time: Date.now() });
  }
};