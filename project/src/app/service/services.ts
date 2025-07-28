import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../env/env';

@Injectable({
  providedIn: 'root',
})
export class Services {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, user);
  }
  verify(token: string): Observable<string> {
    return this.http.get(`${this.apiUrl}/auth/verify`, {
      params: { token },
      responseType: 'text',
    });
  }
}
