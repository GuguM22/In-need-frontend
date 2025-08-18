import { Injectable } from '@angular/core';
import { environment } from '../env/env';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { VerificationRequest } from '../dto/veriificationRequest';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
@Injectable({
  providedIn: 'root'
})
export class VerificationService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Create verification 
createVerification(data: VerificationRequest): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = token ? new HttpHeaders({ 
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }) : new HttpHeaders({ 'Content-Type': 'application/json' });

  return this.http.post(`${this.apiUrl}/api/verify/verification`, data, {
    headers,
    responseType: 'json' // or 'text' if backend returns plain text
  }).pipe(
    catchError(error => {
      console.error('Error creating verification:', error);
      throw error; 
    })
  );
}

  // Upload files
  uploadFiles(files: File[], verificationId: number): Observable<{urls: string[]}> {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file, file.name));
    formData.append('verificationId', verificationId.toString());

    const token = localStorage.getItem('token');
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;

    return this.http.post<{urls: string[]}>(`${this.apiUrl}/api/verify/upload`, formData, { headers });
  }

  getVerifications(status?: string): Observable<VerificationRequest[]> {
    const token = localStorage.getItem('token');
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    const params = status ? new HttpParams().set('status', status) : undefined;
  
    return this.http.get<VerificationRequest[]>('/api/admin/verifications', {
      headers,
      params,
      responseType: 'json' as const
    });
  }
  
  
  
}

