import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IndividualReq } from '../individual-req/individual-req';
import formDataToJson from '../utility/toJson';

@Injectable({ providedIn: 'root' })
export class IndividualService {
 private apiUrl = 'http://localhost:5050/api/individual-requests';

  constructor(private http: HttpClient) {}

  // Get token if user is logged in
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  // POST request with token
  post(data: any): Observable<any> {
    const jsonData = JSON.parse(JSON.stringify(data))

    const token = this.getToken();
    const headers = token ? new HttpHeaders({ "Authorization": `Bearer ${token}` }) : undefined;
    console.log(headers)
    return this.http.post(this.apiUrl, jsonData, { headers });
  }



  getAll(): Observable<IndividualReq[]> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`
    });
    console.log("Token used:", token);
    return this.http.get<IndividualReq[]>(this.apiUrl, { headers });
  }
  
  
}
