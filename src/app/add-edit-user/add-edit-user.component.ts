import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {
  addUser: FormGroup

  constructor(
    private _fb: FormBuilder, 
    private _userService: UserService, 
    private _snackBar: MatSnackBar,
    private _dialogRef: MatDialogRef<AddEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  
  ) {
    this.addUser = this._fb.group({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    });
  }

  ngOnInit(): void {
    this.addUser.patchValue(this.data);
  }

  isPhoneNumberValid(phoneNumber: string): boolean {
    const validPhoneNumberRegex = /^[+0-9\s]+$/;
    return validPhoneNumberRegex.test(phoneNumber);
  }

  onSubmit() {
    if (this.addUser.valid) {

      const firstName = this.addUser.get('firstName')?.value;
      const lastName = this.addUser.get('lastName')?.value;
      const phone = this.addUser.get('phone')?.value;
      const email = this.addUser.get('email')?.value;

      if (!(firstName && lastName && phone && email)) {
        this._snackBar.open('Please fill in all required fields: name, surname, phone number, and email.', 'Close', {
          duration: 3000,
        });
        return;
      }

       {
        const phoneNumber = this.addUser.get('phone')!.value;
        if (this.isPhoneNumberValid(phoneNumber)) {
          if (this.data) {
            this._userService.updateUser(this.data.id, this.addUser.value).subscribe({
              next: (val: any) => {
                this._snackBar.open('User updated!', 'Close', {
                  duration: 2000,
                });
                this._dialogRef.close(true);
              },
              error: (err: any) => {
                console.error(err);
              },
            });
          } else {
            this._userService.addUser(this.addUser.value).subscribe({
              next: (val: any) => {
                this._snackBar.open('User added!', 'Close', {
                  duration: 2000,
                });
                this._dialogRef.close(true);
              },
              error: (err: any) => {
                console.error(err);
              },
            });
          }
        } else {
          this._snackBar.open('Please enter a valid phone number with only numbers, +, and space.', 'Close', {
            duration: 3000,
          });
        }  
      } 
    }
  }
}
