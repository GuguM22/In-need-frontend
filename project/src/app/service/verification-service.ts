import { Injectable } from '@angular/core';
import { environment } from '../env/env';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { VerificationRequest, VerificationResponse } from '../dto/veriificationRequest';
import { catchError, map, Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class VerificationService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

// Create verification
createVerification(data: VerificationRequest): Observable<any> {
  const token = sessionStorage.getItem('token');
  const headers = token
    ? new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      })
    : new HttpHeaders({ 'Content-Type': 'application/json' });

  return this.http
    .post(`${this.apiUrl}/api/verify/verification`, data, {
      headers,
      responseType: 'json', 
    })
    .pipe(
      catchError((error) => {
        console.error('Error creating verification:', error);
        throw error;
      })
    );
}

 getUserVerificationStatus(userId: string): Observable<string> {
    // Now this will be correct: /api/verify/verification/status/{userId}
    return this.http.get<string>(
      `${this.apiUrl}/api/verify/verification/status/${userId}`, 
      { 
       
        responseType: 'text' as 'json'
      }
    );
  }
  // Upload files
  uploadFiles(
    files: File[],
    verificationId: number
  ): Observable<{ urls: string[] }> {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file, file.name));
    formData.append('verificationId', verificationId.toString());

    const token = sessionStorage.getItem('token');
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : undefined;

    return this.http.post<{ urls: string[] }>(
      `${this.apiUrl}/api/verify/upload`,
      formData,
      { headers }
    );
  }

  // getVerifications(status?: string): Observable<VerificationRequest[]> {
  //   const token = sessionStorage.getItem('token');
  //   const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
  //   const params = status ? new HttpParams().set('status', status) : undefined;
  
  //   return this.http.get<VerificationRequest[]>('/api/admin/verifications', {
  //     headers,
  //     params,
  //     responseType: 'json' as const
  //   });
  // }
  
  getVerifications(status?: string): Observable<VerificationRequest[]> {
    const token = sessionStorage.getItem('token');
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    const params = status ? new HttpParams().set('status', status) : undefined;
  
    console.log('Fetching verifications with:', { headers, params });
  
    return this.http.get<VerificationRequest[]>(`${this.apiUrl}/api/admin/verifications`, {
      headers,
      params,
      responseType: 'json' as const
    }).pipe(
      tap(data => console.log('Verifications data received:', data)),
      catchError(err => {
        console.error('Error in getVerifications', err);
        throw err;
      })
    );
  }
  
  
  verifyUser(userId: number): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : undefined;
  
    return this.http.put(`${this.apiUrl}/api/user/${userId}/verify`, {}, { headers });
  }
  
  updateVerificationStatus(verificationId: number, status: string): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
  
    // We use HttpParams to send the status as query param
    const params = new HttpParams().set('status', status);
  
    return this.http.put(`${this.apiUrl}/api/verify/${verificationId}/status`, null, { headers, params });
  }
  
  updateStatus(id: number, status: 'PENDING' | 'APPROVED' | 'REJECTED'): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }) : undefined;
    return this.http.put(`${this.apiUrl}/api/verify/${id}/status`, { status }, { headers });
  }
  
  getRejectedVerifications(): Observable<VerificationRequest[]> {
    return this.http.get<VerificationRequest[]>(`${this.apiUrl}/api/verify/verifications/rejected`);
  }
  
  
  getVerificationsByStatus(status: string): Observable<VerificationResponse[]> {
    return this.http.get<VerificationResponse[]>(`${this.apiUrl}/api/verifications/status/${status}`);
  }
  
  getAllVerifications(): Observable<VerificationResponse[]> {
    const token = sessionStorage.getItem('token');
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
  
    return this.http.get<VerificationResponse[]>(`${this.apiUrl}/api/verify/verifications/all`, {
      headers
    }).pipe(
      tap(data => console.log('All verifications:', data)),
      catchError(err => {
        console.error('Error fetching all verifications:', err);
        throw err;
      })
    );
  }
  
}

