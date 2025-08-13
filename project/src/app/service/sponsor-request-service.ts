import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import formDataToJson from '../utility/formDataToJson';
import { SponsorRequest } from '../model/sponsor-req';

@Injectable({
  providedIn: 'root'
})
export class SponsorRequestService {
  
  // private apiUrl = 'http://localhost:5050/api/sponsor-requests';
  private apiUrl = 'http://10.100.3.53:5050/api/sponsor-requests';
  private token;
  private headers;

  constructor(private http: HttpClient) {
    this.token = this.getToken();
    this.headers = new HttpHeaders({"Authorization": `Bearer ${this.token}`})
  }

  getToken(): string | null {
    return localStorage.getItem('token')
  }

  post(data: FormData): Observable<any> {
    const jsonData = formDataToJson(data);
    console.log(jsonData)
    return this.http.post(this.apiUrl, jsonData, {headers: this.headers});
  }

  getAll(): Observable<SponsorRequest[]> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`
    });
    console.log("Token used:", token);
    return this.http.get<SponsorRequest[]>(this.apiUrl, { headers });
  }
  
  
}

