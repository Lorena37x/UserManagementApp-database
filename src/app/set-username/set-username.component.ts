import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsernameView } from '../core/models/username-view';

@Component({
  selector: 'app-set-username',
  templateUrl: './set-username.component.html',
  styleUrls: ['./set-username.component.css']
})
export class SetUsernameComponent {

  usernameForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<SetUsernameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UsernameView
  ) {
    console.log(data)
    this.usernameForm = this.fb.group({
      usernameUsername: this.data.username
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
        this.snackBar.open('Please fill in all required fields!', 'Close', {
          duration: 3000,
        });
        return;
      }
    
    const newUsername: UsernameView = {
      userId: this.data.userId,
      username: username
    };
        
    this.userService.setUsername(newUsername).subscribe({
      next: (val: any) => {
        this.snackBar.open('Username edited!', 'Close', { duration: 2000 });
        this.dialogRef.close(true);
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }
}
