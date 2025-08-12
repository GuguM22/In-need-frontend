import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SponsorRequestService {
  
  private apiUrl = 'http://localhost:5050/api/sponsor-requests';

  constructor(private http: HttpClient) {}

  post(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}

