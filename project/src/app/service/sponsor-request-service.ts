import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import formDataToJson from '../utility/formDataToJson';

@Injectable({
  providedIn: 'root'
})
export class SponsorRequestService {
  
  private apiUrl = 'http://localhost:5050/api/sponsor-requests';
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
}

