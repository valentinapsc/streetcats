import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // BehaviorSubject mantiene l'ultimo messaggio (o null se non ce n'è)
  private _message$ = new BehaviorSubject<string | null>(null);
  message$ = this._message$.asObservable();

  // Mostra la notifica per un certo tempo (default 3 secondi)
  show(message: string, duration: number = 3000): void {
    this._message$.next(message);
    setTimeout(() => {
      this.clear();
    }, duration);
  }

  clear(): void {
    this._message$.next(null);
  }
}