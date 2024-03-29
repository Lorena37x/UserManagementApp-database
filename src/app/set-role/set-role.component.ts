import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { UserManagementService } from '../services/user-management.service';
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
    private userService: UserManagementService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<SetRoleComponent>,
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
        this.snackBar.open('Please fill in all required fields!', 'Close', {
          duration: 3000,
        });
        return;
      }
    
    const newRole: RoleView = {
      userId: this.data.userId,
      role: role
    };

    console.log(newRole)
        
    this.userService.setRole(newRole).subscribe({
      next: (val: any) => {
        this.snackBar.open('Role edited!', 'Close', { duration: 2000 });
        this.dialogRef.close(true);
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }
}
