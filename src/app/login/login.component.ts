import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  isLoggedIn: boolean = false;
  login_label: string = '';

  constructor(private router: Router,
    private _snackBar: MatSnackBar) {
    let sessionLogin: string = sessionStorage.getItem('isLoggedIn') || 'false';
    this.isLoggedIn = sessionLogin == 'true' ? true : false;
  }

  ngOnInit() {
    if(this.isLoggedIn){
      this.router.navigate(["user-management"]);
    }
  }

  login() : void {
    if(this.username == 'admin' && this.password == 'admin123'){
      this.isLoggedIn = true;
      sessionStorage.setItem('isLoggedIn', this.isLoggedIn + '')
     this.router.navigate(["user-management"]);
    }else {
      this._snackBar.open('Username or password invalid!', 'Close', {
        duration: 2000,
      });
    }
  }
  }

