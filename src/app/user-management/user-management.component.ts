import { Component, ViewChild } from '@angular/core';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { MatDialog } from '@angular/material/dialog';
import { UserDataListComponent } from '../user-data-list/user-data-list.component';
import { Router } from '@angular/router';
import { KONSTANTE } from '../core/helpers/consts';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {

  @ViewChild(UserDataListComponent)
  userListRef!: UserDataListComponent;

  constructor(private dialog: MatDialog,
    private router: Router) {}

  openAddUser() {
    const dialogRef = this.dialog.open(AddEditUserComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.userListRef.getUserList();
        }
      },
    });
  }

  logout(): void {
    sessionStorage.setItem(KONSTANTE.IS_LOGGED_IN, 'false');
    sessionStorage.removeItem(KONSTANTE.USER_LOGGED_IN);
    this.router.navigate(['/login']);
  }
}

