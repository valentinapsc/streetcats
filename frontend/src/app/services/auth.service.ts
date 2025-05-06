import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'authToken';

  /** stato reattivo: true se il token esiste */
  private _authState$ = new BehaviorSubject<boolean>(!!localStorage.getItem(this.tokenKey));
  authState$ = this._authState$.asObservable();

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this._authState$.next(true);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
    this._authState$.next(false);
  }

  logout(): void {
    this.clearToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return this._authState$.value;
  }
}