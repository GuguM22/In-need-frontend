import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import formDataToJson from '../utility/toJson';
import { SponsorRequest } from '../model/sponsor-req';

@Injectable({
  providedIn: 'root'
})
export class SponsorRequestService {
  
  private apiUrl = 'http://localhost:5050/api/sponsor-requests';

  constructor(private http: HttpClient) {}

  // Get token if user is logged in
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  // POST request with token
  post(data: FormData): Observable<any> {
    const jsonData = formDataToJson(data);
    const token = this.getToken();
    const headers = token ? new HttpHeaders({ "Authorization": `Bearer ${token}` }) : undefined;

    return this.http.post(this.apiUrl, jsonData, { headers });
  }

  // GET request optionally with token
  getAll(): Observable<SponsorRequest[]> {
    // const token = this.getToken();
    // const headers = token ? new HttpHeaders({ "Authorization": `Bearer ${token}` }) : undefined;

    return this.http.get<SponsorRequest[]>(this.apiUrl);
  }
}
