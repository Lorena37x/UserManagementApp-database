import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserView } from '../core/models/user-view';
import { LoginView } from '../core/models/login-view';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: any;

  constructor(private http: HttpClient) {}

  login(loginData: LoginView): Observable<UserView> {
    return this.http.post<UserView>(`http://localhost:5013/Auth/Login`, loginData);
  }
}
