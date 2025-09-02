import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IndividualRequest {
  id?: number;
  title: string;
  urgency?: string;
  quantity: number;
  neededByDate: string;
  description: string;
  mediaUrls?: string[];
  createdAt: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class IndividualService {
  private apiUrl = 'http://localhost:5050/api/individual-requests';

  constructor(private http: HttpClient) {}

  private getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  post(formData: FormData): Observable<any> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
    return this.http.post(this.apiUrl, formData, { headers });
  }

  update(id: number, formData: FormData): Observable<any> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
    return this.http.put(`${this.apiUrl}/${id}`, formData, { headers });
  }

  getById(id: number | string): Observable<IndividualRequest> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
    return this.http.get<IndividualRequest>(`${this.apiUrl}/${id}`, { headers });
  }

  getAll(): Observable<IndividualRequest[]> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
    return this.http.get<IndividualRequest[]>(this.apiUrl, { headers });
  }
}
