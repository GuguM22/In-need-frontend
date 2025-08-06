import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../env/env';
import { LoginResponse } from '../dto/loginResponse';
import { Donation } from '../model/donation';

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

  login(email: string, password: string): Observable<LoginResponse> {
  return this.http.post<LoginResponse>(
    `${environment.apiUrl}/auth/login`,
    { email, password },
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  );
} 

sendResetLink(email: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/auth/forgot-password`, { email });
}

resetPassword(token: string, newPassword: string, confirmPassword: string): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/auth/reset-password`, {
    token,
    newPassword,
    confirmPassword
  });
}
}
