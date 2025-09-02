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

// post(data: any): Observable<any> {
//   const jsonData = formDataToJson(data) as any; 
//   const userId = localStorage.getItem('userId');
//   if (userId) {
//     jsonData.organizationId = +userId; 
//   }

//   const token = this.getToken();
//   const headers = token ? new HttpHeaders({ "Authorization": `Bearer ${token}` }) : undefined;

//   console.log("Posting with organizationId:", jsonData.organizationId);

//   return this.http.post(this.apiUrl, jsonData, { headers });
// }

post(form: any, selectedFiles: File[]): Observable<any> {
  const formData = new FormData();

  // Append all the text fields
  formData.append('title', form.title);
  formData.append('priority', form.priority);
  formData.append('quantity', form.quantity);
  formData.append('requiredDate', form.requiredDate); // Ensure it's in correct format (e.g. YYYY-MM-DD)
  formData.append('description', form.description);
  formData.append('location', form.location);

  // Append all files under the same field name `media`
  selectedFiles.forEach(file => {
    formData.append('media', file);
  });

  // Optional: profile image URL or other fields if needed
  // formData.append('profileImageUrl', 'your-value');

  // Auth header (no need to set content-type manually)
  const token = this.getToken();
  const headers = token
    ? new HttpHeaders({ Authorization: `Bearer ${token}` })
    : undefined;

  return this.http.post(this.apiUrl, formData, { headers });
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
  
  return this.http.get<any[]>(`${this.apiUrl}/my-posts`, { headers });
}

/*getMyPosts(): Observable<any[]> {
  const token = this.getToken();
  const headers = new HttpHeaders({
    "Authorization": `Bearer ${token}`
  });

  return this.http.get<any[]>(`${this.apiUrl}/my-posts`, { headers });
}*/

// markPostAsFulfilled(id: number): Observable<any> {
//   return this.http.put(`${this.apiUrl}/${id}/fulfill`, {});
// }

markPostAsFulfilled(id: number): Observable<any> {
  const token = this.getToken();
  const headers = token
    ? new HttpHeaders({ Authorization: `Bearer ${token}` })
    : undefined;

  // ✅ match the backend URL and method
  return this.http.put(`${this.apiUrl}/${id}/fulfill`, {}, { headers });
}

}






