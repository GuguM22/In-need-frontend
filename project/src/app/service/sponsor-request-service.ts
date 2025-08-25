import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import formDataToJson from '../utility/toJson';
import { SponsorRequest } from '../model/sponsor-req';

@Injectable({
  providedIn: 'root'
})
export class SponsorRequestService {
  put(id: any, formData: FormData) {
    throw new Error('Method not implemented.');
  }
  
  private apiUrl = 'http://localhost:5050/api/sponsor-requests';

  constructor(private http: HttpClient) {}

  // Get token if user is logged in
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  // POST request with token
  // post(data: FormData): Observable<any> {
  //   const jsonData = formDataToJson(data);
  //   const token = this.getToken();
  //   const headers = token ? new HttpHeaders({ "Authorization": `Bearer ${token}` }) : undefined;

  //   return this.http.post(this.apiUrl, jsonData, { headers });
  // }

post(data: any): Observable<any> {
  const jsonData = formDataToJson(data) as any; // cast to any
  const userId = localStorage.getItem('userId');
  if (userId) {
    jsonData.organizationId = +userId; // assign logged-in user's ID
  }

  const token = this.getToken();
  const headers = token ? new HttpHeaders({ "Authorization": `Bearer ${token}` }) : undefined;

  console.log("Posting with organizationId:", jsonData.organizationId);

  return this.http.post(this.apiUrl, jsonData, { headers });
}


  
  getById(id: any): Observable<SponsorRequest> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`
    });
    console.log("Token used:", token);
    return this.http.get<SponsorRequest>(this.apiUrl + "/" + id, { headers });
  }

  getAll(): Observable<SponsorRequest[]> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`
    });
    console.log("Token used:", token);
    return this.http.get<SponsorRequest[]>(this.apiUrl, { headers });
  }
  
   update(id: number, formData: FormData): Observable<any> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
    return this.http.put(`${this.apiUrl}/${id}`, formData, { headers });
}
  getPostsBySponsorId(id: string): Observable<any[]> {
  const token = this.getToken();
  const headers = new HttpHeaders({
    "Authorization": `Bearer ${token}`
  });
  return this.http.get<any[]>(`${this.apiUrl}/${id}/posts`, { headers });
}

getMyPosts(): Observable<any[]> {
  const token = this.getToken(); // fetch JWT
  const userId = localStorage.getItem('userId'); // logged-in user's ID

  if (!userId) {
    console.warn('No userId found in localStorage');
    return new Observable<any[]>(observer => {
      observer.next([]); // return empty array if no userId
      observer.complete();
    });
  }

  const headers = new HttpHeaders({
    "Authorization": `Bearer ${token}`
  });

  console.log("Token used:", token);

  return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
    map(posts => posts.filter(post => post.organizationId == +userId)) // safe: userId exists
  );
}






}

