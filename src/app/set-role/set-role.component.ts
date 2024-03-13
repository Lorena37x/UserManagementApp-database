import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleView } from '../core/models/role-view';

@Component({
  selector: 'app-set-role',
  templateUrl: './set-role.component.html',
  styleUrls: ['./set-role.component.css']
})
export class SetRoleComponent {

  roleForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private _snackBar: MatSnackBar,
    private _dialogRef: MatDialogRef<SetRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RoleView
  ) {
    console.log(data)
    this.roleForm = this.fb.group({
      roleRole: this.data.role
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.roleForm.patchValue(this.data);
    }
  }

  onSubmit() {

    const role = this.roleForm.get('roleRole')?.value;

    console.log(role)

      if (!role) {
        this._snackBar.open('Please fill in all required fields!', 'Close', {
          duration: 3000,
        });
        return;
      }
    
    const newRole: RoleView = {
      userId: this.data.userId,
      role: role
    };

    console.log(newRole)
        
    this._userService.setRole(newRole).subscribe({
      next: (val: any) => {
        this._snackBar.open('Role edited!', 'Close', { duration: 2000 });
        this._dialogRef.close(true);
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }
}
