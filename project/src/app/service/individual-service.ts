import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IndividualService {
  private baseUrl = 'http://localhost:5050/api/individual-requests'; // ✅ Change to your real backend URL

  constructor(private http: HttpClient) {}

  post(formData: FormData): Observable<any> {
    return this.http.post(this.baseUrl, formData);
  }
}
