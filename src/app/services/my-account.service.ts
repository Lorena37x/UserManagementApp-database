import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserView } from '../core/models/user-view';
import { PrehranaView } from '../core/models/prehrana-view';
import { HranaView } from '../core/models/hrana-view';

@Injectable({
  providedIn: 'root'
})
export class MyAccountService {
  baseUrl: any;

  constructor(private http: HttpClient) {}

  getUserData(id: number): Observable<UserView> {
    return this.http.get<UserView>(`http://localhost:5013/MyAccount/GetUser?userId=${id}`);
  }

  getNutritionData(id: number): Observable<PrehranaView[]> {
    return this.http.get<PrehranaView[]>(`http://localhost:5013/MyAccount/GetNutrition?userId=${id}`);
  }

  getFoodList(id: number): Observable<any[]> {
    return this.http.get<HranaView[]>(`http://localhost:5013/MyAccount/GetFood?userId=${id}`);
  }
}
