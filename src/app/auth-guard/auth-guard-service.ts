import { Injectable, inject } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router } from '@angular/router';
import { KONSTANTE } from '../core/helpers/consts';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad  {

  static activator = () =>  { inject(AuthGuardService).canActivateRole() }

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
    let isLoggedIn = sessionLogin === 'true'? true : false;

    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    } 
  }

  canActivateRole() {
    let sessionUserRole = JSON.parse(sessionStorage.getItem(KONSTANTE.USER_LOGGED_IN) as any || undefined);

    if (sessionUserRole.role !== 'admin' && sessionUserRole.role !== 'user') {
      this.router.navigate(['/login'])
    }
  }

  logout(): void {
    sessionStorage.setItem(KONSTANTE.IS_LOGGED_IN, 'false');
  }
}

