import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { AddNutritionComponent } from '../add-nutrition/add-nutrition.component';
import { EditNutritionComponent } from '../edit-nutrition/edit-nutrition.component';
import { MatDialog } from '@angular/material/dialog';
import { PrehranaView } from '../core/modules/prehrana-view';
import { UserView } from '../core/modules/user-view';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddFoodComponent } from '../add-food/add-food.component';
import { Router } from '@angular/router';
import { HranaView } from '../core/modules/hrana-view';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userId!: number;
  mealId!: number;
  userData!: UserView;
  nutritionData: PrehranaView[] = [];
  foodData!: HranaView[];

  constructor(private route: ActivatedRoute, 
              private userService: UserService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['userId'];
      this.getUserData();
    });
  }

  getUserData() {
    this.userService.getUserData(this.userId).subscribe(
      (user: UserView) => {
        this.userData = user;
      });

    this.userService.getFoodList(this.userId).subscribe(
      (food: HranaView[]) => {
        this.foodData = food;

        this.userService.getNutritionData(this.userId).subscribe(
          (nutrition: PrehranaView[]) => {
            this.nutritionData = nutrition.sort((a, b) => Date.parse('01-01-2023 ' + a.vrijeme) -  Date.parse('01-01-2023 ' + b.vrijeme));
          });
      });
  }

  addNutrition() {
    const dialogRef = this.dialog.open(AddNutritionComponent, {
      width: '500px',
      data: {
        userId: this.userId,
        nutritionData: this.nutritionData,
        foodData: this.foodData
      }
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUserData();
        }
      },
    });
  }

  editNutrition(meal: PrehranaView) {
    const dialogRef = this.dialog.open(EditNutritionComponent, {
      width: '500px',
      data: { id: meal.id,
              userId: this.userId,
              nutritionData: meal,
              foodData: this.foodData 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getUserData();
      }
    });
  }

  deleteNutrition(mealId?: number) {
    if (mealId) {
      this.userService.deleteNutrition(mealId).subscribe(
        (response: any) => {
          this.snackBar.open('Meal deleted!', 'Close', {
            duration: 2000,
          });
          this.getUserData();
        },
      );
    }
  }

  addFood() {
    const dialogRef = this.dialog.open(AddFoodComponent, {
      width: '300px',
      data: {
        userId: this.userId,
        foodData: this.foodData
      }
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUserData();
        }
      },
    });
  }

  deleteFood(foodId: number) {
    this.userService.deleteFood(foodId).subscribe(
      (response: any) => {
        this.snackBar.open('Food deleted!', 'Close', {
          duration: 2000,
        });
        this.getUserData();
      },
      (error: any) => {
        this.snackBar.open('This food can not be deleted!', 'Close', {
          duration: 2000,
        });
      });
  }

  goBack() {
    this.router.navigate(['/user-management']);
  }
}



