import { HttpClient } from '@angular/common/http';
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

  getUserData(id: number): Observable<UserView> {
    return this._http.get<UserView>(`http://localhost:5013/Users/GetUser?userId=${id}`);
  }

  getNutritionData(id: number): Observable<PrehranaView[]> {
    return this._http.get<PrehranaView[]>(`http://localhost:5013/Users/GetNutrition?userId=${id}`);
  }
  

  getUserList(): Observable<UserView[]> {
    return this._http.get<UserView[]>('http://localhost:5013/Users/GetUsers');
  }

  getFoodList(id: number): Observable<any[]> {
    return this._http.get<any[]>(`http://localhost:5013/Users/GetFood?userId=${id}`);
  }

  addUser(data: UserView): Observable<any> {
    return this._http.post('http://localhost:5013/Users/PostUsers', data);
  }

  addNutrition(data: PrehranaView): Observable<any> {
    return this._http.post(`http://localhost:5013/Users/PostNutrition`, data);
  }

  addFood(data: HranaView): Observable<any> {
    return this._http.post(`http://localhost:5013/Users/PostFood`, data);
  }

  updateUser(id: number, data: UserView): Observable<any> {
    return this._http.put(`http://localhost:5013/Users/EditUser?userId=${id}`, data);
  }
  
  updateNutrition(id: number, data: PrehranaView): Observable<any> {
    return this._http.put(`http://localhost:5013/Users/EditNutrition?nutritionId=${id}`, data);
  }

  deleteUser(id: number): Observable<any> {
    return this._http.delete(`http://localhost:5013/Users/DeleteUser?userId=${id}`);
  }

  deleteNutrition(id: number): Observable<any> {
    return this._http.delete(`http://localhost:5013/Users/DeleteNutrition?nutritionId=${id}`);
  }

  deleteFood(id: number): Observable<any> {
    return this._http.delete(`http://localhost:5013/Users/DeleteFood?foodId=${id}`);
  }

  setUsername(data: UsernameView): Observable<any> {
    return this._http.post(`http://localhost:5013/Users/EditUsername`, data);
  }

  setPassword(data: PasswordView): Observable<any> {
    return this._http.post(`http://localhost:5013/Users/EditPassword`, data);
  }

  setRole(data: RoleView): Observable<any> {
    return this._http.post(`http://localhost:5013/Users/EditRole`, data);
  }
}
