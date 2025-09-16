import { Response } from "express";
import { ResponseModel } from "../utils/types/responseModel";


export const badRequest = <T>(res: Response, data: ResponseModel<T>) =>
    res.status(400).json(data);
  
  
  export const httpOk = <T>(res: Response, data: ResponseModel<T>) => 
    res.status(200).json(data); 
 // http ok fonksiyonu generic tip data alanın tipi neyse o olsun T. bu bir response yapıcak 
 // response yaparken alacağı datayı ResponseModele göre alıcak 
 // ve bu   res.status(200).json(data);  http cevabın durum kodunu yolla ve data yi gönder

 
  export const notFound = (res: Response) =>
    res.status(404).json(new ResponseModel(false, null, "NOT_FOUND", "Kayıt bulunamadı"));
  // diğerlerinde data değişebilir ama not foundda hep aynı bundan helperi sabit tanımladık
  
  export const unauthorized = <T>(res: Response, data: ResponseModel<T>) =>
    res.status(401).json(data);
  
  
  export const internalServerError = <T>(res: Response, data: ResponseModel<T>) =>
    res.status(500).json(data);


  // amaç her endpointten dönen cevabın aynı şekilde olması 
  // artık hangi alana istek atılırsa atılsın modelde tanımlanan alanlar kesin bulunuyor

  // tekrar tekrar status response u yazmıyoruz response modeli kullanıyoruz

  // kodu okuyan için status numara anlamları anlaşılır oluyor