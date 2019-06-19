import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class InternalAuthService {

  private _authState = false;

  constructor() { }

  setAuthState(authState: boolean) {
    this._authState = authState;
  }

  getAuthState() {
    return this._authState;
  }
}
