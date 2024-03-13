import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PasswordView } from '../core/models/password-view';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent {

  passwordForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private _snackBar: MatSnackBar,
    private _dialogRef: MatDialogRef<SetPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PasswordView
  ) {
    console.log(data)
    this.passwordForm = this.fb.group({
      passwordPassword: this.data.password
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.passwordForm.patchValue(this.data);
    }
  }

  onSubmit() {

    const password = this.passwordForm.get('passwordPassword')?.value;

      if (!password) {
        this._snackBar.open('Please fill in all required fields!', 'Close', {
          duration: 3000,
        });
        return;
      }
    
    const newPassword: PasswordView = {
      userId: this.data.userId,
      password: password
    };
        
    this._userService.setPassword(newPassword).subscribe({
      next: (val: any) => {
        this._snackBar.open('Password edited!', 'Close', { duration: 2000 });
        this._dialogRef.close(true);
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }
}
