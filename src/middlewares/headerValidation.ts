import { Request, Response, NextFunction } from 'express';
import * as responseHelper from '../helpers/responseHelper';
import {ResponseModel} from '../utils/types/responseModel';
import { PlatformTypes } from '../enums/platformTypes';
import { ErrorCodes } from '../enums/errorCodes';
import { log } from '../utils/baseLogger';

export const headerValidation = (req: Request, res: Response, next: NextFunction): any => {
    try {
        if (req.headers["content-type"] !== "application/json") { //gelen header ın content-type ı app json değilse hata fırlat
            log.error("Content-Type application/json olmalı", { source: "headerValidation" });
            return responseHelper.badRequest(res, new ResponseModel<string>
                (false, null, ErrorCodes.MISSING_CONTENT_TYPE, "Content-Type application/json olmalı"));
        }

       // x platformu header dan al  eğer header xplatform yoksa hata fırlat
        const xplatform = req.headers["x-platform"] as string;
        if (!xplatform) {
        log.error("X-Platform header is missing", { source: "headerValidation" });
        return responseHelper.badRequest(res, new ResponseModel<string>
        (false, null, ErrorCodes.INVALID_PLATFORM_TYPE, "X-Platform header is missing"));
}

// Platform değerini kontrol et eğer platform değeri PlatformTypes enumında yoksa hata fırlat
        if (!Object.values(PlatformTypes).includes(xplatform as PlatformTypes)) { // eğer platform değeri PlatformTypes enumında yoksa hata fırlat
    log.error(`Invalid platform type: ${xplatform}`, { source: "headerValidation" });
    return responseHelper.badRequest(res, new ResponseModel<string>
        (false, null, ErrorCodes.INVALID_PLATFORM_TYPE, `Invalid platform type. Must be one of: ${Object.values(PlatformTypes).join(', ')}`));
}

        res.locals.platform = xplatform; //x platform header ını local değişkenine atıyoruz
        return next();
    } catch (e: any) { //hata fırlat
        log.error(`Unknown error: ${e}`, { source: "headerValidation" });
        return responseHelper.badRequest(res, new ResponseModel<string>
            (false, null, ErrorCodes.UNKNOWN_ERROR, "Unknown error"));
    }
};