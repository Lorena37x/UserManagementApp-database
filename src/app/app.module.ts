import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { UserDataListComponent } from './user-data-list/user-data-list.component';
import { AppRoutingModule } from './app-routing.module';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { AuthGuardService } from './auth-guard/auth-guard-service';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AddNutritionComponent } from './add-nutrition/add-nutrition.component';
import { EditNutritionComponent } from './edit-nutrition/edit-nutrition.component';
import { AddFoodComponent } from './add-food/add-food.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, UserManagementComponent, AddEditUserComponent, UserDataListComponent, ConfirmationDialogComponent, UserDetailsComponent, AddNutritionComponent, EditNutritionComponent, AddFoodComponent],
  imports: [BrowserModule, 
    FormsModule, 
    AppRoutingModule, 
    BrowserAnimationsModule, 
    MatToolbarModule, 
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule],
  providers: [AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}

