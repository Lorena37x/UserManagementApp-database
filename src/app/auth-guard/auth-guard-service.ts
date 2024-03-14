import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router } from '@angular/router';
import { KONSTANTE } from '../core/helpers/consts';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad  {
  constructor(private router: Router) {}

  canActivate(): boolean {
    return this.checkAuth();
  }

  canActivateChild(): boolean {
    return this.checkAuth();
  }

  canLoad(): boolean {
    return this.checkAuth();
  }

  private checkAuth(): boolean {
    let sessionLogin: string = sessionStorage.getItem(KONSTANTE.IS_LOGGED_IN) || 'false';
    let isLoggedIn = sessionLogin == 'true' ? true : false;
    if (isLoggedIn) {
      return true;
    } else {
      // Redirect to the login page if the user is not authenticated
      this.router.navigate(['/login']);
      return false;
    }
  }

  logout(): void {
    // Clear any authentication status or user information
    sessionStorage.setItem(KONSTANTE.IS_LOGGED_IN, 'false');
  }
}

