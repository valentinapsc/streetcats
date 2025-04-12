import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  // Assumi che il backend sia in ascolto su localhost:3000
  private apiUrl = 'http://localhost:3000/api/cats';

  constructor(private http: HttpClient) {}

  getCats(): Observable<Cat[]> {
    return this.http.get<Cat[]>(this.apiUrl);
  }

  getCatById(id: number): Observable<Cat> {
    return this.http.get<Cat>(`${this.apiUrl}/${id}`);
  }

  submitCat(formData: FormData): Observable<Cat> {
    return this.http.post<Cat>(this.apiUrl, formData);
  }
}