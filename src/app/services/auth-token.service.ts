import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthTokenService {
  private readonly _authTokenKey: string = 'authTokenKey';

  setToken(token: string): void {
    localStorage.setItem(this._authTokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this._authTokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this._authTokenKey);
  }
}
