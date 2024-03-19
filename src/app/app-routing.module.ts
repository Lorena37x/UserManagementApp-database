import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AuthGuardService } from './auth-guard/auth-guard-service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'user-management', component: UserManagementComponent, canActivate: [AuthGuardService, AuthGuardService.activator] },
  { path: 'user-details/:userId', component: UserDetailsComponent, canActivate: [AuthGuardService, AuthGuardService.activator] },
  { path: '', redirectTo: '/user-management', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

