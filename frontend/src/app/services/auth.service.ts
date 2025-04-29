import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = 'authToken';

  // Salva il token nel localStorage
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Rimuove il token
  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Restituisce il token (se presente)
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Controlla se l'utente è autenticato
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}