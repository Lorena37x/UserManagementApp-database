import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDataListComponent } from './user-data-list.component';

describe('UserDataListComponent', () => {
  let component: UserDataListComponent;
  let fixture: ComponentFixture<UserDataListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDataListComponent]
    });
    fixture = TestBed.createComponent(UserDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
