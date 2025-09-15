import { baseLogger } from './baseLogger';
import LogModel, { ILog } from '../models/log'; //log model için Ilog adında interface e import ettim

type level = "info" | "error" | "warn" | "debug"; //sadece bu 4 seviyeyi kukkancaz

export class Logger {
    private static instance: Logger; //logger classının instance'ını oluşturdum
    
    private constructor() {}  // yeni logger tanımlanamaz
        public static getInstance(): Logger {
            if (!Logger.instance) {
              Logger.instance = new Logger(); //ilk defa çağırıldığında oluştur
            } 
            return Logger.instance; //eğer instance yoksa yeni bir instance oluştur varsa var olanı döndür
          }                        //intence sayesinde logger ın tek kopyasını saklıycaz
          // artık tek logta birden fazla log yapabiliriz
        
          public async log(
            level: level,
            message: string,
            source: string,
            processId?: string,
            userId?: string,
            metadata?: Record<string, any>
          ) {
            try {
              const logEntry: ILog = new LogModel({ level, message, processId, userId, source, metadata });// new logmodel oluşturduk
              await logEntry.save();// db ye kaydettik
        
              baseLogger[level]({ source, processId, userId, ...metadata }, message); //pino ile konsola basıyoruz level parametresi ile seviye belirliyoruz
            } catch (error) {
              baseLogger.error({ error }, "Failed to save log to database");
            }
          }
        
          async logInfo(message: string, source: string, processId?: string, userId?: string, metadata?: Record<string, any>) {
            await this.log("info", message, source, processId, userId, metadata);
          }
        
          async logWarn(message: string, source: string, processId?: string, userId?: string, metadata?: Record<string, any>) {
            await this.log("warn", message, source, processId, userId, metadata);
          }
        
          async logError(message: string, source: string, processId?: string, userId?: string, metadata?: Record<string, any>) {
            await this.log("error", message, source, processId, userId, metadata);
          }
        
          async logDebug(message: string, source: string, processId?: string, userId?: string, metadata?: Record<string, any>) {
            await this.log("debug", message, source, processId, userId, metadata);
          }
        }
export const logger = Logger.getInstance();
