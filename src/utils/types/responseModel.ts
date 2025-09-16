  export class ResponseModel<T> { // T tipi her şey olabilir
    success: boolean; // true mu false mı
    data?: T;  // true ise datayı al
    errorCode?: string;
    message?: string;

    constructor(success: boolean, data?: T, errorCode?: string, message?: string) { // sınıf ilk oluşturulduğunda bunları alıcaz
        this.success = success; // sınıfın sucess alanına göre = success değerini atıyoruz
        this.data = data;
        this.errorCode = errorCode;
        this.message = message;
      }
    }


    //export class ResponseModel bu sınıfa göre alıyoruz hangi alanlar vesaire
    // constructor burada da o alanlara göre çekiyoruz