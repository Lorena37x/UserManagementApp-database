import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-data-list',
  styleUrls: ['./user-data-list.component.css'],
  templateUrl: './user-data-list.component.html',
})
export class UserDataListComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'phone', 'email', 'action'];
  dataSource!: MatTableDataSource<any>;

  constructor(
    private _userService: UserService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _router: Router,
    )
    {}

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this._userService.getUserList().subscribe({
      next: (res: any[] | undefined) => {
        this.dataSource = new MatTableDataSource(res);
      },
      error: console.log,
    });
   }

  deleteUser(id: number) {
    this._userService.deleteUser(id).subscribe({
      next: (res) => {
        this._snackBar.open('User deleted!', 'Close', {
          duration: 2000,
        });
        this.getUserList()
      },
      error: console.log,
    });
  }

  delete(id: any) {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._userService.deleteUser(id);
      }
    });
  }

  openEditUser(data: any) {
    const dialogRef = this._dialog.open(AddEditUserComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUserList();
        }
      },
    });
  }

  openConfirmationDialog(userId: number): void {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Are you sure you want to delete this user?' },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUser(userId);
      }
    });
  }

  openDetails(userId: number) {
    this._router.navigate(['/user-details', userId]);
  }
}

