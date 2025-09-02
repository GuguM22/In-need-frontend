import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { LoginResponse } from '../dto/loginResponse';
import { environment } from '../env/env';

@Injectable({
  providedIn: 'root',
})
export class Services {

  private apiUrl = environment.apiUrl;
  public currentUser: any = null;

  constructor(private http: HttpClient) { 
     const savedUser = sessionStorage.getItem('user');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }
  }
  

  get baseUrl(): string {
    return this.apiUrl;
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, user);
  }


  /*verify(token: string): Observable<string> {
    return this.http.get(`${this.apiUrl}/auth/verify`, {
      params: { token },
      responseType: 'text',
    });
  }*/

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

  // user-services.ts
  logout(): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`
    });

    return this.http.post(`${this.apiUrl}/auth/logout`, {}, {
      headers,
      responseType: 'json'
    }).pipe(
      tap({
        next: () => {

          sessionStorage.removeItem('token');
          sessionStorage.removeItem('user');
        },
        error: () => {

          sessionStorage.removeItem('token');
          sessionStorage.removeItem('user');
        }
      })
    );
  }

  profile(): Observable<any> {
  const token = sessionStorage.getItem('token');
  return this.http.get(`${this.apiUrl}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}


  updateProfile(updateData: any): Observable<any> {
    const token = sessionStorage.getItem('token');
    return this.http.patch(
      `${this.apiUrl}/auth/profile`,
      updateData,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
  }

  uploadProfile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('profileImage', file);

    const token = sessionStorage.getItem('token');

    return this.http.post(`${this.apiUrl}/auth/upload-profile-image`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Don't set Content-Type - let browser set it automatically
      },
      observe: 'response' // Get full HttpResponse
    }).pipe(
      catchError(error => {
        console.error('API Error:', error);
        return throwError(() => error);
      })
    );
  }

getProfileImage(filePath: string): Observable<Blob> {
  // Extract just the filename if full path is provided
  const filename = filePath.split('/').pop() || filePath;
  
  return this.http.get(`${this.apiUrl}/auth/images/${filename}`, {
    responseType: 'blob'
  }).pipe(
    catchError(error => {
      console.error('Failed to load image:', error);
      // Return a default image or empty blob
      return of(new Blob());
    })
  );
}

}
