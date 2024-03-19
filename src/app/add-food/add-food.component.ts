import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';
import { HranaView } from '../core/models/hrana-view';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent {
  foodForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddFoodComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.foodForm = this.fb.group({
      hranaNaziv: this.data.foodData.naziv
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.foodForm.patchValue(this.data);
    }
  }

  onSubmit() {

    const hrana = this.foodForm.get('hranaNaziv')?.value;

      if (!hrana) {
        this.snackBar.open('Please fill in all required fields!', 'Close', {
          duration: 3000,
        });
        return;
      }
    
    const newFood: HranaView = {
      id: this.data.id,
      userId: this.data.userId,
      naziv: this.foodForm.value.hranaNaziv
    };
        
    this.userService.addFood(newFood).subscribe({
      next: (val: any) => {
        this.snackBar.open('Food added!', 'Close', { duration: 2000 });
        this.dialogRef.close(true);
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }
}
