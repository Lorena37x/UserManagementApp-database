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
export class UserManagementService {
  baseUrl: any;

  constructor(private http: HttpClient) {}

  getUserData(id: number): Observable<UserView> {
    return this.http.get<UserView>(`http://localhost:5013/UserManagement/GetUser?userId=${id}`);
  }

  getNutritionData(id: number): Observable<PrehranaView[]> {
    return this.http.get<PrehranaView[]>(`http://localhost:5013/UserManagement/GetNutrition?userId=${id}`);
  }
  

  getUserList(): Observable<UserView[]> {
    return this.http.get<UserView[]>('http://localhost:5013/UserManagement/GetUsers');
  }

  getFoodList(id: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:5013/UserManagement/GetFood?userId=${id}`);
  }

  addUser(data: UserView): Observable<any> {
    return this.http.post('http://localhost:5013/UserManagement/PostUsers', data);
  }

  addNutrition(data: PrehranaView): Observable<any> {
    return this.http.post(`http://localhost:5013/UserManagement/PostNutrition`, data);
  }

  addFood(data: HranaView): Observable<any> {
    return this.http.post(`http://localhost:5013/UserManagement/PostFood`, data);
  }

  updateUser(id: number, data: UserView): Observable<any> {
    return this.http.put(`http://localhost:5013/UserManagement/EditUser?userId=${id}`, data);
  }
  
  updateNutrition(id: number, data: PrehranaView): Observable<any> {
    return this.http.put(`http://localhost:5013/UserManagement/EditNutrition?nutritionId=${id}`, data);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`http://localhost:5013/UserManagement/DeleteUser?userId=${id}`);
  }

  deleteNutrition(id: number): Observable<any> {
    return this.http.delete(`http://localhost:5013/UserManagement/DeleteNutrition?nutritionId=${id}`);
  }

  deleteFood(id: number): Observable<any> {
    return this.http.delete(`http://localhost:5013/UserManagement/DeleteFood?foodId=${id}`);
  }

  setUsername(data: UsernameView): Observable<any> {
    return this.http.post(`http://localhost:5013/UserManagement/EditUsername`, data);
  }

  setPassword(data: PasswordView): Observable<any> {
    return this.http.post(`http://localhost:5013/UserManagement/EditPassword`, data);
  }

  setRole(data: RoleView): Observable<any> {
    return this.http.post(`http://localhost:5013/UserManagement/EditRole`, data);
  }
}
