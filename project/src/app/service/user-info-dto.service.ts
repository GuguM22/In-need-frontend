import { Injectable } from '@angular/core';
import { UserInfoDTO } from '../dto/user-info.dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInfoDtoService {

  currentUser!: UserInfoDTO;
  apiUrl = 'http://localhost:5050'; // Adjust this to your API base URL

  constructor(private http: HttpClient) { }

 
  getCurrentUser(): Observable<UserInfoDTO> {
    return this.http.get<UserInfoDTO>(`${this.apiUrl}/api/user/me`, {
      withCredentials: true // only if cookies are used for auth
    });
  }
  
}
