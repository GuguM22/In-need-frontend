import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../env/env';
import { DonationRequest } from '../donation-request/donation-request';
import { Donation } from '../model/donation';
import { DonationRequestDTO } from '../dto/donationRequestDTO';

@Injectable({
  providedIn: 'root'
})
 export class DonationService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createDonation(donation: DonationRequestDTO): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = token ? new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }) : new HttpHeaders({ 'Content-Type': 'application/json' });

  return this.http.post(`${this.apiUrl}/auth/donations/post`, donation, { headers });
}
getDonations(): Observable<any[]> {
  const token = localStorage.getItem('token');
  //const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const headers = token ? new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }) : new HttpHeaders({ 'Content-Type': 'application/json' });

  return this.http.get<any[]>(`${this.apiUrl}/auth/donations/details`, { 
    headers 
  });
}


}

