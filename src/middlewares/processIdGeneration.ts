import {Request, Response, NextFunction} from 'express';
import { v4 as uuidv4 } from "uuid";
import { log } from '../utils/baseLogger';

export function processIdGeneration(req: Request, res: Response, next: NextFunction) {
    try {
        const processId = uuidv4();
        res.locals.processId = processId; // locals içine koyduk
        next();
    } catch (error: any) {
         log.error("Process ID oluşturulamadı", { source: "processIdGenerationMiddleware", err: error });
        res.status(500).json({ error: "Process ID generation failed" });
    }
}