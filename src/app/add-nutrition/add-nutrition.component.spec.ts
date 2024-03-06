import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNutritionComponent } from './add-nutrition.component';

describe('AddEditNutritionComponent', () => {
  let component: AddNutritionComponent;
  let fixture: ComponentFixture<AddNutritionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNutritionComponent]
    });
    fixture = TestBed.createComponent(AddNutritionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
