import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Router} from '@angular/router';
import { UserView } from '../core/models/user-view';
import {KONSTANTE} from '../core/helpers/consts'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  isLoggedIn: boolean = false;
  userLoggedIn: string = '';
  login_label: string = '';

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private http: HttpClient) {
    let sessionLogin: string = sessionStorage.getItem(KONSTANTE.IS_LOGGED_IN) || 'false';
    this.isLoggedIn = sessionLogin == 'true' ? true : false;
  }

  ngOnInit() {
    if(this.isLoggedIn){
      this.router.navigate(["user-management"]);
    }
  }

  login() : void {

    const loginData = {
      username: this.username,
      password: this.password,
    };

    this.http.post<UserView>('http://localhost:5013/Users/Login', loginData)
    .subscribe(
      (response) => {
        this.isLoggedIn = true;
        sessionStorage.setItem(KONSTANTE.IS_LOGGED_IN, this.isLoggedIn + '');
        sessionStorage.setItem(KONSTANTE.USER_LOGGED_IN, JSON.stringify(response));
        
      if (response.role === 'admin') {
        this.router.navigate(["user-management"]);
      } else if (response.role === 'user') {
        this.router.navigate(["user-details", response.id]);
      } else {
        this._snackBar.open('This user has no role!', 'Close', {
          duration: 2000,
        });
    }},
    (error) => {
    this._snackBar.open('Username or password incorrect!', 'Close', {
      duration: 2000,
      });
    });
  }
}

  // if(this.username == 'admin' && this.password == 'admin123'){
  //   this.isLoggedIn = true;
  //   sessionStorage.setItem('isLoggedIn', this.isLoggedIn + '')
  //  this.router.navigate(["user-management"]);
  // } else {
  //   this._snackBar.open('Username or password invalid!', 'Close', {
  //     duration: 2000,
  //   });
  // }

