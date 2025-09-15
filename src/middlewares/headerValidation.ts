import { Request, Response, NextFunction } from 'express';
import * as responseHelper from '../helpers/responseHelper';
import {ResponseModel} from '../models/responseModel';
import { PlatformTypes } from '../enums/platformTypes';
import { ErrorCodes } from '../enums/errorCodes';
import { logger } from '../utils/logger';

export const headerValidation = (req: Request, res: Response, next: NextFunction): any => {
    try {
        if (req.headers["content-type"] !== "application/json") {
            logger.logError("Content-Type application/json olmalı", "headerValidation");
            return responseHelper.badRequest(res, new ResponseModel<string>
                (false, null, ErrorCodes.MISSING_CONTENT_TYPE, "Content-Type application/json olmalı"));
        }

        const xplatform = req.headers["x-platform"] as string;
        if (!xplatform) {
            logger.logError("X-Platform header is missing", "headerValidation");
            return responseHelper.badRequest(res, new ResponseModel<string>
                (false, null, ErrorCodes.INVALID_PLATFORM_TYPE, "X-Platform header is missing"));
        }

        res.locals.platform = xplatform;
        return next();
    } catch (e: any) {
        logger.logError(`Unknown error: ${e}`, "headerValidation");
        return responseHelper.badRequest(res, new ResponseModel<string>
            (false, null, ErrorCodes.UNKNOWN_ERROR, "Unknown error"));
    }
};