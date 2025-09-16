import { Request, Response, NextFunction } from 'express';
import * as responseHelper from '../helpers/responseHelper';
import {ResponseModel} from '../utils/types/responseModel';
import { PlatformTypes } from '../enums/platformTypes';
import { ErrorCodes } from '../enums/errorCodes';
import { log } from '../utils/baseLogger';

export const headerValidation = (req: Request, res: Response, next: NextFunction): any => {
    try {
        if (req.headers["content-type"] !== "application/json") {
            log.error("Content-Type application/json olmalı", { source: "headerValidation" });
            return responseHelper.badRequest(res, new ResponseModel<string>
                (false, null, ErrorCodes.MISSING_CONTENT_TYPE, "Content-Type application/json olmalı"));
        }

        const xplatform = req.headers["x-platform"] as string;
        if (!xplatform) {
            log.error("X-Platform header is missing", { source: "headerValidation" });
            return responseHelper.badRequest(res, new ResponseModel<string>
                (false, null, ErrorCodes.INVALID_PLATFORM_TYPE, "X-Platform header is missing"));
        }

        res.locals.platform = xplatform;
        return next();
    } catch (e: any) {
        log.error(`Unknown error: ${e}`, { source: "headerValidation" });
        return responseHelper.badRequest(res, new ResponseModel<string>
            (false, null, ErrorCodes.UNKNOWN_ERROR, "Unknown error"));
    }
};