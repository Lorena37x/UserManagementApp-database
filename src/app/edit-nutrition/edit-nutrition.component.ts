import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';
import { PrehranaView } from '../core/modules/prehrana-view';

@Component({
  selector: 'app-edit-nutrition',
  templateUrl: './edit-nutrition.component.html',
  styleUrls: ['./edit-nutrition.component.css']
})
export class EditNutritionComponent implements OnInit {
  nutritionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private _snackBar: MatSnackBar,
    private _dialogRef: MatDialogRef<EditNutritionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.nutritionForm = this.fb.group({
      prehranaVrijeme: this.data.nutritionData.vrijeme ?? '',
      prehranaHrana: this.data.nutritionData.hrana ?? '',
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
      const hrana = this.nutritionForm.get('prehranaHrana')?.value;

      if (!(vrijeme && hrana)) {
        this._snackBar.open('Please fill in all required fields: time and food', 'Close', {
          duration: 3000,
        });
        return;
      }
      
      const updatedData: PrehranaView = {
        id: this.data.id,
        userId: this.data.userId,
        vrijeme: this.nutritionForm.value.prehranaVrijeme,
        hrana:  this.nutritionForm.value.prehranaHrana
      };
        
        this._userService.updateNutrition(this.data.id, updatedData).subscribe({
          next: (val: any) => {
            this._snackBar.open('Meal updated!', 'Close', { duration: 2000 });
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      }
    }
  }
