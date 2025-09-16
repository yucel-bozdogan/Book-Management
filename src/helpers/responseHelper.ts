import { Response } from "express";
import { ResponseModel } from "../utils/types/responseModel";

// 400 Bad Request
export const badRequest = <T>(res: Response, data: ResponseModel<T>) =>
    res.status(400).json(data);
  
  // 200 OK
  export const httpOk = <T>(res: Response, data: ResponseModel<T>) =>
    res.status(200).json(data);
  
  // 404 Not Found
  export const notFound = (res: Response) =>
    res.status(404).json(new ResponseModel(false, null, "NOT_FOUND", "Kayıt bulunamadı"));
  
  // 401 Unauthorized
  export const unauthorized = <T>(res: Response, data: ResponseModel<T>) =>
    res.status(401).json(data);
  
  // 500 Internal Server Error
  export const internalServerError = <T>(res: Response, data: ResponseModel<T>) =>
    res.status(500).json(data);