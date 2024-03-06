import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router } from '@angular/router';

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
    let sessionLogin: string = sessionStorage.getItem('isLoggedIn') || 'false';
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
    sessionStorage.setItem('isLoggedIn', 'false');
  }
}

