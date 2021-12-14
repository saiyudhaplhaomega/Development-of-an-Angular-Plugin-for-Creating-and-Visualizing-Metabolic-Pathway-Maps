import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorStatusProviderService {

  public errorCode: number;

  constructor() { }

  setErrorCode(code: number) {
    this.errorCode = code;
  }

  resetErrorCode() {
    this.errorCode = undefined;
  }
}
