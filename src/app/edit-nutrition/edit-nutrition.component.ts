import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserManagementService } from '../services/user-management.service';
import { PrehranaView } from '../core/models/prehrana-view';

@Component({
  selector: 'app-edit-nutrition',
  templateUrl: './edit-nutrition.component.html',
  styleUrls: ['./edit-nutrition.component.css']
})
export class EditNutritionComponent implements OnInit {
  nutritionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserManagementService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditNutritionComponent>,
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
    console.log(this.data)
  }

  onSubmit() {
    if (this.nutritionForm.valid) {

      const vrijeme = this.nutritionForm.get('prehranaVrijeme')?.value;
      const hrana = this.nutritionForm.get('prehranaHranaId')?.value;

      if (!(vrijeme && hrana)) {
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
        
        this.userService.updateNutrition(this.data.id, updatedData).subscribe({
          next: (val: any) => {
            this.snackBar.open('Meal updated!', 'Close', { duration: 2000 });
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      }
    }
  }
