import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../env/env';

@Injectable({
  providedIn: 'root'
})
export class Donation {

    private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createDonation(request: Donation): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${this.apiUrl}/auth/donations`, request, { headers });
  }
  
}
