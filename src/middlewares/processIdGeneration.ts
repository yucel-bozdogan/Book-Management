import {Request, Response, NextFunction} from 'express';
import { v4 as uuidv4 } from "uuid";
import { logger } from '../utils/logger';

export function processIdGeneration(req: Request, res: Response, next: NextFunction) {
    try {
        const processId = uuidv4();
        res.locals.processId = processId; // locals içine koyduk
        next();
    } catch (error: any) {
         logger.logError("Process ID oluşturulamadı", "processIdGenerationMiddleware", undefined, undefined, { err: error });
        res.status(500).json({ error: "Process ID generation failed" });
    }
}