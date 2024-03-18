import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PrehranaView } from '../core/models/prehrana-view';
import { UserView } from '../core/models/user-view';
import { HranaView } from '../core/models/hrana-view';
import { UsernameView } from '../core/models/username-view';
import { PasswordView } from '../core/models/password-view';
import { RoleView } from '../core/models/role-view';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: any;

  constructor(private _http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Name': 'Lorena',
    });
    return headers;
  }

  getUserData(id: number): Observable<UserView> {
    const headers = this.getHeaders();
    return this._http.get<UserView>(`http://localhost:5013/Users/GetUser?userId=${id}`, { headers });
  }

  getNutritionData(id: number): Observable<PrehranaView[]> {
    const headers = this.getHeaders();
    return this._http.get<PrehranaView[]>(`http://localhost:5013/Users/GetNutrition?userId=${id}`, { headers });
  }
  

  getUserList(): Observable<UserView[]> {
    const headers = this.getHeaders();
    return this._http.get<UserView[]>('http://localhost:5013/Users/GetUsers', { headers });
  }

  getFoodList(id: number): Observable<any[]> {
    const headers = this.getHeaders();
    return this._http.get<any[]>(`http://localhost:5013/Users/GetFood?userId=${id}`, { headers });
  }

  addUser(data: UserView): Observable<any> {
    const headers = this.getHeaders();
    return this._http.post('http://localhost:5013/Users/PostUsers', data, { headers });
  }

  addNutrition(data: PrehranaView): Observable<any> {
    const headers = this.getHeaders();
    return this._http.post(`http://localhost:5013/Users/PostNutrition`, data, { headers });
  }

  addFood(data: HranaView): Observable<any> {
    const headers = this.getHeaders();
    return this._http.post(`http://localhost:5013/Users/PostFood`, data, { headers });
  }

  updateUser(id: number, data: UserView): Observable<any> {
    const headers = this.getHeaders();
    return this._http.put(`http://localhost:5013/Users/EditUser?userId=${id}`, data, { headers });
  }
  
  updateNutrition(id: number, data: PrehranaView): Observable<any> {
    const headers = this.getHeaders();
    return this._http.put(`http://localhost:5013/Users/EditNutrition?nutritionId=${id}`, data, { headers });
  }

  deleteUser(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this._http.delete(`http://localhost:5013/Users/DeleteUser?userId=${id}`, { headers });
  }

  deleteNutrition(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this._http.delete(`http://localhost:5013/Users/DeleteNutrition?nutritionId=${id}`, { headers });
  }

  deleteFood(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this._http.delete(`http://localhost:5013/Users/DeleteFood?foodId=${id}`, { headers });
  }

  setUsername(data: UsernameView): Observable<any> {
    const headers = this.getHeaders();
    return this._http.post(`http://localhost:5013/Users/EditUsername`, data, { headers });
  }

  setPassword(data: PasswordView): Observable<any> {
    const headers = this.getHeaders();
    return this._http.post(`http://localhost:5013/Users/EditPassword`, data, { headers });
  }

  setRole(data: RoleView): Observable<any> {
    const headers = this.getHeaders();
    return this._http.post(`http://localhost:5013/Users/EditRole`, data, { headers });
  }
}
