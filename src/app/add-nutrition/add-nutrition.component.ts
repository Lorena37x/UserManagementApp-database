import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';
import { PrehranaView } from '../core/models/prehrana-view';

@Component({
  selector: 'app-add-nutrition',
  templateUrl: './add-nutrition.component.html',
  styleUrls: ['./add-nutrition.component.css']
})
export class AddNutritionComponent implements OnInit {
  nutritionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddNutritionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.nutritionForm = this.fb.group({
      prehranaVrijeme: this.data.nutritionData.vrijeme ?? '',
      prehranaHranaId: this.data.nutritionData.hranaId ?? '',
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.nutritionForm.patchValue(this.data);
    }
  }

  onSubmit() {
    if (this.nutritionForm.valid) {

      const vrijeme = this.nutritionForm.get('prehranaVrijeme')?.value;
      const hranaId = this.nutritionForm.get('prehranaHranaId')?.value;

      if (!(vrijeme && hranaId)) {
        this.snackBar.open('Please fill in all required fields: time and food', 'Close', {
          duration: 3000,
        });
        return;
      }

      const updatedData: PrehranaView = {
        id: this.data.id,
        userId: this.data.userId,
        vrijeme: this.nutritionForm.value.prehranaVrijeme,
        hranaId:  this.nutritionForm.value.prehranaHranaId
      };
        
        this.userService.addNutrition(updatedData).subscribe({
          next: (val: any) => {
            this.snackBar.open('Meal added!', 'Close', { duration: 2000 });
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      }
    }
  }

