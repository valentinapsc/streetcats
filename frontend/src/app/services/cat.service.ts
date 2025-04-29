import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

export interface Cat {
  id?: number;
  name: string;
  description: string;
  lat: number;
  lng: number;
  image?: string; // Potrebbe essere un URL restituito dal backend
}

@Injectable({
  providedIn: 'root'
})
export class CatService {
  // Assumo che il backend sia in ascolto su localhost:3000
  private apiUrl = 'http://localhost:3000/api/cats';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getCats(): Observable<Cat[]> {
    return this.http.get<Cat[]>(this.apiUrl);
  }

  getCatById(id: number): Observable<Cat> {
    return this.http.get<Cat>(`${this.apiUrl}/${id}`);
  }

  submitCat(formData: FormData): Observable<Cat> {
    // Imposta il token in header se l'utente è loggato
    const token = this.authService.getToken();
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    return this.http.post<Cat>(this.apiUrl, formData, { headers });
  }

  updateCat(id: number, formData: FormData): Observable<Cat> {
    return this.http.put<Cat>(`/api/cats/${id}`, formData)
  }

  deleteCat(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}