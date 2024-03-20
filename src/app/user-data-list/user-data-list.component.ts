import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../services/user-management.service';
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
    private userService: UserManagementService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    )
    {}

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this.userService.getUserList().subscribe({
      next: (res: any[] | undefined) => {
        this.dataSource = new MatTableDataSource(res);
      },
      error: console.log,
    });
   }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: (res) => {
        this.snackBar.open('User deleted!', 'Close', {
          duration: 2000,
        });
        this.getUserList()
      },
      error: console.log,
    });
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(id);
      }
    });
  }

  openEditUser(data: any) {
    const dialogRef = this.dialog.open(AddEditUserComponent, {
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
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Are you sure you want to delete this user?' },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUser(userId);
      }
    });
  }

  openDetails(userId: number) {
    this.router.navigate(['/user-details', userId]);
  }
}

