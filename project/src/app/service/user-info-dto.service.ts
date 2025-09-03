import { Injectable } from '@angular/core';
import { UserInfoDTO } from '../dto/user-info.dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInfoDtoService {

  currentUser!: UserInfoDTO;
  apiUrl = 'http://localhost:5050'; // Adjust this to your API base URL

  constructor(private http: HttpClient) { }

  private getToken(): string | null {
    return sessionStorage.getItem('token');
  }
 
  getCurrentUser(): Observable<UserInfoDTO> {
    const token = this.getToken();
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : undefined;

    return this.http.get<UserInfoDTO>(`${this.apiUrl}/api/user/me` , { headers });
  }
  
}
