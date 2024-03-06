import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PrehranaView } from '../core/modules/prehrana-view';
import { UserView } from '../core/modules/user-view';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: any;

  constructor(private _http: HttpClient) {}

  getUserData(id: number): Observable<UserView> {
    return this._http.get<UserView>(`http://localhost:5013/Users/${id}`);
  }

  getNutritionData(id: number): Observable<PrehranaView[]> {
    return this._http.get<PrehranaView[]>(`http://localhost:5013/Nutrition?UserId=${id}`);
  }

  getUserList(): Observable<UserView[]> {
    return this._http.get<UserView[]>('http://localhost:5013/Users/GetUsers');
  }

  getFoodList(id: number): Observable<any[]> {
    return this._http.get<any[]>(`http://localhost:5013/Food?UserId=${id}`);
  }

  addUser(data: UserView): Observable<any> {
    return this._http.post('http://localhost:5013/Users/PostUsers', data);
  }

  addNutrition(data: PrehranaView): Observable<any> {
    return this._http.post(`http://localhost:5013/Nutrition`, data);
  }

  addFood(data: any): Observable<any> {
    return this._http.post(`http://localhost:5013/Hrana`, data);
  }

  updateUser(id: number, data: UserView): Observable<any> {
    return this._http.put(`http://localhost:3000/users/${id}`, data);
  }
  
  updateNutrition(id: number, data: PrehranaView): Observable<any> {
    return this._http.put(`http://localhost:3000/prehrana/${id}`, data);
  }

  deleteUser(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/users/${id}`);
  }

  deleteNutrition(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/prehrana/${id}`);
  }

  deleteFood(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/hrana/${id}`);
  }
}
