import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DonationRequestDTO } from '../dto/donationRequestDTO';
import { DonationUpdate } from '../dto/donationUpdate';
import { environment } from '../env/env';
import { Donation } from '../model/donation';
import { DonationStateService } from './donation-state-service';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private donationStateService: DonationStateService) { }

  createDonation(donation: DonationRequestDTO): Observable<any> {

    const token = localStorage.getItem('token');
    const headers = token ? new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }) : new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${this.apiUrl}/auth/donations/post`, donation, { headers });
  }

  getDonations(): Observable<Donation[]> {
  const token = localStorage.getItem('token');

  const headers = token ? new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }) : new HttpHeaders({ 'Content-Type': 'application/json' });

  return this.http.get<Donation[]>(`${this.apiUrl}/auth/donations/details`, { headers });
}



updateDonation(donationUpdate: DonationUpdate): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = token ? new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }) : new HttpHeaders({ 'Content-Type': 'application/json' });

  console.log('PUT payload:', donationUpdate); // debug

  return this.http.put(`${this.apiUrl}/auth/donations/update`, donationUpdate, { headers });
}


  getDonation(email: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = token ? new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }) : new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get(`${this.apiUrl}/auth/donations/${email}`, { headers });
  }

  getPendingDonations(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = token ? new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }) : new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<any[]>(`${this.apiUrl}/auth/donations/pending`, { headers });
  }


getDonationById(id: number): Observable<Donation> {
  const token = localStorage.getItem('token'); // or wherever you store it
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<Donation>(`${this.apiUrl}/auth/donations/${id}`, { headers });
}

private donationsSubject = new BehaviorSubject<Donation[]>([]);
donations$ = this.donationsSubject.asObservable();

setDonations(donations: Donation[]) {
  this.donationsSubject.next(donations);
}

}

