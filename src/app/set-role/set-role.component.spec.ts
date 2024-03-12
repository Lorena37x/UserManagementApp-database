import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetRoleComponent } from './set-role.component';

describe('SetRoleComponent', () => {
  let component: SetRoleComponent;
  let fixture: ComponentFixture<SetRoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetRoleComponent]
    });
    fixture = TestBed.createComponent(SetRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
