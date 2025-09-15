  export class ResponseModel<T> {
    success: boolean;
    data?: T;
    errorCode?: string;
    message?: string;

    constructor(success: boolean, data?: T, errorCode?: string, message?: string) {
        this.success = success;
        this.data = data;
        this.errorCode = errorCode;
        this.message = message;
      }
    }