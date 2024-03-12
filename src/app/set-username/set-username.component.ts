import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsernameView } from '../core/models/username-view';
import { UserDetailsComponent } from '../user-details/user-details.component';

@Component({
  selector: 'app-set-username',
  templateUrl: './set-username.component.html',
  styleUrls: ['./set-username.component.css']
})
export class SetUsernameComponent {
  usernameForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private _snackBar: MatSnackBar,
    private _dialogRef: MatDialogRef<SetUsernameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.usernameForm = this.fb.group({
      usernameUsername: this.data.usernameData.username
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.usernameForm.patchValue(this.data);
    }
  }

  onSubmit() {

    const username = this.usernameForm.get('usernameUsername')?.value;

      if (!username) {
        this._snackBar.open('Please fill in all required fields!', 'Close', {
          duration: 3000,
        });
        return;
      }
    
    const newUsername: UsernameView = {
      id: this.data.id,
      userId: this.data.userId,
      username: this.usernameForm.value.usernameUsername
    };
        
    this._userService.setUsername(this.data.id, newUsername).subscribe({
      next: (val: any) => {
        this._snackBar.open('Username edited!', 'Close', { duration: 2000 });
        this._dialogRef.close(true);
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }
}
